import { DOCUMENT } from '@angular/common';
import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

/** Tuple of languages the portfolio supports. */
export const SUPPORTED_LANGUAGES = ['de', 'en'] as const;

/** Union type derived from {@link SUPPORTED_LANGUAGES}. */
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

/** URL prefix per language: German lives at the root, English under `/en`. */
const PREFIX: Record<Language, string> = { de: '', en: '/en' };

@Injectable({
  providedIn: 'root',
})
/**
 * Active UI language (DE/EN). The URL decides it: `/…` is German, `/en/…`
 * English. The language resolver on the two parent routes calls {@link use},
 * so prerendered pages and client navigation always agree, and every page has
 * its own stable, shareable URL per language. Nothing is read from the
 * browser (no storage, no `navigator.language`), which keeps server and
 * client output identical.
 */
export class TranslationService {
  private readonly translate = inject(TranslateService);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);

  /** Reactive signal holding the active language code. */
  readonly currentLang = signal<Language>('de');

  /** Activates a language; the returned observable completes once its file is loaded. */
  use(lang: Language): Observable<unknown> {
    this.currentLang.set(lang);
    this.document.documentElement.lang = lang;
    return this.translate.use(lang);
  }

  /**
   * Prefixes a language-neutral path (`/projects/coderr`, `/`) for a language.
   * German has no prefix; the English home page is `/en` (no trailing slash).
   */
  localize(path: string, lang: Language = this.currentLang()): string {
    const prefix = PREFIX[lang];
    if (!prefix) return path;
    return path === '/' ? prefix : prefix + path;
  }

  /** Strips the language prefix from a URL path, giving the neutral path. */
  neutralPath(url: string): string {
    const path = url.split('#')[0].split('?')[0];
    if (path === '/en') return '/';
    return path.startsWith('/en/') ? path.slice(3) : path || '/';
  }

  /**
   * Navigates to the same page in the other language. Query string and
   * section fragment are kept; the fragment comes from `location.hash`
   * because in-page section links only update the address via
   * `history.replaceState`, which the router does not see.
   */
  switchLanguage(): void {
    const next: Language = this.currentLang() === 'de' ? 'en' : 'de';
    const query = this.router.url.split('#')[0].split('?')[1];
    const hash = this.document.location?.hash ?? '';
    void this.router
      .navigateByUrl(
        this.localize(this.neutralPath(this.router.url), next) + (query ? `?${query}` : '') + hash,
      )
      .catch(() => this.document.location.assign(this.localize(this.neutralPath(this.router.url), next)));
  }
}
