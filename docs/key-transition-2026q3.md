# Update Key Transition 2026 Q3

Status date: 2026-08-27.

Status: implementation in progress. No transition or RC12 release is published.

## Trust Set

- production key ID: `hardened-system-prod-2026q3`;
- algorithm: RSA-4096 with SHA-256 PKCS#1 v1.5 metadata signatures;
- production public-key DER SHA-256:
  `97ddb5600accf0e431c74f82b03acf249668bf75fe0de2e41724c91720516f75`;
- historical IDs retained during the bridge window:
  `hardened-system-dev` and `hardened-system-test`.

The production private key is stored outside the repository. It must never be
placed in Git, Project Memory, build archives, command arguments, logs or
device images. Publication remains blocked until two independent encrypted
backup copies are restored and fingerprint-checked.

## Primary Migration: Authenticated Offline App Update

The legacy private key is unavailable, so an automatic old-key-signed bridge
cannot be produced. Existing supported devices instead install the complete
application `2.0.42` archive manually through:

`Settings -> Update -> Offline Update`

The authenticated endpoint is `/api/application/update/offline`. The current
implementation applies safe archive/path validation but does not fetch or
require online metadata for a manually supplied archive. Users must download
the bridge from the exact project release and verify its published SHA-256
before upload.

After restart, `S95nanokvm` copies the production public key and dual-trust
policy from `/kvmapp/system/keys` into `/etc/kvm`. The device can then verify
new-key-signed app and raw-system metadata.

## Alternatives

- SSH-managed devices may install the complete bridge app or install the new
  public key and dual-trust policy under `/etc/kvm`, then restart the backend.
- Fleets may use the authenticated offline-upload API with per-device
  credentials and exact archive hashes.
- Devices without working web or SSH access must use the new full RC12 SD
  image. It contains app `2.0.42` and the production trust set.
- Enabling unsigned online updates is not an approved migration method.

## Acceptance Gates

1. Two encrypted private-key backups restore to the production public
   fingerprint.
2. Application `2.0.42` archives reproduce exactly.
3. Offline bridge succeeds from published app `2.0.40`/raw.10 and lab app
   `2.0.41`/raw.11 while preserving account, SSH, settings and backend.
4. Historical signed RC11/raw.11 metadata still verifies after the bridge.
5. Production-key test metadata verifies; unknown and policy-excluded IDs fail.
6. RC12 requires app `2.0.42` and signs both metadata kinds with
   `hardened-system-prod-2026q3`.
7. Final A/B, full-SD, signed raw update, recovery and remote-asset gates repeat.
8. Legacy IDs are removed only in a later release after the migration window.
