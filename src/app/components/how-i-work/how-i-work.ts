import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeroTerminals } from '../hero-terminals/hero-terminals';
import { Reveal } from '../../shared/directives/reveal.directive';
import { Sweep } from '../../shared/directives/sweep.directive';

@Component({
  selector: 'app-how-i-work',
  imports: [TranslateModule, HeroTerminals, Reveal, Sweep],
  templateUrl: './how-i-work.html',
  styleUrl: './how-i-work.scss',
})
/**
 * "How I work" (`#arbeitsweise`): how I use Claude Code and Codex, shown
 * after the projects so the first screen belongs to my own work.
 *
 * The terminal window is labelled as an illustration; next to it sits one
 * real, checkable example from Praxis UI Lab (what I specified, what the
 * agent did, what I checked, which tests prove it).
 */
export class HowIWork {
  /** Live demo settings page where 409, 412 and 500 can be triggered. */
  protected readonly praxisTryUrl = 'https://praxis-ui-lab.quocnamtran.com/einstellungen';

  protected readonly exampleParts = ['SPEC', 'AGENT', 'REVIEW', 'PROOF'] as const;
}
