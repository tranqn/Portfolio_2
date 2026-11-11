import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Reveal } from '../../shared/directives/reveal.directive';

/** Technologies that appear in at least one project on this page. */
const USED_IN_PROJECTS = [
  'TypeScript',
  'JavaScript',
  'Angular',
  'React',
  'Next.js',
  'Vue 3',
  'Node.js',
  'Python',
  'Django REST',
  'PostgreSQL',
  'InfluxDB',
  'Redis',
  'Docker',
  'Caddy',
  'Playwright',
  'Git',
  'GitHub Actions',
  'GitLab CI',
];

@Component({
  selector: 'app-about-me',
  imports: [TranslateModule, Reveal],
  templateUrl: './about-me.html',
  styleUrl: './about-me.scss',
})
/**
 * "About me": short bio, where I want to work, how I approach tasks and the
 * technologies that appear in the projects above.
 */
export class AboutMe {
  protected readonly tools = USED_IN_PROJECTS;
}
