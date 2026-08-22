use std::{
    collections::BTreeSet,
    fs,
    io::ErrorKind,
    os::unix::fs::PermissionsExt,
    path::{Path, PathBuf},
};

use crate::{AppError, Result};

pub const LEGACY_UPDATE_KEY_ID: &str = "hardened-system-dev";
pub const LEGACY_TEST_UPDATE_KEY_ID: &str = "hardened-system-test";
const UPDATE_KEYRING_DIR: &str = "update-keys";
const UPDATE_KEY_POLICY_FILE: &str = "update-key-policy";
const UPDATE_PUBLIC_KEY_SUFFIX: &str = ".pub.pem";
const MAX_UPDATE_KEY_ID_BYTES: usize = 128;
const MAX_UPDATE_KEY_POLICY_BYTES: u64 = 16 * 1024;

pub fn resolve_update_public_key(configured_key: &Path, key_id: &str) -> Result<PathBuf> {
    validate_update_key_id(key_id)?;

    let parent = configured_key.parent().ok_or_else(|| {
        AppError::Config("system update public key path has no parent".to_string())
    })?;
    enforce_update_key_policy(parent, key_id)?;

    if matches!(key_id, LEGACY_UPDATE_KEY_ID | LEGACY_TEST_UPDATE_KEY_ID) {
        return require_public_key(configured_key.to_path_buf(), key_id);
    }

    let keyring = parent.join(UPDATE_KEYRING_DIR);
    let candidate = keyring.join(format!("{key_id}{UPDATE_PUBLIC_KEY_SUFFIX}"));
    if !candidate.starts_with(&keyring) {
        return Err(AppError::Config(
            "update public key path escapes keyring".to_string(),
        ));
    }
    require_public_key(candidate, key_id)
}

fn require_public_key(path: PathBuf, key_id: &str) -> Result<PathBuf> {
    let metadata = fs::symlink_metadata(&path).map_err(|_| {
        AppError::Config(format!(
            "update public key is not configured for key id {key_id}: {}",
            path.display()
        ))
    })?;
    if !metadata.file_type().is_file() || metadata.permissions().mode() & 0o022 != 0 {
        return Err(AppError::Config(format!(
            "update public key must be a regular, non-writable-by-group-or-other file for key id {key_id}: {}",
            path.display()
        )));
    }
    Ok(path)
}

fn validate_update_key_id(key_id: &str) -> Result<()> {
    if key_id.is_empty()
        || key_id.len() > MAX_UPDATE_KEY_ID_BYTES
        || key_id.starts_with('.')
        || key_id.ends_with('.')
        || key_id.contains("..")
        || !key_id
            .chars()
            .all(|ch| ch.is_ascii_alphanumeric() || matches!(ch, '.' | '_' | '-' | '+'))
    {
        return Err(AppError::BadRequest(
            "invalid update signature key id".to_string(),
        ));
    }
    Ok(())
}

fn enforce_update_key_policy(parent: &Path, key_id: &str) -> Result<()> {
    let path = parent.join(UPDATE_KEY_POLICY_FILE);
    let metadata = match fs::symlink_metadata(&path) {
        Ok(metadata) => metadata,
        Err(error) if error.kind() == ErrorKind::NotFound => return Ok(()),
        Err(error) => return Err(error.into()),
    };
    if !metadata.file_type().is_file() || metadata.permissions().mode() & 0o022 != 0 {
        return Err(AppError::Config(format!(
            "update key policy must be a regular, non-writable-by-group-or-other file: {}",
            path.display()
        )));
    }
    if metadata.len() > MAX_UPDATE_KEY_POLICY_BYTES {
        return Err(AppError::Config(
            "update key policy is too large".to_string(),
        ));
    }

    let content = fs::read_to_string(&path)?;
    let mut allowed = BTreeSet::new();
    for line in content.lines() {
        let candidate = line.trim();
        if candidate.is_empty() || candidate.starts_with('#') {
            continue;
        }
        if validate_update_key_id(candidate).is_err() {
            return Err(AppError::Config(format!(
                "invalid key id in update key policy: {candidate}"
            )));
        }
        allowed.insert(candidate);
    }
    if allowed.is_empty() {
        return Err(AppError::Config(
            "update key policy contains no allowed key ids".to_string(),
        ));
    }
    if !allowed.contains(key_id) {
        return Err(AppError::BadRequest(format!(
            "update signature key id is not allowed by policy: {key_id}"
        )));
    }
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn resolves_legacy_and_keyring_public_keys_by_id() {
        let temp = tempfile::tempdir().unwrap();
        let configured = temp.path().join("system-update-signing.pub.pem");
        std::fs::write(&configured, b"legacy").unwrap();
        let keyring = temp.path().join(UPDATE_KEYRING_DIR);
        std::fs::create_dir_all(&keyring).unwrap();
        let production = keyring.join("hardened-system-prod-2026.pub.pem");
        std::fs::write(&production, b"production").unwrap();

        assert_eq!(
            resolve_update_public_key(&configured, LEGACY_UPDATE_KEY_ID).unwrap(),
            configured
        );
        assert_eq!(
            resolve_update_public_key(&configured, LEGACY_TEST_UPDATE_KEY_ID).unwrap(),
            configured
        );
        assert_eq!(
            resolve_update_public_key(&configured, "hardened-system-prod-2026").unwrap(),
            production
        );
    }

    #[test]
    fn rejects_unknown_or_unsafe_update_key_ids() {
        let temp = tempfile::tempdir().unwrap();
        let configured = temp.path().join("system-update-signing.pub.pem");
        std::fs::write(&configured, b"legacy").unwrap();

        assert!(resolve_update_public_key(&configured, "unknown-key").is_err());
        assert!(resolve_update_public_key(&configured, "../key").is_err());
        assert!(resolve_update_public_key(&configured, "bad/key").is_err());
        assert!(resolve_update_public_key(&configured, &"a".repeat(129)).is_err());
    }

    #[test]
    fn policy_can_disable_the_legacy_key_after_rotation() {
        let temp = tempfile::tempdir().unwrap();
        let configured = temp.path().join("system-update-signing.pub.pem");
        std::fs::write(&configured, b"legacy").unwrap();
        let keyring = temp.path().join(UPDATE_KEYRING_DIR);
        std::fs::create_dir_all(&keyring).unwrap();
        let production = keyring.join("hardened-system-prod-2026.pub.pem");
        std::fs::write(&production, b"production").unwrap();
        std::fs::write(
            temp.path().join(UPDATE_KEY_POLICY_FILE),
            b"# production trust set\nhardened-system-prod-2026\n",
        )
        .unwrap();

        assert_eq!(
            resolve_update_public_key(&configured, "hardened-system-prod-2026").unwrap(),
            production
        );
        assert!(resolve_update_public_key(&configured, LEGACY_UPDATE_KEY_ID).is_err());
        assert!(resolve_update_public_key(&configured, LEGACY_TEST_UPDATE_KEY_ID).is_err());
    }

    #[test]
    fn rejects_empty_or_malformed_key_policy() {
        let temp = tempfile::tempdir().unwrap();
        let configured = temp.path().join("system-update-signing.pub.pem");
        std::fs::write(&configured, b"legacy").unwrap();
        let policy = temp.path().join(UPDATE_KEY_POLICY_FILE);

        std::fs::write(&policy, b"# no active keys\n").unwrap();
        assert!(resolve_update_public_key(&configured, LEGACY_UPDATE_KEY_ID).is_err());

        std::fs::write(&policy, b"../unsafe\n").unwrap();
        assert!(resolve_update_public_key(&configured, LEGACY_UPDATE_KEY_ID).is_err());
    }
}
