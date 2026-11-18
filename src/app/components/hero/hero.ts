import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Skills } from '../skills/skills';
import { Reveal } from '../../shared/directives/reveal.directive';
import { HeroTerminals } from '../hero-terminals/hero-terminals';
import { Sweep } from '../../shared/directives/sweep.directive';
import { IMAGE_PATHS } from '../../shared/constants';

@Component({
  selector: 'app-hero',
  imports: [TranslateModule, RouterLink, Skills, Reveal, HeroTerminals, Sweep],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
/**
 * Light hero in the Dia order: statement first, then a "desk" with the
 * illustrated portrait (about a quarter of the width, name, role and location
 * below it) and a terminal window where Claude Code and Codex work, then the
 * four competence areas.
 *
 * A one-off light sweep (CSS, about four seconds) and staggered entrances
 * play only when motion is allowed.
 */
export class Hero {
  /** Faceted illustration with a transparent background. */
  protected readonly portrait = {
    webp: IMAGE_PATHS.HERO.PORTRAIT_WEBP,
    png: IMAGE_PATHS.HERO.PORTRAIT_PNG,
    width: 720,
    height: 781,
  };
}
