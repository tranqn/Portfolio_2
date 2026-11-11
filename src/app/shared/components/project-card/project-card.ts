import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Project } from '../../models';
import { MacWindow } from '../mac-window/mac-window';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink, TranslateModule, MacWindow],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
/**
 * Compact card for projects outside the showcase.
 *
 * Shows only the poster frame in a small macOS window (lazy-loaded, no video),
 * so the page never loads or plays every recording at once. The whole card
 * links to the project's detail page.
 */
export class ProjectCard {
  /** The project data to render. */
  readonly project = input.required<Project>();

  /** i18n key of the one-line tech summary (`PROJECTS.X.TECH`). */
  protected readonly techKey = computed(() => this.project().title.replace(/\.TITLE$/, '.TECH'));
}
