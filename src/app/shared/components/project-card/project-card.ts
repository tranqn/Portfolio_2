import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectCardEntry } from '../../models';
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
 * links to the project's detail page, or to the live demo when there is none.
 */
export class ProjectCard {
  readonly entry = input.required<ProjectCardEntry>();

  protected readonly route = computed(() => {
    const link = this.entry().link;
    return 'route' in link ? link.route : null;
  });

  protected readonly href = computed(() => {
    const link = this.entry().link;
    return 'href' in link ? link.href : null;
  });
}
