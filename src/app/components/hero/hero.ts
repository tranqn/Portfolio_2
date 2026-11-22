import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizePipe } from '../../shared/utils/localize.pipe';
import { Skills } from '../skills/skills';
import { Reveal } from '../../shared/directives/reveal.directive';
import { Sweep } from '../../shared/directives/sweep.directive';
import { IMAGE_PATHS } from '../../shared/constants';
import { TranslationService } from '../../shared/services/translation.service';

@Component({
  selector: 'app-hero',
  imports: [TranslateModule, RouterLink, Skills, Reveal, Sweep, LocalizePipe],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
/**
 * Light hero that answers a recruiter's three questions on the first screen:
 * which role (Fullstack Developer), what I build (intro, stack), and where to
 * see it (projects and CV as the two main actions). The illustrated portrait
 * sits on the left, the four competence areas follow below. How I work with
 * agents lives in its own section further down.
 *
 * A one-off light sweep (CSS, about four seconds) and staggered entrances
 * play only when motion is allowed.
 */
export class Hero {
  private readonly language = inject(TranslationService);

  /** Public CV in the page language; a fixed path, so it never depends on the JSON having loaded. */
  protected readonly cvFile = computed(() =>
    this.language.currentLang() === 'en' ? 'cv/Quoc-Nam-Tran-CV-en.pdf' : 'cv/Quoc-Nam-Tran-Lebenslauf.pdf',
  );

  /** Faceted illustration with a transparent background. */
  protected readonly portrait = {
    webp: IMAGE_PATHS.HERO.PORTRAIT_WEBP,
    png: IMAGE_PATHS.HERO.PORTRAIT_PNG,
    width: 720,
    height: 781,
  };
}
