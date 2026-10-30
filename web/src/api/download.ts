import { http } from '@/lib/http.ts';

// Download image
export function downloadImage(file?: string, sha256sum?: string) {
  const data = {
    file: file ?? '',
    sha256sum: sha256sum ?? ''
  };
  return http.post('/api/download/image', data);
}

export function cancelDownloadImage() {
  return http.post('/api/download/image/cancel');
}

export function statusImage() {
  return http.get('/api/download/image/status');
}

export function imageEnabled() {
  return http.get('/api/download/image/enabled');
}

export function getRemoteImageDownloadEnabled() {
  return http.get('/api/download/image/remote/enabled');
}

// turning it on needs the password, and a code when the account has a second factor
export function setRemoteImageDownloadEnabled(enabled: boolean, password?: string, code?: string) {
  return http.post('/api/download/image/remote/enabled', { enabled, password, code });
}
