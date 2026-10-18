use std::{
    fs::{self, File, OpenOptions},
    io,
    net::SocketAddr,
    os::unix::fs::{OpenOptionsExt, PermissionsExt},
    path::Path,
    sync::Arc,
    time::Duration,
};

use axum::{
    extract::connect_info::Connected,
    serve::{IncomingStream, Listener},
};
use rcgen::{CertifiedKey, generate_simple_self_signed};
use tokio::{net::TcpListener, time};
use tokio_rustls::{
    TlsAcceptor,
    rustls::{
        CipherSuite, ServerConfig,
        crypto::{CryptoProvider, ring},
        pki_types::{CertificateDer, PrivateKeyDer, pem::PemObject},
    },
    server::TlsStream,
};
use tracing::warn;

use crate::{AppError, Result};

#[derive(Debug, Clone, Copy)]
pub struct ClientAddr(pub SocketAddr);

pub struct TlsListener {
    listener: TcpListener,
    acceptor: TlsAcceptor,
}

impl Connected<IncomingStream<'_, TcpListener>> for ClientAddr {
    fn connect_info(stream: IncomingStream<'_, TcpListener>) -> Self {
        Self(*stream.remote_addr())
    }
}

impl TlsListener {
    pub fn new(listener: TcpListener, config: ServerConfig) -> Self {
        Self {
            listener,
            acceptor: TlsAcceptor::from(Arc::new(config)),
        }
    }
}

impl Listener for TlsListener {
    type Io = TlsStream<tokio::net::TcpStream>;
    type Addr = SocketAddr;

    async fn accept(&mut self) -> (Self::Io, Self::Addr) {
        loop {
            let (stream, addr) = match self.listener.accept().await {
                Ok(stream) => stream,
                Err(err) => {
                    warn!(error = ?err, "failed to accept tcp connection");
                    time::sleep(Duration::from_secs(1)).await;
                    continue;
                }
            };

            match self.acceptor.accept(stream).await {
                Ok(stream) => return (stream, addr),
                Err(err) => {
                    warn!(%addr, error = ?err, "failed to accept tls connection");
                }
            }
        }
    }

    fn local_addr(&self) -> io::Result<Self::Addr> {
        self.listener.local_addr()
    }
}

impl Connected<IncomingStream<'_, TlsListener>> for ClientAddr {
    fn connect_info(stream: IncomingStream<'_, TlsListener>) -> Self {
        Self(*stream.remote_addr())
    }
}

pub fn install_crypto_provider() {
    let _ = crypto_provider().install_default();
}

/// ring's provider with ChaCha20-Poly1305 first: the C906 has no AES instructions,
/// and ChaCha20 seals video several times faster there than AES-GCM.
fn crypto_provider() -> CryptoProvider {
    let mut provider = ring::default_provider();
    provider
        .cipher_suites
        .sort_by_key(|suite| !is_chacha20(suite.suite()));
    provider
}

fn is_chacha20(suite: CipherSuite) -> bool {
    matches!(
        suite,
        CipherSuite::TLS13_CHACHA20_POLY1305_SHA256
            | CipherSuite::TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256
            | CipherSuite::TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256
    )
}

pub fn load_server_config(
    cert_path: impl AsRef<Path>,
    key_path: impl AsRef<Path>,
) -> Result<ServerConfig> {
    let cert_file = File::open(cert_path.as_ref())?;
    let certs: Vec<CertificateDer<'static>> = CertificateDer::pem_reader_iter(cert_file)
        .collect::<std::result::Result<Vec<_>, _>>()
        .map_err(|err| AppError::Config(format!("failed to read TLS certificate: {err}")))?;
    if certs.is_empty() {
        return Err(AppError::Config(
            "TLS certificate file is empty".to_string(),
        ));
    }

    let key_file = File::open(key_path.as_ref())?;
    let key = PrivateKeyDer::from_pem_reader(key_file)
        .map_err(|err| AppError::Config(format!("failed to read TLS private key: {err}")))?;

    let mut config = ServerConfig::builder_with_provider(Arc::new(crypto_provider()))
        .with_safe_default_protocol_versions()
        .map_err(|err| AppError::Config(format!("failed to configure TLS versions: {err}")))?
        .with_no_client_auth()
        .with_single_cert(certs, key)
        .map_err(|err| AppError::Config(format!("failed to configure TLS certificate: {err}")))?;
    config.alpn_protocols = vec![b"http/1.1".to_vec()];
    // Browsers with AES hardware list AES-GCM first; our suite order decides.
    config.ignore_client_order = true;
    Ok(config)
}

pub fn generate_self_signed_cert(
    cert_path: impl AsRef<Path>,
    key_path: impl AsRef<Path>,
) -> Result<()> {
    let CertifiedKey { cert, key_pair } = generate_simple_self_signed([
        "localhost".to_string(),
        "127.0.0.1".to_string(),
        "::1".to_string(),
    ])
    .map_err(|err| AppError::Internal(format!("failed to generate TLS certificate: {err}")))?;

    write_file(cert_path.as_ref(), cert.pem().as_bytes(), 0o644)?;
    write_file(
        key_path.as_ref(),
        key_pair.serialize_pem().as_bytes(),
        0o600,
    )?;
    Ok(())
}

fn write_file(path: &Path, data: &[u8], mode: u32) -> Result<()> {
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent)?;
    }
    let mut file = OpenOptions::new()
        .create(true)
        .truncate(true)
        .write(true)
        .mode(mode)
        .open(path)?;
    use std::io::Write as _;
    file.write_all(data)?;
    file.sync_all()?;
    fs::set_permissions(path, fs::Permissions::from_mode(mode))?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use std::os::unix::fs::PermissionsExt;

    use super::*;

    #[test]
    fn generated_cert_can_be_loaded_for_rustls() {
        install_crypto_provider();
        let dir = tempfile::tempdir().unwrap();
        let cert = dir.path().join("server.crt");
        let key = dir.path().join("server.key");

        generate_self_signed_cert(&cert, &key).unwrap();
        let mode = fs::metadata(&key).unwrap().permissions().mode() & 0o777;

        assert_eq!(mode, 0o600);
        assert!(load_server_config(&cert, &key).is_ok());
    }

    async fn negotiated_suite(client_suites: &[CipherSuite]) -> CipherSuite {
        use tokio_rustls::{
            TlsConnector,
            rustls::{ClientConfig, RootCertStore, pki_types::ServerName},
        };

        let dir = tempfile::tempdir().unwrap();
        let cert = dir.path().join("server.crt");
        let key = dir.path().join("server.key");
        generate_self_signed_cert(&cert, &key).unwrap();
        let acceptor = TlsAcceptor::from(Arc::new(load_server_config(&cert, &key).unwrap()));

        let mut roots = RootCertStore::empty();
        for der in CertificateDer::pem_file_iter(&cert).unwrap() {
            roots.add(der.unwrap()).unwrap();
        }
        // The client lists its suites in the given order, AES first by default.
        let mut provider = ring::default_provider();
        provider
            .cipher_suites
            .retain(|suite| client_suites.contains(&suite.suite()));
        provider
            .cipher_suites
            .sort_by_key(|suite| client_suites.iter().position(|s| *s == suite.suite()));
        let client = ClientConfig::builder_with_provider(Arc::new(provider))
            .with_safe_default_protocol_versions()
            .unwrap()
            .with_root_certificates(roots)
            .with_no_client_auth();

        let listener = TcpListener::bind("127.0.0.1:0").await.unwrap();
        let addr = listener.local_addr().unwrap();
        let server = tokio::spawn(async move {
            let (stream, _) = listener.accept().await.unwrap();
            acceptor.accept(stream).await.unwrap();
        });
        let stream = tokio::net::TcpStream::connect(addr).await.unwrap();
        let tls = TlsConnector::from(Arc::new(client))
            .connect(ServerName::try_from("localhost").unwrap(), stream)
            .await
            .unwrap();
        server.await.unwrap();
        tls.get_ref().1.negotiated_cipher_suite().unwrap().suite()
    }

    #[tokio::test]
    async fn server_prefers_chacha20_over_a_clients_aes_preference() {
        let suite = negotiated_suite(&[
            CipherSuite::TLS13_AES_128_GCM_SHA256,
            CipherSuite::TLS13_AES_256_GCM_SHA384,
            CipherSuite::TLS13_CHACHA20_POLY1305_SHA256,
        ])
        .await;
        assert_eq!(suite, CipherSuite::TLS13_CHACHA20_POLY1305_SHA256);
    }

    #[tokio::test]
    async fn a_client_without_chacha20_still_gets_aes_gcm() {
        let suite = negotiated_suite(&[CipherSuite::TLS13_AES_128_GCM_SHA256]).await;
        assert_eq!(suite, CipherSuite::TLS13_AES_128_GCM_SHA256);
    }
}
