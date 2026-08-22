# System update public-key ring

Only reviewed public keys named `<key-id>.pub.pem` belong in this directory.
Private keys must never be copied into the repository or application archive.

Rotation sequence:

1. ship the new public key in an application update signed by an already
   trusted key;
2. sign the following system metadata with the new key ID;
3. after that metadata verifies, ship `system/keys/update-key-policy` containing
   one allowed key ID per line to retire the legacy key;
4. verify app and system update checks after reboot and after rollback.

The policy file is intentionally absent until production key custody is
provisioned. Without a policy, the legacy configured key and any installed
key-ring entries remain accepted for bootstrap compatibility.
