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
export class Hero {
  protected readonly frontendLetters: Letter[] = this.splitIntoLetters('Frontend');
  protected readonly developerLetters: Letter[] = this.splitIntoLetters('DEVELOPER');
  protected readonly wavingHandPath = IMAGE_PATHS.HERO.WAVING_HAND;
  protected readonly photoPath = IMAGE_PATHS.HERO.PHOTO;
  protected readonly polaroidFramePath = IMAGE_PATHS.HERO.POLAROID_FRAME;

  private splitIntoLetters(text: string): Letter[] {
    return text.split('').map((char) => ({
      char,
      isUpperCase: char === char.toUpperCase() && char !== char.toLowerCase(),
    }));
  }
}
