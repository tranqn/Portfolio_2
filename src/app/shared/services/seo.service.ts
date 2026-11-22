import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Language, SUPPORTED_LANGUAGES, TranslationService } from './translation.service';

/** Public origin used for canonical, hreflang and `og:url` (the site is served at the apex). */
export const SITE_ORIGIN = 'https://quocnamtran.com';

/** Name with diacritics, used as the title suffix on every page. */
export const SITE_NAME = 'Quóc Nam Tràn';

/** Default share image (absolute, as social crawlers require). */
const DEFAULT_IMAGE = `${SITE_ORIGIN}/img/og-image.png`;

const OG_LOCALE: Record<Language, string> = { de: 'de_DE', en: 'en_US' };

/** Page metadata in the current language; `path` is language-neutral (`/projects/coderr`). */
export interface PageMeta {
  title: string;
  description: string;
  path: string;
  /** Path of a page-specific share image under `public/`, e.g. `media/projects/coderr.jpg`. */
  image?: string;
  /** Keep the page out of search results (404). */
  noindex?: boolean;
}

@Injectable({
  providedIn: 'root',
})
/**
 * Centralizes `<title>`, description, canonical, hreflang and Open Graph /
 * Twitter tags. Pages are prerendered, so whatever this service writes ends
 * up in the static HTML that crawlers and link previews read.
 *
 * Every routed page calls {@link setPage} (or {@link bindPage}); the canonical
 * always points at the page itself in its own language, with `de`, `en` and
 * `x-default` alternates.
 */
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly translate = inject(TranslateService);
  private readonly language = inject(TranslationService);

  /**
   * Keeps the tags of a static page in sync with the current language.
   * `translate.stream` waits for the translation file, so the title never
   * shows a raw i18n key. Call from a component constructor.
   */
  bindPage(config: {
    titleKey: string;
    descriptionKey: string;
    path: string;
    appendName?: boolean;
    noindex?: boolean;
  }): void {
    const destroyRef = inject(DestroyRef);
    this.translate
      .stream([config.titleKey, config.descriptionKey])
      .pipe(takeUntilDestroyed(destroyRef))
      .subscribe((t: Record<string, string>) => {
        const title = t[config.titleKey];
        this.setPage({
          title: config.appendName === false ? title : `${title} | ${SITE_NAME}`,
          description: t[config.descriptionKey],
          path: config.path,
          noindex: config.noindex,
        });
      });
  }

  setPage(page: PageMeta): void {
    const lang = this.language.currentLang();
    const url = SITE_ORIGIN + this.language.localize(page.path, lang);
    const image = page.image ? `${SITE_ORIGIN}/${page.image}` : DEFAULT_IMAGE;

    this.title.setTitle(page.title);
    this.meta.updateTag({ name: 'description', content: page.description });
    this.meta.updateTag({ name: 'robots', content: page.noindex ? 'noindex' : 'index, follow' });
    this.meta.updateTag({ property: 'og:title', content: page.title });
    this.meta.updateTag({ property: 'og:description', content: page.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ property: 'og:locale', content: OG_LOCALE[lang] });
    this.meta.updateTag({ name: 'twitter:title', content: page.title });
    this.meta.updateTag({ name: 'twitter:description', content: page.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });

    this.setLink('canonical', url);
    if (page.noindex) {
      this.removeAlternates();
    } else {
      for (const alt of SUPPORTED_LANGUAGES) {
        this.setLink('alternate', SITE_ORIGIN + this.language.localize(page.path, alt), alt);
      }
      this.setLink('alternate', SITE_ORIGIN + this.language.localize(page.path, 'de'), 'x-default');
    }
  }

  private setLink(rel: string, href: string, hreflang?: string): void {
    const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`;
    let link = this.document.head.querySelector<HTMLLinkElement>(selector);
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', rel);
      if (hreflang) link.setAttribute('hreflang', hreflang);
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  }

  private removeAlternates(): void {
    this.document.head
      .querySelectorAll('link[rel="alternate"][hreflang]')
      .forEach((link) => link.remove());
  }
}
