import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SeoService } from '../../shared/services/seo.service';
import { Sweep } from '../../shared/directives/sweep.directive';

@Component({
  selector: 'app-privacy-policy',
  imports: [TranslateModule, Sweep],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss',
})
/** Privacy Policy (Datenschutzerklärung) page required by German law. Sets its own SEO title. */
export class PrivacyPolicy {
  private readonly seoService = inject(SeoService);

  constructor() {
    this.seoService.bindPage({
      titleKey: 'PRIVACY_POLICY.TITLE',
      descriptionKey: 'SEO.PRIVACY_POLICY_DESCRIPTION',
      path: '/privacy-policy',
    });
  }
}
