import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
/**
 * Centralizes `<title>` and Open Graph meta-tag updates for each route.
 *
 * Called from page components (legal-notice, privacy-policy, project-detail)
 * to set page-specific SEO metadata.
 */
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  /**
   * Sets the document title and corresponding OG tags.
   * @param config.title - Page title (also used for `og:title`).
   * @param config.description - Optional meta/OG description.
   */
  updateTags(config: { title: string; description?: string }): void {
    this.title.setTitle(config.title);
    this.meta.updateTag({ property: 'og:title', content: config.title });

    if (config.description) {
      this.meta.updateTag({ name: 'description', content: config.description });
      this.meta.updateTag({ property: 'og:description', content: config.description });
    }
  }
}
