import { Component, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SeoService } from '../../shared/services/seo.service';

@Component({
  selector: 'app-legal-notice',
  imports: [TranslateModule],
  templateUrl: './legal-notice.html',
  styleUrl: './legal-notice.scss',
})
export class LegalNotice implements OnInit {
  private readonly seoService = inject(SeoService);

  ngOnInit(): void {
    this.seoService.updateTags({ title: 'Impressum | Quoc Nam Tran' });
  }
}
