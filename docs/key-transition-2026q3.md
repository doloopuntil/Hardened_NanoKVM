# Update Key Transition 2026 Q3

Status date: 2026-08-27.

> TRANSITION_RELEASE_BLOCKED_PENDING_DEVICE_MATRIX
>
> Publication is prohibited until the complete bridge device matrix passes.

Status: private-key backups, the production public trust set, reproducible
bridge app and app `2.0.41`/raw.11 device path are accepted. App `2.0.40`
compatibility and the rebuilt RC12 matrix remain. No transition or RC12 release
is published.

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

Two independently salted AES-256 PKCS#8 backups were created on the WSL and
Windows filesystems. Both restore in-memory to the production fingerprint. The
encrypted ciphertext SHA-256 values are
`889f5ca50f56b75231cf12821c62bcbcd5a5b39a325d60a7ff2c6b8e1c53c561`
and `eaeba2ae41bdeb036670015c342fe0455e86fbcdb2f83ba8779f2656b6f22135`.
One encrypted copy should additionally be moved off-host before publication.

## Reproducible Bridge Artifact

Two independent application pipelines from source commit `42375b2` produced
the exact same 22,488,974-byte archive:

`build/key-transition-2.0.42/app-a/out/hardened-nanokvm-kvmapp-2.0.42.tar.gz`

SHA-256:
`e9c0bb08ce9904de55479151a1a1c4785a9db98b709cbd377ebe10ef2d91064b`.

The archive embeds app `2.0.42`, the unchanged legacy public fingerprint
`2167216b8ccca472124a0f5bfc7889a3ab55772c221d8540e577243a1aa90926`,
production fingerprint
`97ddb5600accf0e431c74f82b03acf249668bf75fe0de2e41724c91720516f75`,
the three-ID bridge policy and no private-key entry. The retained reproducibility
report SHA-256 is
`02589fa1890b5b6143acd2907b0b3b908e0a79237d63dcefbd9a07438d07858c`.

## Accepted App 2.0.41 / Raw.11 Bridge

Test device `10.0.87.133` began on app `2.0.41`, system `0.3.0-raw.11`, kernel
`5.10.4-tag-`, the legacy public key only and no key policy. The authenticated
offline API accepted the exact bridge archive, an offline-to-online restart was
observed, app `2.0.42` and the existing admin account authenticated again.

Postflight and post-reboot checks prove:

- bundled and runtime legacy fingerprints remain exact;
- bundled and runtime production fingerprints match `97ddb560...`;
- the three-ID policy and installed init script match;
- app backup `2.0.41`, raw.11, kernel, SSH host identity and settings remain;
- native and Rust backends are alive with zero kernel alerts;
- production-key test metadata verifies;
- published RC11 app/system and raw.11 legacy metadata still verify;
- a full reboot preserves the bridge, account and trust set.

| Evidence | SHA-256 |
| --- | --- |
| preflight | `0e12556775df2f5faf11d4ed6c6c2bcda21c7bb71b1e51d06bb63a94e666360c` |
| offline upload/restart | `237d8492b16efdffc1daa3ce5d533979ea7128e540d86f0423bac0cbfd45bcfb` |
| initial postflight | `40ac58cfc49ca3c1d46ead19f1197e8ce44159b240a26dbdb622c6447b395427` |
| signature matrix | `20e0addff30991b76112a2ca0b581648152bfda920e97ff24cd03504cb32a370` |
| post-reboot trust/runtime | `737cd56e54633d6ce750cfcd91851da6cf8dabcd6e0b5edcf169e94a8cf5b422` |
| post-reboot web login | `1f69a74b29c3b48d6b35d21dfb68c9c84f7f7f5211990fac44e17c81b1b211c9` |

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
