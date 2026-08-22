use std::path::{Path, PathBuf};

use crate::{AppError, Result};

pub const LEGACY_UPDATE_KEY_ID: &str = "hardened-system-dev";
const UPDATE_KEYRING_DIR: &str = "update-keys";
const UPDATE_PUBLIC_KEY_SUFFIX: &str = ".pub.pem";

pub fn resolve_update_public_key(configured_key: &Path, key_id: &str) -> Result<PathBuf> {
    validate_update_key_id(key_id)?;

    if key_id == LEGACY_UPDATE_KEY_ID {
        return require_public_key(configured_key.to_path_buf(), key_id);
    }

    let parent = configured_key.parent().ok_or_else(|| {
        AppError::Config("system update public key path has no parent".to_string())
    })?;
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
    if !path.is_file() {
        return Err(AppError::Config(format!(
            "update public key is not configured for key id {key_id}: {}",
            path.display()
        )));
    }
    Ok(path)
}

fn validate_update_key_id(key_id: &str) -> Result<()> {
    if key_id.is_empty()
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
    }
}
