import { describe, expect, it } from 'vitest';

import {
  fileLabel,
  formatBytes,
  isAllowedImageName,
  isValidSha256,
  parseJson
} from './image-transfer.ts';

describe('formatBytes', () => {
  it('scales to the largest fitting unit', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(1023)).toBe('1023 B');
    expect(formatBytes(1536)).toBe('1.5 KB');
    expect(formatBytes(5 * 1024 * 1024 * 1024)).toBe('5.0 GB');
  });
});

describe('isAllowedImageName', () => {
  it('accepts .iso and .img in any case', () => {
    expect(isAllowedImageName('a.iso')).toBe(true);
    expect(isAllowedImageName('A.IMG')).toBe(true);
  });

  it('rejects other names', () => {
    expect(isAllowedImageName('a.zip')).toBe(false);
    expect(isAllowedImageName('iso')).toBe(false);
  });
});

describe('isValidSha256', () => {
  it('treats an empty value as no check', () => {
    expect(isValidSha256('')).toBe(true);
    expect(isValidSha256('  ')).toBe(true);
  });

  it('accepts 64 hex digits in either case', () => {
    expect(isValidSha256('a'.repeat(64))).toBe(true);
    expect(isValidSha256(` ${'F'.repeat(64)} `)).toBe(true);
  });

  it('rejects the wrong length or characters', () => {
    expect(isValidSha256('a'.repeat(63))).toBe(false);
    expect(isValidSha256('g'.repeat(64))).toBe(false);
  });
});

describe('parseJson', () => {
  it('returns null for a body that is not JSON', () => {
    expect(parseJson('<html>')).toBeNull();
    expect(parseJson('{"code":0}')).toEqual({ code: 0 });
  });
});

describe('fileLabel', () => {
  it('names a URL by its last path segment', () => {
    expect(fileLabel('https://example.org/pub/fedora%2041.iso?x=1')).toBe('fedora 41.iso');
    expect(fileLabel('https://example.org/pub/dir/')).toBe('dir');
  });

  it('keeps a plain file name and a URL without a path', () => {
    expect(fileLabel('rescue.img')).toBe('rescue.img');
    expect(fileLabel('https://example.org')).toBe('https://example.org');
  });
});
