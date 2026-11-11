import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Skills } from '../skills/skills';
import { Reveal } from '../../shared/directives/reveal.directive';
import { HeroTerminals } from '../hero-terminals/hero-terminals';

@Component({
  selector: 'app-hero',
  imports: [TranslateModule, RouterLink, Skills, Reveal, HeroTerminals],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
/**
 * Light hero in the Dia order: statement first, then a "desk" with the
 * polaroid portrait (name, role, location beside it) and a terminal window
 * where Claude Code and Codex work, then the four competence areas.
 *
 * A one-off light sweep (CSS, about four seconds) and staggered entrances
 * play only when motion is allowed.
 */
export class Hero {
  protected readonly portrait = {
    webp: 'img/hero/portrait-720.webp',
    jpg: 'img/hero/pb.jpg',
    width: 928,
    height: 1025,
  };
  protected readonly polaroidFrame = 'img/hero/polaroid-frame.png';
}
