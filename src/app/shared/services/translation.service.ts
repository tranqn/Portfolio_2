import { Injectable, inject, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/** localStorage key used to persist the user's language choice. */
const STORAGE_KEY = 'portfolio-language';

/** Tuple of languages the portfolio supports. */
const SUPPORTED_LANGUAGES = ['de', 'en'] as const;

/** Union type derived from {@link SUPPORTED_LANGUAGES}. */
type Language = (typeof SUPPORTED_LANGUAGES)[number];

@Injectable({
  providedIn: 'root',
})
/**
 * Manages the active UI language (DE/EN) for the portfolio.
 *
 * On construction the language is resolved in priority order:
 * 1. Previously persisted choice in localStorage
 * 2. Browser `navigator.language`
 * 3. Fallback to German (`de`)
 *
 * Exposes a {@link currentLang} signal so templates can react to language changes.
 */
export class TranslationService {
  private readonly translate = inject(TranslateService);

  /** Reactive signal holding the active language code. */
  readonly currentLang = signal<Language>('de');

  constructor() {
    const initialLang = this.detectLanguage();
    this.currentLang.set(initialLang);
    this.translate.use(initialLang);
  }

  /** Toggles between German and English, persisting the choice to localStorage. */
  switchLanguage(): void {
    const next: Language = this.currentLang() === 'de' ? 'en' : 'de';
    this.currentLang.set(next);
    this.translate.use(next);
    localStorage.setItem(STORAGE_KEY, next);
  }

  /** Reads stored or browser language preference. */
  private detectLanguage(): Language {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && this.isSupportedLanguage(stored)) {
      return stored;
    }
    const browserLang = navigator.language.split('-')[0];
    return this.isSupportedLanguage(browserLang) ? browserLang : 'de';
  }

  /** Type-guard that narrows a string to the {@link Language} union. */
  private isSupportedLanguage(lang: string): lang is Language {
    return SUPPORTED_LANGUAGES.includes(lang as Language);
  }
}
