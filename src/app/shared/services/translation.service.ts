import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

const STORAGE_KEY = 'portfolio-language';
const SUPPORTED_LANGUAGES = ['de', 'en'] as const;
type Language = (typeof SUPPORTED_LANGUAGES)[number];

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private readonly translate = inject(TranslateService);
  private readonly platformId = inject(PLATFORM_ID);
  protected readonly currentLang = signal<Language>('de');

  constructor() {
    const initialLang = this.resolveInitialLanguage();
    this.currentLang.set(initialLang);
    this.translate.use(initialLang);
  }

  switchLanguage(): void {
    const next: Language = this.currentLang() === 'de' ? 'en' : 'de';
    this.currentLang.set(next);
    this.translate.use(next);
    this.persistLanguage(next);
  }

  private resolveInitialLanguage(): Language {
    if (!isPlatformBrowser(this.platformId)) {
      return 'de';
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && this.isSupportedLanguage(stored)) {
      return stored;
    }
    const browserLang = navigator.language.split('-')[0];
    return this.isSupportedLanguage(browserLang) ? browserLang : 'de';
  }

  private persistLanguage(lang: Language): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  }

  private isSupportedLanguage(lang: string): lang is Language {
    return SUPPORTED_LANGUAGES.includes(lang as Language);
  }
}
