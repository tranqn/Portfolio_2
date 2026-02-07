import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-legal-notice',
  imports: [TranslateModule, Header, Footer],
  templateUrl: './legal-notice.html',
  styleUrl: './legal-notice.scss',
})
export class LegalNotice {}
