import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CtaButton } from '../../shared/components/cta-button/cta-button';
import { IMAGE_PATHS } from '../../shared/constants';

@Component({
  selector: 'app-about-me',
  imports: [TranslateModule, CtaButton],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss',
})
/**
 * "About Me" section with a short bio, location/remote/relocation stickers,
 * and a CTA linking to the contact form.
 */
export class AboutMe {
  protected readonly images = IMAGE_PATHS.ABOUT_ME;
}
