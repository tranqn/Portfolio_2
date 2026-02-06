import { Component, input } from '@angular/core';
import { SocialLink } from '../../models';
import { IMAGE_PATHS } from '../../constants';

const DEFAULT_LINKS: SocialLink[] = [
  { url: 'https://linkedin.com', icon: IMAGE_PATHS.SHARED.LINKEDIN, label: 'LinkedIn' },
  { url: 'https://github.com', icon: IMAGE_PATHS.SHARED.GITHUB, label: 'GitHub' },
  { url: 'mailto:contact@example.com', icon: IMAGE_PATHS.SHARED.EMAIL, label: 'Email' },
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
