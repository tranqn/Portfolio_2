import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Letter } from '../../shared/models';
import { CtaButton } from '../../shared/components/cta-button/cta-button';
import { SocialLinks } from '../../shared/components/social-links/social-links';
import { IMAGE_PATHS } from '../../shared/constants';

@Component({
  selector: 'app-hero',
  imports: [TranslateModule, CtaButton, SocialLinks],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
/**
 * Full-viewport hero section (100vh including header).
 *
 * Displays the animated "Fullstack DEVELOPER" title (split into individual
 * {@link Letter} objects for per-character styling), a polaroid photo,
 * social links, and a scroll-down CTA.
 */
export class Hero {
  /** Individual characters for the word "FULLSTACK" with case metadata. */
  protected readonly fullstackLetters: Letter[] = this.splitIntoLetters('FULLSTACK');
  /** Individual characters for the word "DEVELOPER" with case metadata. */
  protected readonly developerLetters: Letter[] = this.splitIntoLetters('DEVELOPER');
  protected readonly wavingHandPath = IMAGE_PATHS.HERO.WAVING_HAND;
  protected readonly photoPath = IMAGE_PATHS.HERO.PHOTO;
  protected readonly polaroidFramePath = IMAGE_PATHS.HERO.POLAROID_FRAME;

  /** Splits a string into {@link Letter} objects for per-character template rendering. */
  private splitIntoLetters(text: string): Letter[] {
    return text.split('').map((char) => ({
      char,
      isUpperCase: char === char.toUpperCase() && char !== char.toLowerCase(),
    }));
  }
}
