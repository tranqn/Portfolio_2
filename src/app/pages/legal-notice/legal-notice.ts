import { Component, effect, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-legal-notice',
  imports: [TranslateModule],
  templateUrl: './legal-notice.html',
  styleUrl: './legal-notice.scss',
})
/** Legal Notice (Impressum) page required by German law. Sets its own SEO title. */
export class LegalNotice {
  private readonly seoService = inject(SeoService);

  constructor() {
    effect(() => {
      this.seoService.updateTags({ title: 'Impressum | Quoc Nam Tran' });
    });
  }
}
