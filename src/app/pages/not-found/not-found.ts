import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SeoService } from '../../shared/services/seo.service';
import { LocalizePipe } from '../../shared/utils/localize.pipe';

@Component({
  selector: 'app-not-found',
  imports: [TranslateModule, RouterLink, LocalizePipe],
  template: `
    <main id="main-content" class="not-found" tabindex="-1">
      <h1>{{ 'NOT_FOUND.PAGE_TITLE' | translate }}</h1>
      <p>{{ 'NOT_FOUND.PAGE_TEXT' | translate }}</p>
      <a class="pill-link pill-link--primary" [routerLink]="'/' | localize">{{ 'NOT_FOUND.HOME' | translate }}</a>
    </main>
  `,
  styles: `
    .not-found {
      max-width: 720px;
      margin: 0 auto;
      padding: 180px 24px 120px;
    }
    p {
      margin: 16px 0 28px;
      font-size: 18px;
    }
  `,
})
/**
 * Page for unknown paths. Prerendered as `/404`; Apache serves it with a real
 * 404 status via `ErrorDocument`, and the client router shows it for unknown
 * in-app links instead of silently redirecting home.
 */
export class NotFound {
  constructor() {
    inject(SeoService).bindPage({
      titleKey: 'NOT_FOUND.PAGE_TITLE',
      descriptionKey: 'NOT_FOUND.PAGE_TEXT',
      path: '/404',
      noindex: true,
    });
  }
}
