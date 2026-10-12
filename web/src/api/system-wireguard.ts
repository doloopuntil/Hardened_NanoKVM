import { http } from '@/lib/http.ts';

export type WireguardPeer = {
  publicKey: string;
  endpointHost: string;
  endpointPort: number;
  allowedIps: string[];
  persistentKeepalive: number;
};

export type WireguardConfig = {
  enabled: boolean;
  address: string;
  peer: WireguardPeer;
};

export type WireguardStatus = {
  config: WireguardConfig;
  privateKeySet: boolean;
  publicKey: string;
  toolInstalled: boolean;
  running: boolean;
  latestHandshake: number;
  rxBytes: number;
  txBytes: number;
  firewallBlocked: boolean;
};

export function getStatus() {
  return http.get('/api/system/wireguard');
}

export function setConfig(config: WireguardConfig) {
  return http.post('/api/system/wireguard', config);
}

export function setPrivateKey(privateKey: string) {
  return http.post('/api/system/wireguard/private-key', { privateKey });
}

export function generatePrivateKey() {
  return http.post('/api/system/wireguard/private-key/generate');
}

export function removePrivateKey() {
  return http.post('/api/system/wireguard/private-key/remove');
}
