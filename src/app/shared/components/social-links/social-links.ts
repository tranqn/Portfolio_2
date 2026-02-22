import { Component, input } from '@angular/core';
import { SocialLink } from '../../models';
import { IMAGE_PATHS } from '../../constants';

/** Default social links shown in the hero section and mobile menu. */
const DEFAULT_LINKS: SocialLink[] = [
  { url: 'https://www.linkedin.com/in/tranqn/', icon: IMAGE_PATHS.SHARED.LINKEDIN, label: 'LinkedIn' },
  { url: 'https://github.com/tranqn', icon: IMAGE_PATHS.SHARED.GITHUB, label: 'GitHub' },
  { url: 'mailto:tran.qn@protonmail.com', icon: IMAGE_PATHS.SHARED.EMAIL, label: 'Email' },
];

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.html',
  styleUrl: './social-links.scss',
})
/**
 * Renders a row of social-media icon links (LinkedIn, GitHub, Email).
 *
 * Accepts a custom {@link links} list or falls back to {@link DEFAULT_LINKS}.
 * `mailto:` links are detected to avoid `target="_blank"`.
 */
export class SocialLinks {
  /** Social links to display. Defaults to LinkedIn, GitHub, and Email. */
  readonly links = input<SocialLink[]>(DEFAULT_LINKS);

  /** Returns `true` when the URL is a `mailto:` scheme (no new-tab behavior). */
  isMailto(url: string): boolean {
    return url.startsWith('mailto:');
  }
}
