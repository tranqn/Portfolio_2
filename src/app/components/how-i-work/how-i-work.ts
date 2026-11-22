import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { HeroTerminals } from '../hero-terminals/hero-terminals';
import { Reveal } from '../../shared/directives/reveal.directive';
import { Sweep } from '../../shared/directives/sweep.directive';
import { PRAXIS_TRY_URL } from '../../shared/services/showcase.service';

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
 *
 * The terminal is deferred until it scrolls into view, so its CSS sequence
 * (about twelve seconds) plays when someone looks at it, not at page load.
 */
export class HowIWork {
  protected readonly praxisTryUrl = PRAXIS_TRY_URL;

  protected readonly exampleParts = ['SPEC', 'AGENT', 'REVIEW', 'PROOF'] as const;
}
