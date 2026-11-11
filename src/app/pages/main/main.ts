import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { AboutMe } from '../../components/about-me/about-me';
import { Projects } from '../../components/projects/projects';
import { Colleagues } from '../../components/colleagues/colleagues';
import { Contact } from '../../components/contact/contact';

@Component({
  selector: 'app-main',
  imports: [Hero, AboutMe, Projects, Colleagues, Contact],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
/**
 * Home page composing all single-page sections in order:
 * Hero (with the competence areas), Projects, About Me, Colleagues, Contact.
 */
export class Main {}
