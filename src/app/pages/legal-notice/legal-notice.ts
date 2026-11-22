import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SeoService } from '../../shared/services/seo.service';
import { Sweep } from '../../shared/directives/sweep.directive';

@Component({
  selector: 'app-legal-notice',
  imports: [TranslateModule, Sweep],
  templateUrl: './legal-notice.html',
  styleUrl: './legal-notice.scss',
})
/** Legal Notice (Impressum) page required by German law. Sets its own SEO title. */
export class LegalNotice {
  private readonly seoService = inject(SeoService);

  constructor() {
    this.seoService.bindPage({
      titleKey: 'LEGAL_NOTICE.TITLE',
      descriptionKey: 'SEO.LEGAL_NOTICE_DESCRIPTION',
      path: '/legal-notice',
    });
  }
}
