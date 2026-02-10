import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IMAGE_PATHS } from '../../shared/constants';
import { Colleague } from '../../shared/models';

@Component({
  selector: 'app-colleagues',
  imports: [TranslateModule],
  templateUrl: './colleagues.html',
  styleUrl: './colleagues.scss',
})
export class Colleagues {
  protected readonly underlinePath = IMAGE_PATHS.COLLEAGUES.UNDERLINE;
  protected readonly linkedInIcon = IMAGE_PATHS.SHARED.LINKEDIN_PLAIN;

  protected readonly colleagues: Colleague[] = [
    {
      name: 'Christian Hajduk',
      positionKey: 'COLLEAGUES.CHRISTIAN.POSITION',
      textKey: 'COLLEAGUES.CHRISTIAN.TEXT',
      linkedInUrl: 'https://linkedin.com',
    },
    {
      name: 'Daniel Kersten',
      positionKey: 'COLLEAGUES.DANIEL.POSITION',
      textKey: 'COLLEAGUES.DANIEL.TEXT',
      linkedInUrl: 'https://linkedin.com',
    },
    {
      name: 'Paul',
      positionKey: 'COLLEAGUES.PAUL.POSITION',
      textKey: 'COLLEAGUES.PAUL.TEXT',
      linkedInUrl: 'https://linkedin.com',
    },
  ];
}
