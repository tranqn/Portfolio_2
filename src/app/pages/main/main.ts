import { Component, inject } from '@angular/core';
import { SeoService } from '../../shared/services/seo.service';
import { Hero } from '../../components/hero/hero';
import { AboutMe } from '../../components/about-me/about-me';
import { Projects } from '../../components/projects/projects';
import { HowIWork } from '../../components/how-i-work/how-i-work';
import { Colleagues } from '../../components/colleagues/colleagues';
import { Contact } from '../../components/contact/contact';

@Component({
  selector: 'app-main',
  imports: [Hero, AboutMe, Projects, HowIWork, Colleagues, Contact],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
/**
 * Home page composing all single-page sections in order:
 * Hero (with the competence areas), Projects, How I work, About Me, Colleagues, Contact.
 */
export class Main {
  constructor() {
    inject(SeoService).bindPage({
      titleKey: 'SEO.HOME_TITLE',
      descriptionKey: 'SEO.HOME_DESCRIPTION',
      path: '/',
      appendName: false,
    });
  }
}
