import { describe, expect, it } from 'vitest';

import languages from './languages';
import { getResources } from './resources';

type Strings = Record<string, string>;

const resources = getResources();

// Strings that are legitimately the same as English: technical terms and product names.
const sameAsEnglish = new Set(['picoclaw.model.apiBase']);

function flatten(node: unknown, prefix = '', out: Strings = {}): Strings {
  for (const [key, value] of Object.entries(node as Record<string, unknown>)) {
    if (typeof value === 'string') {
      out[prefix + key] = value;
    } else if (value && typeof value === 'object') {
      flatten(value, `${prefix}${key}.`, out);
    } else {
      throw new Error(`${prefix + key} is not a string`);
    }
  }
  return out;
}

// The names inside {{ }}, so reordering them in a translation is fine but dropping one is not.
function placeholders(text: string): string[] {
  return [...text.matchAll(/\{\{\s*([^,}\s]+)/g)].map((m) => m[1]).sort();
}

// The <a1></a1> style tags that mark where a link goes in a sentence.
function tags(text: string): string[] {
  return [...text.matchAll(/<\/?([a-z][a-z0-9]*)>/g)].map((m) => m[1]).sort();
}

function words(text: string): number {
  return text.split(/\s+/).filter((word) => /[a-z]{3,}/i.test(word)).length;
}

const english = flatten(resources.en.translation);
const translated = Object.keys(resources).filter((language) => language !== 'en');

describe('languages', () => {
  it('lists exactly the languages that have a locale file', () => {
    // no and sv are the locale files behind the nb and se translations
    const listed = languages.map((language) => language.key).sort();
    const present = Object.keys(resources)
      .filter((language) => !['nb', 'se'].includes(language))
      .sort();
    expect(listed).toEqual(present);
  });
});

describe.each(translated)('%s translation', (language) => {
  const strings = flatten(resources[language].translation);

  it('has every English key', () => {
    const missing = Object.keys(english).filter((key) => !(key in strings));
    expect(missing).toEqual([]);
  });

  it('has no key that English lacks', () => {
    const extra = Object.keys(strings).filter((key) => !(key in english));
    expect(extra).toEqual([]);
  });

  it('has no empty string', () => {
    const empty = Object.keys(strings).filter((key) => strings[key].trim() === '');
    expect(empty).toEqual([]);
  });

  it('uses the same placeholders as English', () => {
    const mismatched = Object.keys(english).filter(
      (key) =>
        key in strings && placeholders(strings[key]).join() !== placeholders(english[key]).join()
    );
    expect(mismatched).toEqual([]);
  });

  it('keeps the same link tags as English', () => {
    const mismatched = Object.keys(english).filter(
      (key) => key in strings && tags(strings[key]).join() !== tags(english[key]).join()
    );
    expect(mismatched).toEqual([]);
  });

  it('does not leave sentences in English', () => {
    const untranslated = Object.keys(english).filter(
      (key) => strings[key] === english[key] && words(english[key]) >= 3 && !sameAsEnglish.has(key)
    );
    expect(untranslated).toEqual([]);
  });
});
