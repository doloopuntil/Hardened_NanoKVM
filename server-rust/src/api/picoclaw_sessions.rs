//! The conversations PicoClaw has saved, for the history list of the web UI.
//!
//! PicoClaw keeps them in `<workspace>/sessions`: a `<key>.jsonl` with one message per line next
//! to a `<key>.meta.json`, or, in older versions, one `<key>.json` file. This follows what
//! PicoClaw's own web backend does (picoclaw v0.3.1, web/backend/api/session.go), cut down to
//! what the chat shows: user and assistant messages with text. Tool calls, thoughts and
//! attachments are left out.

use std::{
    collections::HashMap,
    fs,
    io::{self, BufRead},
    path::{Path, PathBuf},
    sync::{LazyLock, Mutex},
    time::SystemTime,
};

use serde::Serialize;
use serde_json::Value;
use time::{OffsetDateTime, format_description::well_known::Rfc3339};

// The key of a session of the web chat before keys became opaque hashes.
const LEGACY_PICO_PREFIX: &str = "agent:main:pico:direct:pico:";
const OPAQUE_KEY_PREFIX: &str = "sk_v1_";
// What PicoClaw stores as the assistant's text after it has answered through a tool.
const HANDLED_TOOL_SUMMARY: &str = "Requested output delivered via tool attachment.";
const MAX_TITLE_RUNES: usize = 60;

#[derive(Debug, Clone, Serialize, PartialEq)]
pub struct SessionListItem {
    pub id: String,
    pub title: String,
    pub preview: String,
    pub message_count: usize,
    pub created: String,
    pub updated: String,
}

#[derive(Debug, Serialize, PartialEq)]
pub struct ChatMessage {
    pub role: String,
    pub content: String,
}

#[derive(Debug, Serialize, PartialEq)]
pub struct SessionDetail {
    pub id: String,
    pub messages: Vec<ChatMessage>,
    pub summary: String,
    pub created: String,
    pub updated: String,
}

struct SessionFile {
    messages: Vec<Value>,
    summary: String,
    created: Option<OffsetDateTime>,
    updated: Option<OffsetDateTime>,
}

#[derive(Debug, Clone, PartialEq)]
enum SessionRef {
    // `<sanitized key>.jsonl` and `.meta.json`
    Jsonl { id: String, key: String },
    // an older `<name>.json` that holds the whole session
    Legacy { id: String, path: PathBuf },
}

impl SessionRef {
    fn id(&self) -> &str {
        match self {
            SessionRef::Jsonl { id, .. } | SessionRef::Legacy { id, .. } => id,
        }
    }
}

// Where PicoClaw writes its sessions: the workspace of the agent, `~` allowed.
pub fn sessions_dir(config: &Value, picoclaw_home: &Path) -> PathBuf {
    let workspace = config
        .pointer("/agents/defaults/workspace")
        .and_then(Value::as_str)
        .map(str::trim)
        .filter(|workspace| !workspace.is_empty());
    let workspace = match workspace {
        Some(workspace) => expand_home(workspace, picoclaw_home),
        None => picoclaw_home.join("workspace"),
    };
    workspace.join("sessions")
}

// `~` is the home directory that holds `.picoclaw`.
fn expand_home(path: &str, picoclaw_home: &Path) -> PathBuf {
    let home = picoclaw_home.parent().unwrap_or(Path::new("/root"));
    match path.strip_prefix('~') {
        Some("") => home.to_path_buf(),
        Some(rest) if rest.starts_with('/') => home.join(rest.trim_start_matches('/')),
        _ => PathBuf::from(path),
    }
}

fn sanitize_key(key: &str) -> String {
    key.replace([':', '/', '\\'], "_")
}

// What the list showed of a session, and what the files looked like then: a session is read
// again only when its files change. A conversation can hold large tool results, and the list
// is opened often.
type Stamp = (u64, Option<SystemTime>, u64, Option<SystemTime>);

type CacheEntry = (Stamp, Option<SessionListItem>);

static LIST_CACHE: LazyLock<Mutex<HashMap<PathBuf, CacheEntry>>> =
    LazyLock::new(|| Mutex::new(HashMap::new()));

pub fn list_sessions(dir: &Path, offset: usize, limit: usize) -> Vec<SessionListItem> {
    // most recent first, ordered by what is cheap to know, so that only the sessions of the
    // page that is asked for are read
    let mut refs: Vec<(Option<OffsetDateTime>, SessionRef)> = find_refs(dir)
        .into_iter()
        .map(|session_ref| (ref_updated(dir, &session_ref), session_ref))
        .collect();
    refs.sort_by_key(|r| std::cmp::Reverse(r.0));

    let wanted = offset.saturating_add(limit);
    let mut items = Vec::new();
    for (_, session_ref) in &refs {
        if items.len() >= wanted {
            break;
        }
        if let Some(item) = list_item_cached(dir, session_ref) {
            items.push(item);
        }
    }
    items.into_iter().skip(offset).collect()
}

fn modified(path: &Path) -> (u64, Option<SystemTime>) {
    match fs::metadata(path) {
        Ok(meta) => (meta.len(), meta.modified().ok()),
        Err(_) => (0, None),
    }
}

// When a session was last used: its meta file knows, else its file does.
fn ref_updated(dir: &Path, session_ref: &SessionRef) -> Option<OffsetDateTime> {
    match session_ref {
        SessionRef::Jsonl { key, .. } => {
            let name = sanitize_key(key);
            read_json(&dir.join(format!("{name}.meta.json")))
                .and_then(|meta| parse_time(meta.get("updated_at")))
                .or_else(|| {
                    modified(&dir.join(format!("{name}.jsonl")))
                        .1
                        .map(system_time)
                })
        }
        SessionRef::Legacy { path, .. } => modified(path).1.map(system_time),
    }
}

fn list_item_cached(dir: &Path, session_ref: &SessionRef) -> Option<SessionListItem> {
    let build = || {
        let session = read_session(dir, session_ref).ok()?;
        (!is_empty(&session)).then(|| list_item(session_ref.id(), &session))
    };
    let SessionRef::Jsonl { key, .. } = session_ref else {
        return build();
    };
    let name = sanitize_key(key);
    let jsonl = dir.join(format!("{name}.jsonl"));
    let (jsonl_len, jsonl_time) = modified(&jsonl);
    let (meta_len, meta_time) = modified(&dir.join(format!("{name}.meta.json")));
    let stamp = (jsonl_len, jsonl_time, meta_len, meta_time);

    if let Ok(cache) = LIST_CACHE.lock()
        && let Some((cached, item)) = cache.get(&jsonl)
        && *cached == stamp
    {
        return item.clone();
    }
    let item = build();
    if let Ok(mut cache) = LIST_CACHE.lock() {
        if cache.len() > 1000 {
            cache.clear();
        }
        cache.insert(jsonl, (stamp, item.clone()));
    }
    item
}

pub fn load_session(dir: &Path, id: &str) -> Option<SessionDetail> {
    let session_ref = find_refs(dir)
        .into_iter()
        .find(|session_ref| session_ref.id() == id)?;
    let session = read_session(dir, &session_ref).ok()?;
    if is_empty(&session) {
        return None;
    }
    Some(SessionDetail {
        id: id.to_string(),
        messages: transcript(&session.messages),
        created: format_time(session.created),
        updated: format_time(session.updated),
        summary: session.summary,
    })
}

// Whether a session was found and removed.
pub fn delete_session(dir: &Path, id: &str) -> io::Result<bool> {
    let mut removed = false;
    for session_ref in find_refs(dir) {
        if session_ref.id() != id {
            continue;
        }
        let paths = match &session_ref {
            SessionRef::Jsonl { key, .. } => {
                let name = sanitize_key(key);
                vec![
                    dir.join(format!("{name}.jsonl")),
                    dir.join(format!("{name}.meta.json")),
                ]
            }
            SessionRef::Legacy { path, .. } => vec![path.clone()],
        };
        for path in paths {
            match fs::remove_file(&path) {
                Ok(()) => removed = true,
                Err(err) if err.kind() == io::ErrorKind::NotFound => {}
                Err(err) => return Err(err),
            }
        }
    }
    Ok(removed)
}

fn find_refs(dir: &Path) -> Vec<SessionRef> {
    let Ok(entries) = fs::read_dir(dir) else {
        return Vec::new();
    };
    let mut names: Vec<String> = entries
        .flatten()
        .filter(|entry| {
            entry
                .file_type()
                .map(|kind| kind.is_file())
                .unwrap_or(false)
        })
        .map(|entry| entry.file_name().to_string_lossy().into_owned())
        .collect();
    names.sort();

    let mut refs: Vec<SessionRef> = Vec::new();
    let mut meta_backed = Vec::new();

    // sessions that have a .meta.json
    for name in &names {
        let Some(base) = name.strip_suffix(".meta.json") else {
            continue;
        };
        let Some(meta) = read_json(&dir.join(name)) else {
            continue;
        };
        let Some((id, key)) = ref_from_meta(&meta) else {
            continue;
        };
        meta_backed.push(base.to_string());
        if !refs.iter().any(|existing| existing.id() == id) {
            refs.push(SessionRef::Jsonl { id, key });
        }
    }

    // a .jsonl without one
    for name in &names {
        let Some(base) = name.strip_suffix(".jsonl") else {
            continue;
        };
        if meta_backed.iter().any(|backed| backed == base) {
            continue;
        }
        let Some((id, key)) = ref_from_filename(base) else {
            continue;
        };
        if !refs.iter().any(|existing| existing.id() == id) {
            refs.push(SessionRef::Jsonl { id, key });
        }
    }

    // the older single-file sessions
    for name in &names {
        if !name.ends_with(".json") || name.ends_with(".meta.json") {
            continue;
        }
        let path = dir.join(name);
        let Some(session) = read_json(&path) else {
            continue;
        };
        let key = session.get("key").and_then(Value::as_str).unwrap_or("");
        let Some(id) = key
            .strip_prefix(LEGACY_PICO_PREFIX)
            .filter(|id| !id.is_empty())
        else {
            continue;
        };
        if !refs.iter().any(|existing| existing.id() == id) {
            refs.push(SessionRef::Legacy {
                id: id.to_string(),
                path,
            });
        }
    }
    refs
}

fn read_json(path: &Path) -> Option<Value> {
    serde_json::from_slice(&fs::read(path).ok()?).ok()
}

fn legacy_id(key: &str) -> Option<String> {
    key.strip_prefix(LEGACY_PICO_PREFIX)
        .filter(|id| !id.is_empty())
        .map(str::to_string)
}

// The id of the web chat session a meta file belongs to: PicoClaw's session scope names it
// ("pico:<id>"), older keys carry it in the key or an alias.
fn ref_from_meta(meta: &Value) -> Option<(String, String)> {
    let key = meta.get("key").and_then(Value::as_str)?.to_string();
    if key.is_empty() {
        return None;
    }
    if let Some(id) = meta.get("scope").and_then(scope_session_id) {
        return Some((id, key));
    }
    if let Some(id) = legacy_id(&key) {
        return Some((id, key));
    }
    meta.get("aliases")
        .and_then(Value::as_array)?
        .iter()
        .filter_map(Value::as_str)
        .find_map(legacy_id)
        .map(|id| (id, key))
}

fn scope_session_id(scope: &Value) -> Option<String> {
    let channel = scope.get("channel").and_then(Value::as_str)?.trim();
    if !channel.eq_ignore_ascii_case("pico") {
        return None;
    }
    ["sender", "chat"].iter().find_map(|field| {
        let value = scope.pointer(&format!("/values/{field}"))?.as_str()?.trim();
        let id = value[value.find("pico:")? + "pico:".len()..].trim();
        (!id.is_empty()).then(|| id.to_string())
    })
}

fn ref_from_filename(base: &str) -> Option<(String, String)> {
    let legacy_base = sanitize_key(LEGACY_PICO_PREFIX);
    if let Some(id) = base.strip_prefix(&legacy_base).filter(|id| !id.is_empty()) {
        return Some((id.to_string(), format!("{LEGACY_PICO_PREFIX}{id}")));
    }
    base.to_ascii_lowercase()
        .starts_with(OPAQUE_KEY_PREFIX)
        .then(|| (base.to_string(), base.to_string()))
}

fn read_session(dir: &Path, session_ref: &SessionRef) -> io::Result<SessionFile> {
    match session_ref {
        SessionRef::Legacy { path, .. } => {
            let value: Value = serde_json::from_slice(&fs::read(path)?)
                .map_err(|err| io::Error::new(io::ErrorKind::InvalidData, err))?;
            Ok(SessionFile {
                messages: value
                    .get("messages")
                    .and_then(Value::as_array)
                    .cloned()
                    .unwrap_or_default(),
                summary: str_field(&value, "summary"),
                created: parse_time(value.get("created")),
                updated: parse_time(value.get("updated")),
            })
        }
        SessionRef::Jsonl { key, .. } => {
            let name = sanitize_key(key);
            let meta = read_json(&dir.join(format!("{name}.meta.json"))).unwrap_or(Value::Null);
            let skip = meta.get("skip").and_then(Value::as_u64).unwrap_or(0) as usize;
            let jsonl = dir.join(format!("{name}.jsonl"));
            let messages = read_jsonl_messages(&jsonl, skip)?;
            let modified = modified(&jsonl).1.map(system_time);
            Ok(SessionFile {
                messages,
                summary: str_field(&meta, "summary"),
                created: parse_time(meta.get("created_at")).or(modified),
                updated: parse_time(meta.get("updated_at")).or(modified),
            })
        }
    }
}

// The messages of a .jsonl, one JSON object per line, without the first `skip` lines (PicoClaw cut
// those from the history). Tool results can be very large (screenshots), and the chat does not
// show them, so lines that start with another role than the user's or the assistant's are not
// parsed at all.
fn read_jsonl_messages(path: &Path, skip: usize) -> io::Result<Vec<Value>> {
    let mut messages = Vec::new();
    let mut seen = 0;
    for line in io::BufReader::new(fs::File::open(path)?).split(b'\n') {
        let line = line?;
        if line.iter().all(u8::is_ascii_whitespace) {
            continue;
        }
        seen += 1;
        if seen <= skip {
            continue;
        }
        let other_role = line.starts_with(b"{\"role\":\"")
            && !line.starts_with(b"{\"role\":\"user\"")
            && !line.starts_with(b"{\"role\":\"assistant\"");
        if other_role {
            continue;
        }
        if let Ok(message) = serde_json::from_slice::<Value>(&line)
            && !is_transient_thought(&message)
        {
            messages.push(message);
        }
    }
    Ok(messages)
}

fn system_time(time: SystemTime) -> OffsetDateTime {
    OffsetDateTime::from(time)
}

fn str_field(value: &Value, field: &str) -> String {
    value
        .get(field)
        .and_then(Value::as_str)
        .unwrap_or("")
        .to_string()
}

// Go's zero time (year 1) means "not set".
fn parse_time(value: Option<&Value>) -> Option<OffsetDateTime> {
    let time = OffsetDateTime::parse(value?.as_str()?, &Rfc3339).ok()?;
    (time.year() > 1).then_some(time)
}

fn format_time(time: Option<OffsetDateTime>) -> String {
    time.and_then(|time| time.format(&Rfc3339).ok())
        .unwrap_or_default()
}

// An assistant message that only holds reasoning is not part of the conversation.
fn is_transient_thought(message: &Value) -> bool {
    let text = |field: &str| {
        message
            .get(field)
            .and_then(Value::as_str)
            .unwrap_or("")
            .trim()
    };
    let has = |field: &str| {
        message
            .get(field)
            .and_then(Value::as_array)
            .is_some_and(|items| !items.is_empty())
    };
    text("role") == "assistant"
        && text("content").is_empty()
        && !text("reasoning_content").is_empty()
        && !has("tool_calls")
        && !has("media")
        && !has("attachments")
        && text("tool_call_id").is_empty()
}

fn is_empty(session: &SessionFile) -> bool {
    session.messages.is_empty() && session.summary.trim().is_empty()
}

// What the chat shows: the text of the user's and the assistant's messages.
fn transcript(messages: &[Value]) -> Vec<ChatMessage> {
    messages
        .iter()
        .filter_map(|message| {
            let role = message.get("role")?.as_str()?;
            let content = message.get("content").and_then(Value::as_str).unwrap_or("");
            let visible = match role {
                "user" => !content.trim().is_empty(),
                "assistant" => !content.trim().is_empty() && content.trim() != HANDLED_TOOL_SUMMARY,
                _ => false,
            };
            visible.then(|| ChatMessage {
                role: role.to_string(),
                content: content.to_string(),
            })
        })
        .collect()
}

fn list_item(id: &str, session: &SessionFile) -> SessionListItem {
    let messages = transcript(&session.messages);
    let preview = messages
        .iter()
        .find(|message| message.role == "user")
        .map(|message| truncate(&message.content, MAX_TITLE_RUNES))
        .filter(|text| !text.is_empty())
        .unwrap_or_else(|| "(empty)".to_string());
    SessionListItem {
        id: id.to_string(),
        title: preview.clone(),
        preview,
        message_count: messages.len(),
        created: format_time(session.created),
        updated: format_time(session.updated),
    }
}

fn truncate(text: &str, max: usize) -> String {
    let text = text.trim();
    if text.chars().count() <= max {
        return text.to_string();
    }
    format!("{}...", text.chars().take(max).collect::<String>())
}

#[cfg(test)]
mod tests {
    use serde_json::json;

    use super::*;

    fn write(dir: &Path, name: &str, content: &str) {
        fs::write(dir.join(name), content).unwrap();
    }

    fn lines(messages: &[Value]) -> String {
        messages
            .iter()
            .map(|message| message.to_string())
            .collect::<Vec<_>>()
            .join("\n")
    }

    // a session of the current layout: an opaque key and a scope that names the web session
    fn write_scoped(dir: &Path, key: &str, id: &str, updated: &str, messages: &[Value]) {
        write(
            dir,
            &format!("{key}.meta.json"),
            &json!({
                "key": key,
                "summary": "",
                "skip": 0,
                "count": messages.len(),
                "created_at": "2026-10-18T09:00:00+02:00",
                "updated_at": updated,
                "scope": {
                    "version": 1, "agent_id": "main", "channel": "pico", "account": "",
                    "dimensions": ["sender"], "values": {"sender": format!("pico:{id}")}
                }
            })
            .to_string(),
        );
        write(dir, &format!("{key}.jsonl"), &lines(messages));
    }

    #[test]
    fn lists_scoped_sessions_newest_first_with_a_preview_of_the_first_user_message() {
        let dir = tempfile::tempdir().unwrap();
        write_scoped(
            dir.path(),
            "sk_v1_aaa",
            "id-old",
            "2026-10-18T09:05:00+02:00",
            &[
                json!({"role": "user", "content": "Hello"}),
                json!({"role": "assistant", "content": "Hi there"}),
            ],
        );
        write_scoped(
            dir.path(),
            "sk_v1_bbb",
            "id-new",
            "2026-10-18T10:30:00+02:00",
            &[
                json!({"role": "user", "content": "x".repeat(80)}),
                json!({"role": "assistant", "content": "", "tool_calls": [{"id": "1"}]}),
                json!({"role": "tool", "content": "result", "tool_call_id": "1"}),
                json!({"role": "assistant", "content": "Done"}),
            ],
        );

        let items = list_sessions(dir.path(), 0, 20);
        assert_eq!(items.len(), 2);
        assert_eq!(items[0].id, "id-new");
        assert_eq!(items[0].preview, format!("{}...", "x".repeat(60)));
        // the user's message and the answer; the tool call and its result are not shown
        assert_eq!(items[0].message_count, 2);
        assert_eq!(items[1].id, "id-old");
        assert_eq!(items[1].title, "Hello");
        assert_eq!(items[1].updated, "2026-10-18T09:05:00+02:00");
    }

    #[test]
    fn pages_the_list() {
        let dir = tempfile::tempdir().unwrap();
        for (n, key) in ["sk_v1_a", "sk_v1_b", "sk_v1_c"].iter().enumerate() {
            write_scoped(
                dir.path(),
                key,
                &format!("id-{n}"),
                &format!("2026-10-18T10:0{n}:00+02:00"),
                &[json!({"role": "user", "content": "q"})],
            );
        }
        let ids = |offset, limit| {
            list_sessions(dir.path(), offset, limit)
                .into_iter()
                .map(|item| item.id)
                .collect::<Vec<_>>()
        };
        assert_eq!(ids(0, 2), ["id-2", "id-1"]);
        assert_eq!(ids(2, 2), ["id-0"]);
        assert!(ids(3, 2).is_empty());
    }

    #[test]
    fn finds_sessions_by_the_old_key_and_by_file_name() {
        let dir = tempfile::tempdir().unwrap();
        // old key in a meta file without a scope
        let key = format!("{LEGACY_PICO_PREFIX}abc");
        write(
            dir.path(),
            &format!("{}.meta.json", sanitize_key(&key)),
            &json!({"key": key, "created_at": "2026-10-18T09:00:00Z", "updated_at": "2026-10-18T09:01:00Z"}).to_string(),
        );
        write(
            dir.path(),
            &format!("{}.jsonl", sanitize_key(&key)),
            &lines(&[json!({"role": "user", "content": "old key"})]),
        );
        // a jsonl without a meta file
        write(
            dir.path(),
            &format!("{}def.jsonl", sanitize_key(LEGACY_PICO_PREFIX)),
            &lines(&[json!({"role": "user", "content": "no meta"})]),
        );
        // other channels are not part of the web chat
        write(
            dir.path(),
            "agent_main_telegram_direct_42.jsonl",
            &lines(&[json!({"role": "user", "content": "telegram"})]),
        );

        let mut ids: Vec<_> = list_sessions(dir.path(), 0, 20)
            .into_iter()
            .map(|item| item.id)
            .collect();
        ids.sort();
        assert_eq!(ids, ["abc", "def"]);
    }

    #[test]
    fn reads_the_single_file_sessions_of_older_versions() {
        let dir = tempfile::tempdir().unwrap();
        write(
            dir.path(),
            "old.json",
            &json!({
                "key": format!("{LEGACY_PICO_PREFIX}legacy"),
                "messages": [
                    {"role": "user", "content": "from the past"},
                    {"role": "assistant", "content": "still here"}
                ],
                "created": "2026-01-01T10:00:00Z",
                "updated": "2026-01-01T10:05:00Z"
            })
            .to_string(),
        );
        let detail = load_session(dir.path(), "legacy").unwrap();
        assert_eq!(detail.messages.len(), 2);
        assert_eq!(detail.updated, "2026-01-01T10:05:00Z");
    }

    #[test]
    fn detail_skips_what_picoclaw_cut_and_what_the_chat_does_not_show() {
        let dir = tempfile::tempdir().unwrap();
        write_scoped(
            dir.path(),
            "sk_v1_cut",
            "cut",
            "2026-10-18T10:00:00+02:00",
            &[
                json!({"role": "user", "content": "cut from the history"}),
                json!({"role": "user", "content": "kept"}),
                json!({"role": "assistant", "content": "", "reasoning_content": "thinking"}),
                json!({"role": "assistant", "content": HANDLED_TOOL_SUMMARY}),
                json!({"role": "assistant", "content": "answer"}),
            ],
        );
        let meta = dir.path().join("sk_v1_cut.meta.json");
        let mut value: Value = serde_json::from_slice(&fs::read(&meta).unwrap()).unwrap();
        value["skip"] = json!(1);
        value["summary"] = json!("a summary");
        fs::write(&meta, value.to_string()).unwrap();

        let detail = load_session(dir.path(), "cut").unwrap();
        let texts: Vec<_> = detail
            .messages
            .iter()
            .map(|message| (message.role.as_str(), message.content.as_str()))
            .collect();
        assert_eq!(texts, [("user", "kept"), ("assistant", "answer")]);
        assert_eq!(detail.summary, "a summary");
        assert!(load_session(dir.path(), "missing").is_none());
    }

    #[test]
    fn tool_lines_are_skipped_without_being_parsed() {
        let dir = tempfile::tempdir().unwrap();
        write_scoped(
            dir.path(),
            "sk_v1_big",
            "big",
            "2026-10-18T10:00:00Z",
            &[json!({"role": "user", "content": "look at the screen"})],
        );
        // a tool result of a few MB that is not even valid JSON must not matter
        let jsonl = dir.path().join("sk_v1_big.jsonl");
        let mut text = fs::read_to_string(&jsonl).unwrap();
        text.push_str("\n{\"role\":\"tool\",\"content\":\"");
        text.push_str(&"A".repeat(4_000_000));
        text.push('\n');
        text.push_str(&json!({"role": "assistant", "content": "I see it"}).to_string());
        fs::write(&jsonl, text).unwrap();

        let items = list_sessions(dir.path(), 0, 20);
        assert_eq!(items.len(), 1);
        assert_eq!(items[0].message_count, 2);
        assert_eq!(load_session(dir.path(), "big").unwrap().messages.len(), 2);
    }

    #[test]
    fn only_the_sessions_of_the_requested_page_are_read() {
        let dir = tempfile::tempdir().unwrap();
        for (n, key) in ["sk_v1_a", "sk_v1_b", "sk_v1_c"].iter().enumerate() {
            write_scoped(
                dir.path(),
                key,
                &format!("id-{n}"),
                &format!("2026-10-18T10:0{n}:00Z"),
                &[json!({"role": "user", "content": "q"})],
            );
        }
        let items = list_sessions(dir.path(), 0, 1);
        assert_eq!(items.len(), 1);
        assert_eq!(items[0].id, "id-2");
        let cache = LIST_CACHE.lock().unwrap();
        let read: Vec<_> = cache
            .keys()
            .filter(|path| path.starts_with(dir.path()))
            .collect();
        assert_eq!(read.len(), 1);
    }

    #[test]
    fn the_list_follows_a_session_that_grows() {
        let dir = tempfile::tempdir().unwrap();
        write_scoped(
            dir.path(),
            "sk_v1_grow",
            "grow",
            "2026-10-18T10:00:00Z",
            &[json!({"role": "user", "content": "first"})],
        );
        assert_eq!(list_sessions(dir.path(), 0, 20)[0].message_count, 1);

        let jsonl = dir.path().join("sk_v1_grow.jsonl");
        let mut text = fs::read_to_string(&jsonl).unwrap();
        text.push('\n');
        text.push_str(&json!({"role": "assistant", "content": "second"}).to_string());
        fs::write(&jsonl, text).unwrap();
        assert_eq!(list_sessions(dir.path(), 0, 20)[0].message_count, 2);
    }

    #[test]
    fn empty_sessions_are_not_listed() {
        let dir = tempfile::tempdir().unwrap();
        write_scoped(
            dir.path(),
            "sk_v1_empty",
            "empty",
            "2026-10-18T10:00:00Z",
            &[],
        );
        assert!(list_sessions(dir.path(), 0, 20).is_empty());
        assert!(load_session(dir.path(), "empty").is_none());
    }

    #[test]
    fn deleting_removes_both_files_and_reports_a_missing_session() {
        let dir = tempfile::tempdir().unwrap();
        write_scoped(
            dir.path(),
            "sk_v1_del",
            "del",
            "2026-10-18T10:00:00Z",
            &[json!({"role": "user", "content": "bye"})],
        );
        assert!(delete_session(dir.path(), "del").unwrap());
        assert!(!dir.path().join("sk_v1_del.jsonl").exists());
        assert!(!dir.path().join("sk_v1_del.meta.json").exists());
        assert!(!delete_session(dir.path(), "del").unwrap());
        assert!(list_sessions(dir.path(), 0, 20).is_empty());
    }

    #[test]
    fn the_sessions_directory_follows_the_workspace_of_the_config() {
        let home = Path::new("/root/.picoclaw");
        assert_eq!(
            sessions_dir(&json!({}), home),
            Path::new("/root/.picoclaw/workspace/sessions")
        );
        assert_eq!(
            sessions_dir(
                &json!({"agents": {"defaults": {"workspace": "~/.picoclaw/ws"}}}),
                home
            ),
            Path::new("/root/.picoclaw/ws/sessions")
        );
        assert_eq!(
            sessions_dir(
                &json!({"agents": {"defaults": {"workspace": "/data/ws"}}}),
                home
            ),
            Path::new("/data/ws/sessions")
        );
    }
}
