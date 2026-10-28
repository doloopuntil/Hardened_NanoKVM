//! The certificate the server gets from outside (Tailscale, an ACME CA): where it is kept, how
//! it is installed without a restart and when it expires.

use std::path::Path;

use time::{Date, Month, OffsetDateTime, PrimitiveDateTime, Time};
use tokio_rustls::rustls::pki_types::{CertificateDer, pem::PemObject};

use crate::{AppError, Result, fsutil::write_0600_atomic, http::tls::CertResolver};

pub const CERT_DIR: &str = "/etc/kvm/certs";
/// Certificate chain and private key in one file, so a reader never sees a mismatched pair.
pub const MANAGED_PEM: &str = "/etc/kvm/certs/managed.pem";

/// Install a certificate chain and its key: check them, replace `pem_path` atomically and
/// start serving the new pair. Nothing changes if the pair does not load.
pub fn install(
    resolver: &CertResolver,
    pem_path: &Path,
    cert_pem: &str,
    key_pem: &str,
) -> Result<OffsetDateTime> {
    let not_after = not_after(cert_pem.as_bytes())?;
    let mut combined = String::with_capacity(cert_pem.len() + key_pem.len() + 2);
    combined.push_str(cert_pem.trim_end());
    combined.push('\n');
    combined.push_str(key_pem.trim_end());
    combined.push('\n');

    let staged = pem_path.with_extension("pem.new");
    write_0600_atomic(&staged, combined.as_bytes())?;
    let checked = CertResolver::check(&staged, &staged);
    let result = checked
        .and_then(|()| std::fs::rename(&staged, pem_path).map_err(AppError::from))
        .and_then(|()| resolver.reload(pem_path, pem_path));
    if result.is_err() {
        let _ = std::fs::remove_file(&staged);
    }
    result.map(|()| not_after)
}

/// The expiry of the first (leaf) certificate of a PEM chain.
pub fn not_after(pem: &[u8]) -> Result<OffsetDateTime> {
    let der = CertificateDer::pem_slice_iter(pem)
        .next()
        .and_then(|cert| cert.ok())
        .ok_or_else(|| AppError::Config("no certificate found".to_string()))?;
    parse_not_after(der.as_ref())
        .ok_or_else(|| AppError::Config("cannot read the certificate's expiry".to_string()))
}

/// One DER element: its tag, its content and what follows.
fn element(data: &[u8]) -> Option<(u8, &[u8], &[u8])> {
    let (&tag, rest) = data.split_first()?;
    let (&first, rest) = rest.split_first()?;
    let (len, rest) = if first < 0x80 {
        (usize::from(first), rest)
    } else {
        let count = usize::from(first & 0x7f);
        if count == 0 || count > 4 || rest.len() < count {
            return None;
        }
        let len = rest[..count]
            .iter()
            .fold(0usize, |len, &b| (len << 8) | usize::from(b));
        (len, &rest[count..])
    };
    (rest.len() >= len).then(|| (tag, &rest[..len], &rest[len..]))
}

fn parse_not_after(der: &[u8]) -> Option<OffsetDateTime> {
    let (_, cert, _) = element(der)?;
    let (_, mut tbs, _) = element(cert)?;
    // optional [0] version, then serial, signature and issuer, then validity
    if tbs.first() == Some(&0xa0) {
        tbs = element(tbs)?.2;
    }
    for _ in 0..3 {
        tbs = element(tbs)?.2;
    }
    let (_, validity, _) = element(tbs)?;
    // notBefore, then notAfter
    let validity = element(validity)?.2;
    let (tag, text, _) = element(validity)?;
    parse_time(tag, text)
}

/// UTCTime (YYMMDDHHMMSSZ) or GeneralizedTime (YYYYMMDDHHMMSSZ).
fn parse_time(tag: u8, text: &[u8]) -> Option<OffsetDateTime> {
    let text = std::str::from_utf8(text).ok()?.strip_suffix('Z')?;
    let (year, rest) = match tag {
        0x17 if text.len() == 12 => {
            let yy: i32 = text[..2].parse().ok()?;
            (if yy >= 50 { 1900 + yy } else { 2000 + yy }, &text[2..])
        }
        0x18 if text.len() == 14 => (text[..4].parse().ok()?, &text[4..]),
        _ => return None,
    };
    let field = |i: usize| rest.get(i * 2..i * 2 + 2)?.parse::<u8>().ok();
    let date = Date::from_calendar_date(year, Month::try_from(field(0)?).ok()?, field(1)?).ok()?;
    let time = Time::from_hms(field(2)?, field(3)?, field(4)?).ok()?;
    Some(PrimitiveDateTime::new(date, time).assume_utc())
}

#[cfg(test)]
mod tests {
    use rcgen::{CertificateParams, KeyPair, date_time_ymd};

    use super::*;
    use crate::http::tls;

    fn cert_expiring(year: i32) -> (String, String) {
        let mut params = CertificateParams::new(vec!["localhost".to_string()]).unwrap();
        params.not_after = date_time_ymd(year, 3, 4);
        let key = KeyPair::generate().unwrap();
        let cert = params.self_signed(&key).unwrap();
        (cert.pem(), key.serialize_pem())
    }

    #[test]
    fn the_expiry_is_read_from_utc_and_generalized_time() {
        // 2049 is a UTCTime, 2051 a GeneralizedTime
        for year in [2030, 2049, 2051] {
            let (cert, _) = cert_expiring(year);
            let expiry = not_after(cert.as_bytes()).unwrap();
            assert_eq!(
                (expiry.year(), u8::from(expiry.month()), expiry.day()),
                (year, 3, 4),
                "{year}"
            );
        }
        assert!(not_after(b"nothing").is_err());
    }

    #[test]
    fn an_installed_pair_is_served_and_a_bad_one_changes_nothing() {
        tls::install_crypto_provider();
        let dir = tempfile::tempdir().unwrap();
        let (crt, key) = (dir.path().join("a.crt"), dir.path().join("a.key"));
        tls::generate_self_signed_cert(&crt, &key).unwrap();
        let (_, resolver) = tls::load_server_config(&crt, &key).unwrap();
        let pem_path = dir.path().join("managed.pem");

        let (cert_a, key_a) = cert_expiring(2031);
        let expiry = install(&resolver, &pem_path, &cert_a, &key_a).unwrap();
        assert_eq!(expiry.year(), 2031);
        assert!(CertResolver::check(&pem_path, &pem_path).is_ok());
        let mode = std::os::unix::fs::PermissionsExt::mode(
            &std::fs::metadata(&pem_path).unwrap().permissions(),
        );
        assert_eq!(mode & 0o777, 0o600);

        // a key that belongs to another certificate
        let (cert_b, key_b) = cert_expiring(2032);
        assert!(install(&resolver, &pem_path, &cert_b, &key_a).is_err());
        let kept = std::fs::read_to_string(&pem_path).unwrap();
        assert!(kept.contains(cert_a.trim_end()) && kept.contains(key_a.trim_end()));
        assert!(!dir.path().join("managed.pem.new").exists());
        assert!(install(&resolver, &pem_path, &cert_b, &key_b).is_ok());
    }
}
