import de from '../../../../public/i18n/de.json';
import en from '../../../../public/i18n/en.json';

/** Flattens nested translation objects to dotted keys (`HERO.ROLE`, …). */
function keys(obj: object, prefix = ''): string[] {
  return Object.entries(obj).flatMap(([key, value]) =>
    value && typeof value === 'object' ? keys(value, `${prefix}${key}.`) : [`${prefix}${key}`],
  );
}

describe('i18n files', () => {
  it('have the same keys in German and English', () => {
    const deKeys = keys(de).sort();
    const enKeys = keys(en).sort();
    expect(deKeys.filter((k) => !enKeys.includes(k))).withContext('only in de.json').toEqual([]);
    expect(enKeys.filter((k) => !deKeys.includes(k))).withContext('only in en.json').toEqual([]);
  });

  it('contain no em dashes', () => {
    const texts = [...Object.values(flat(de)), ...Object.values(flat(en))];
    expect(texts.filter((t) => t.includes('—'))).toEqual([]);
  });
});

function flat(obj: object, prefix = ''): Record<string, string> {
  return Object.fromEntries(
    Object.entries(obj).flatMap(([key, value]) =>
      value && typeof value === 'object'
        ? Object.entries(flat(value, `${prefix}${key}.`))
        : [[`${prefix}${key}`, String(value)]],
    ),
  );
}
