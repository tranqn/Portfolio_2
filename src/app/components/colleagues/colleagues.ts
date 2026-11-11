import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Reveal } from '../../shared/directives/reveal.directive';
import { ColleagueDataService } from '../../shared/services/colleague-data.service';

@Component({
  selector: 'app-colleagues',
  imports: [TranslateModule, Reveal],
  templateUrl: './colleagues.html',
  styleUrl: './colleagues.scss',
})
/**
 * Feedback from teammates, each quote linking to the author's LinkedIn profile.
 */
export class Colleagues {
  protected readonly colleagueDataService = inject(ColleagueDataService);
}
