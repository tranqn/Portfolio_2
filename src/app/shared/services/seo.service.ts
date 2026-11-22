import { DOCUMENT } from '@angular/common';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

/** Public origin used for canonical and `og:url` (the site is served at the apex). */
export const SITE_ORIGIN = 'https://quocnamtran.com';

/** Name with diacritics, used as the title suffix on every page. */
export const SITE_NAME = 'Quóc Nam Tràn';

@Injectable({
  providedIn: 'root',
})
/**
 * Centralizes `<title>`, description, canonical and Open Graph / Twitter tags.
 *
 * Every routed page calls {@link setPage} with already translated strings, so
 * the canonical always points at the page itself and returning home resets
 * the tags instead of keeping the last project's.
 */
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly translate = inject(TranslateService);

  /**
   * Keeps the tags of a static page in sync with the current language.
   * `translate.stream` waits for the translation file, so the title never
   * shows a raw i18n key. Call from a component constructor.
   */
  bindPage(config: { titleKey: string; descriptionKey: string; path: string; appendName?: boolean }): void {
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
        });
      });
  }

  /**
   * @param config.title - Full page title (also `og:title` / `twitter:title`).
   * @param config.description - Meta, OG and Twitter description.
   * @param config.path - Path of the page, e.g. `/projects/coderr` or `/`.
   */
  setPage(config: { title: string; description: string; path: string }): void {
    const url = SITE_ORIGIN + config.path;
    this.title.setTitle(config.title);
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.setCanonical(url);
  }

  private setCanonical(url: string): void {
    let link = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }
}
