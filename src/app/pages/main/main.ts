import { Component } from '@angular/core';
import { Hero } from '../../components/hero/hero';
import { AboutMe } from '../../components/about-me/about-me';
import { Skills } from '../../components/skills/skills';
import { Projects } from '../../components/projects/projects';
import { Colleagues } from '../../components/colleagues/colleagues';
import { Contact } from '../../components/contact/contact';

@Component({
  selector: 'app-main',
  imports: [Hero, AboutMe, Skills, Projects, Colleagues, Contact],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
/**
 * Home page composing all single-page sections in order:
 * Hero, About Me, Skills, Projects, Colleagues, Contact.
 */
export class Main {}
