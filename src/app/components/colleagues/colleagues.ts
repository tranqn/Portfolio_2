import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IMAGE_PATHS } from '../../shared/constants';

interface ColleagueRef {
  name: string;
  positionKey: string;
  textKey: string;
  linkedInUrl: string;
}

@Component({
  selector: 'app-colleagues',
  imports: [TranslateModule],
  templateUrl: './colleagues.html',
  styleUrl: './colleagues.scss',
})
export class Colleagues {
  protected readonly underlinePath = IMAGE_PATHS.COLLEAGUES.UNDERLINE;
  protected readonly linkedInIcon = IMAGE_PATHS.SHARED.LINKEDIN;

  protected readonly colleagues: ColleagueRef[] = [
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
  ];
}
