//! Certificate issuance from an ACME CA such as Let's Encrypt, answering the TLS-ALPN-01
//! challenge on the HTTPS listener itself.

use std::{fs, path::Path, time::Duration};

use instant_acme::{
    Account, AccountCredentials, AuthorizationStatus, ChallengeType, Identifier, NewAccount,
    NewOrder, OrderStatus, RetryPolicy,
};

use crate::{AppError, Result, fsutil::write_0600_atomic, http::tls::CertResolver};

/// A CA gets this long to validate the challenge and issue the certificate.
const ISSUE_TIMEOUT: Duration = Duration::from_secs(120);

pub struct Settings<'a> {
    pub directory_url: &'a str,
    pub domain: &'a str,
    pub email: Option<&'a str>,
    /// Account credentials; one file per CA directory, since accounts do not carry over.
    pub account_path: &'a Path,
}

/// A certificate chain and its private key, both PEM.
pub struct Issued {
    pub cert_pem: String,
    pub key_pem: String,
}

/// A name a public CA can issue for: a DNS name with a dot, not a wildcard, an IP or a local name.
pub fn validate_domain(domain: &str) -> Result<()> {
    let bad = |msg: &str| Err(AppError::BadRequest(format!("invalid domain: {msg}")));
    if domain.len() > 253 || !domain.contains('.') {
        return bad("a full domain name such as kvm.example.org is needed");
    }
    if domain.parse::<std::net::IpAddr>().is_ok() {
        return bad("certificates are not issued for IP addresses");
    }
    let lower = domain.to_ascii_lowercase();
    if [".local", ".localhost", ".lan", ".internal", ".home.arpa"]
        .iter()
        .any(|suffix| lower.ends_with(suffix))
    {
        return bad("local names cannot get a public certificate");
    }
    let label_ok = |label: &str| {
        !label.is_empty()
            && label.len() <= 63
            && !label.starts_with('-')
            && !label.ends_with('-')
            && label
                .bytes()
                .all(|b| b.is_ascii_alphanumeric() || b == b'-')
    };
    if !domain.split('.').all(label_ok) {
        return bad("use letters, digits and hyphens; wildcards are not supported");
    }
    Ok(())
}

/// Order a certificate for `settings.domain` and return it; nothing is installed.
pub async fn issue(resolver: &CertResolver, settings: &Settings<'_>) -> Result<Issued> {
    validate_domain(settings.domain)?;
    tokio::time::timeout(ISSUE_TIMEOUT, run_order(resolver, settings))
        .await
        .map_err(|_| acme_error("the CA did not finish in time"))?
}

fn acme_error(err: impl std::fmt::Display) -> AppError {
    AppError::Internal(format!("certificate request failed: {err}"))
}

async fn account(settings: &Settings<'_>) -> Result<Account> {
    let builder = Account::builder().map_err(acme_error)?;
    if let Ok(data) = fs::read(settings.account_path)
        && let Ok(credentials) = serde_json::from_slice::<AccountCredentials>(&data)
    {
        return builder
            .from_credentials(credentials)
            .await
            .map_err(acme_error);
    }

    let contact = settings.email.map(|email| format!("mailto:{email}"));
    let contacts: Vec<&str> = contact.as_deref().into_iter().collect();
    let (account, credentials) = builder
        .create(
            &NewAccount {
                contact: &contacts,
                terms_of_service_agreed: true,
                only_return_existing: false,
            },
            settings.directory_url.to_string(),
            None,
        )
        .await
        .map_err(acme_error)?;
    let data = serde_json::to_vec(&credentials).map_err(acme_error)?;
    write_0600_atomic(settings.account_path, &data)?;
    Ok(account)
}

/// Removes the challenge when the order ends, however it ends.
struct ChallengeGuard<'a> {
    resolver: &'a CertResolver,
    domain: &'a str,
}

impl Drop for ChallengeGuard<'_> {
    fn drop(&mut self) {
        self.resolver.clear_challenge(self.domain);
    }
}

async fn run_order(resolver: &CertResolver, settings: &Settings<'_>) -> Result<Issued> {
    let account = account(settings).await?;
    let identifiers = [Identifier::Dns(settings.domain.to_string())];
    let mut order = account
        .new_order(&NewOrder::new(&identifiers))
        .await
        .map_err(acme_error)?;

    let _guard = ChallengeGuard {
        resolver,
        domain: settings.domain,
    };
    let mut authorizations = order.authorizations();
    while let Some(authz) = authorizations.next().await {
        let mut authz = authz.map_err(acme_error)?;
        match authz.status {
            AuthorizationStatus::Pending => {}
            AuthorizationStatus::Valid => continue,
            status => return Err(acme_error(format!("authorization is {status:?}"))),
        }

        let mut challenge = authz
            .challenge(ChallengeType::TlsAlpn01)
            .ok_or_else(|| acme_error("the CA offers no TLS-ALPN-01 challenge"))?;
        resolver.set_challenge(
            settings.domain,
            challenge.key_authorization().digest().as_ref(),
        )?;
        challenge.set_ready().await.map_err(acme_error)?;
    }

    let status = order
        .poll_ready(&RetryPolicy::default())
        .await
        .map_err(acme_error)?;
    if status != OrderStatus::Ready {
        return Err(acme_error(format!(
            "the CA could not validate {} (order is {status:?}); is port 443 reachable from the internet?",
            settings.domain
        )));
    }

    let key_pem = order.finalize().await.map_err(acme_error)?;
    let cert_pem = order
        .poll_certificate(&RetryPolicy::default())
        .await
        .map_err(acme_error)?;
    Ok(Issued { cert_pem, key_pem })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn public_dns_names_pass() {
        for name in ["kvm.example.org", "a-b.example.co.uk", "KVM.Example.ORG"] {
            assert!(validate_domain(name).is_ok(), "{name}");
        }
    }

    #[test]
    fn names_a_public_ca_cannot_use_are_refused() {
        for name in [
            "kvm",
            "kvm.local",
            "nanokvm.lan",
            "192.168.1.5",
            "::1",
            "*.example.org",
            "-a.example.org",
            "a..example.org",
            "a b.example.org",
            "",
        ] {
            assert!(validate_domain(name).is_err(), "{name:?}");
        }
    }
}
