import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from './translation.service';

describe('TranslationService URLs', () => {
  let service: TranslationService;
  let originalLang: string;

  beforeEach(() => {
    originalLang = document.documentElement.lang;
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    });
    service = TestBed.inject(TranslationService);
  });

  afterEach(() => {
    document.documentElement.lang = originalLang;
  });

  it('keeps German paths at the root and prefixes English ones without a trailing slash', () => {
    expect(service.localize('/', 'de')).toBe('/');
    expect(service.localize('/projects/coderr', 'de')).toBe('/projects/coderr');
    expect(service.localize('/', 'en')).toBe('/en');
    expect(service.localize('/projects/coderr', 'en')).toBe('/en/projects/coderr');
  });

  it('turns any URL back into the language-neutral path', () => {
    expect(service.neutralPath('/en')).toBe('/');
    expect(service.neutralPath('/en#arbeitsweise')).toBe('/');
    expect(service.neutralPath('/en/projects/join?x=1')).toBe('/projects/join');
    expect(service.neutralPath('/legal-notice')).toBe('/legal-notice');
    expect(service.neutralPath('/english-page')).toBe('/english-page');
  });

  it('sets the document language with the active language', () => {
    service.use('en');
    expect(service.currentLang()).toBe('en');
    expect(document.documentElement.lang).toBe('en');
  });
});
