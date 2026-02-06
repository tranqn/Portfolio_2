import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Hero } from '../../components/hero/hero';
import { AboutMe } from '../../components/about-me/about-me';
import { Skills } from '../../components/skills/skills';
import { Projects } from '../../components/projects/projects';
import { Colleagues } from '../../components/colleagues/colleagues';
import { Contact } from '../../components/contact/contact';
import { Footer } from '../../components/footer/footer';

@Component({
  selector: 'app-main',
  imports: [Header, Hero, AboutMe, Skills, Projects, Colleagues, Contact, Footer],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {}
