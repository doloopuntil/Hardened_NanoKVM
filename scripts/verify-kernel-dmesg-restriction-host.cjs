#!/usr/bin/env node

'use strict';

const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const TARGET_IP = process.env.TARGET_IP || '';
const SSHPASS = process.env.SSHPASS || path.join(
  ROOT,
  'build/host-deps/sshpass/usr/bin/sshpass',
);
const RESULT_DIR = process.env.DEVICE_TEST_RESULT_DIR || path.join(
  ROOT,
  'build/latestbuildroot/device-tests',
  `phase3-dmesg-${TARGET_IP}`,
);
const REPORT = path.join(RESULT_DIR, 'report.txt');
const KNOWN_HOSTS = path.join(RESULT_DIR, 'known_hosts');
const DEVICE_SCRIPT = path.join(ROOT, 'scripts/verify-kernel-dmesg-restriction-device.sh');

function fail(message) {
  throw new Error(message);
}

async function readSecret() {
  let input = '';
  process.stdin.setEncoding('utf8');
  for await (const chunk of process.stdin) input += chunk;
  return input.replace(/\r?\n$/, '');
}

async function runProcess(command, args, options = {}) {
  const { input, secret } = options;
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: ROOT,
      env: {
        HOME: '/home/w0w',
        USER: 'w0w',
        LANG: 'C',
        PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
      },
      stdio: secret === undefined
        ? ['pipe', 'pipe', 'pipe']
        : ['pipe', 'pipe', 'pipe', 'pipe'],
    });
    const stdout = [];
    const stderr = [];
    child.stdout.on('data', (chunk) => stdout.push(chunk));
    child.stderr.on('data', (chunk) => stderr.push(chunk));
    child.on('error', reject);
    child.on('close', (code) => {
      const result = {
        code,
        stdout: Buffer.concat(stdout),
        stderr: Buffer.concat(stderr),
      };
      if (code !== 0) {
        const error = new Error(`${path.basename(command)} failed with exit code ${code}`);
        error.result = result;
        reject(error);
        return;
      }
      resolve(result);
    });
    if (secret !== undefined) child.stdio[3].end(Buffer.from(`${secret}\n`, 'utf8'));
    child.stdin.end(input);
  });
}

async function prepareKnownHosts() {
  const scan = await runProcess('/usr/bin/ssh-keyscan', ['-T', '10', TARGET_IP]);
  if (!scan.stdout.length) fail('ssh-keyscan returned no host key');
  fs.writeFileSync(KNOWN_HOSTS, scan.stdout, { mode: 0o600 });
  const fingerprint = await runProcess('/usr/bin/ssh-keygen', ['-lf', '-'], {
    input: scan.stdout,
  });
  return fingerprint.stdout.toString('utf8').trim();
}

async function verifyHttpHealth() {
  const response = await fetch(`http://${TARGET_IP}/api/health`, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(10000),
  });
  const json = await response.json();
  if (!response.ok || json?.code !== 0 || json?.data?.status !== 'ok') {
    fail(`HTTP health check failed: ${response.status}`);
  }
  return JSON.stringify(json);
}

async function main() {
  if (!TARGET_IP) fail('TARGET_IP is required');
  if (process.argv[2] !== '--confirm-device' || process.argv[3] !== TARGET_IP) {
    fail(`refusing verification without --confirm-device ${TARGET_IP}`);
  }
  if (!fs.existsSync(SSHPASS)) fail(`sshpass is missing: ${SSHPASS}`);
  if (!fs.existsSync(DEVICE_SCRIPT)) fail(`device verifier is missing: ${DEVICE_SCRIPT}`);
  if (fs.existsSync(RESULT_DIR)) fail(`refusing to reuse result directory: ${RESULT_DIR}`);

  const password = await readSecret();
  if (!password) fail('secret stdin was empty');

  fs.mkdirSync(RESULT_DIR, { recursive: true, mode: 0o700 });
  const fingerprint = await prepareKnownHosts();
  const health = await verifyHttpHealth();
  const remoteScript = fs.readFileSync(DEVICE_SCRIPT);
  const verification = await runProcess(
    SSHPASS,
    [
      '-d', '3', 'ssh',
      '-o', 'ConnectTimeout=15',
      '-o', 'ConnectionAttempts=1',
      '-o', 'PreferredAuthentications=password,keyboard-interactive',
      '-o', 'PubkeyAuthentication=no',
      '-o', 'StrictHostKeyChecking=yes',
      '-o', `UserKnownHostsFile=${KNOWN_HOSTS}`,
      `root@${TARGET_IP}`,
      'sh', '-s',
    ],
    { input: remoteScript, secret: password },
  );

  const report = [
    `TARGET_IP=${TARGET_IP}`,
    'HTTP_HEALTH=ok',
    `HTTP_JSON=${health}`,
    'SSH_HOST_KEYS_BEGIN',
    fingerprint,
    'SSH_HOST_KEYS_END',
    'DEVICE_VERIFIER_BEGIN',
    verification.stdout.toString('utf8').trim(),
    'DEVICE_VERIFIER_END',
    '',
  ].join('\n');
  fs.writeFileSync(REPORT, report, { mode: 0o600 });
  process.stdout.write(`SUCCESS: ${REPORT}\n`);
}

main().catch((error) => {
  try {
    fs.mkdirSync(RESULT_DIR, { recursive: true, mode: 0o700 });
    const stderr = error?.result?.stderr?.toString('utf8').trim() || '';
    fs.writeFileSync(
      REPORT,
      `FAIL: ${error.message}\n${stderr ? `SSH_STDERR=${stderr}\n` : ''}`,
      { mode: 0o600 },
    );
  } catch {}
  process.exitCode = 1;
});
