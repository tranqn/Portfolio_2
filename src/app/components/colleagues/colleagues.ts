import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IMAGE_PATHS } from '../../shared/constants';
import { ColleagueDataService } from '../../shared/services/colleague-data.service';

@Component({
  selector: 'app-colleagues',
  imports: [TranslateModule],
  templateUrl: './colleagues.html',
  styleUrl: './colleagues.scss',
})
/**
 * "What colleagues say" testimonial carousel/grid section.
 *
 * Renders colleague cards with translated position titles
 * and testimonial quotes, each linking to their LinkedIn profile.
 */
export class Colleagues {
  protected readonly colleagueDataService = inject(ColleagueDataService);
  protected readonly underlinePath = IMAGE_PATHS.COLLEAGUES.UNDERLINE;
  protected readonly linkedInIcon = IMAGE_PATHS.SHARED.LINKEDIN_PLAIN;
}
