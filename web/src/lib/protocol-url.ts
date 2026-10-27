// This address with the other protocol, without the default port of either.
export function protocolUrl(https: boolean) {
  const target = new URL(window.location.href);
  target.protocol = https ? 'https:' : 'http:';

  if (https && target.port === '80') {
    target.port = '';
  }
  if (!https && target.port === '443') {
    target.port = '';
  }

  return target.toString();
}
