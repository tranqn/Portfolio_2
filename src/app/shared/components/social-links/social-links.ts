import { Component, input } from '@angular/core';
import { SocialLink } from '../../models';
import { IMAGE_PATHS } from '../../constants';

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
export class SocialLinks {
  readonly links = input<SocialLink[]>(DEFAULT_LINKS);

  isMailto(url: string): boolean {
    return url.startsWith('mailto:');
  }
}
