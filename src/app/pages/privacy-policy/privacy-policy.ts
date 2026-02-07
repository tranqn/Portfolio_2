import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-privacy-policy',
  imports: [TranslateModule, Header, Footer],
  templateUrl: './privacy-policy.html',
  styleUrl: './privacy-policy.scss',
})
export class PrivacyPolicy {}
