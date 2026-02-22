import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Project } from '../../models';
import { CtaButton } from '../cta-button/cta-button';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink, TranslateModule, CtaButton],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
/**
 * Card component for the projects grid section.
 *
 * Displays a project image, title, tech stack icons, and a "View project" CTA
 * linking to the project detail page.
 */
export class ProjectCard {
  /** The project data to render. */
  readonly project = input.required<Project>();
}
