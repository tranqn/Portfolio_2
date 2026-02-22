import { Component, effect, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-privacy-policy',
  imports: [TranslateModule],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss',
})
/** Privacy Policy (Datenschutzerklärung) page required by German law. Sets its own SEO title. */
export class PrivacyPolicy {
  private readonly seoService = inject(SeoService);

  constructor() {
    effect(() => {
      this.seoService.updateTags({ title: 'Datenschutzerklärung | Quoc Nam Tran' });
    });
  }
}
