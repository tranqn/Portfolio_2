import { TranslateLoader, TranslationObject } from '@ngx-translate/core';
import { Observable, from } from 'rxjs';

/**
 * Loads the translation files as lazy JS chunks instead of over HTTP, so the
 * prerender step (which has no web server) and the browser use the same path.
 */
export class ImportTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<TranslationObject> {
    const load =
      lang === 'en'
        ? import('../../../../public/i18n/en.json')
        : import('../../../../public/i18n/de.json');
    return from(load.then((module) => module.default as TranslationObject));
  }
}
