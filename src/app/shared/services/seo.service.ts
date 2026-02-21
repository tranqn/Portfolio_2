import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  updateTags(config: { title: string; description?: string }): void {
    this.title.setTitle(config.title);
    this.meta.updateTag({ property: 'og:title', content: config.title });

    if (config.description) {
      this.meta.updateTag({ name: 'description', content: config.description });
      this.meta.updateTag({ property: 'og:description', content: config.description });
    }
  }
}
