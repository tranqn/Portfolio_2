import { DOCUMENT } from '@angular/common';
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
  private readonly document = inject(DOCUMENT);

  /** Reactive signal holding the active language code. */
  readonly currentLang = signal<Language>('de');

  constructor() {
    const initialLang = this.detectLanguage();
    this.apply(initialLang);
  }

  /** Toggles between German and English, persisting the choice to localStorage. */
  switchLanguage(): void {
    const next: Language = this.currentLang() === 'de' ? 'en' : 'de';
    this.apply(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be blocked; the choice then lasts for this visit only.
    }
  }

  /** Activates a language and keeps `<html lang>` in sync for assistive tech and CSS. */
  private apply(lang: Language): void {
    this.currentLang.set(lang);
    this.translate.use(lang);
    this.document.documentElement.lang = lang;
  }

  /** Reads stored or browser language preference. */
  private detectLanguage(): Language {
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      // Storage blocked: fall back to the browser language.
    }
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
