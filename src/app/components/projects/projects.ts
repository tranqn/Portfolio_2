import { Component, computed, ElementRef, inject, viewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MacWindow } from '../../shared/components/mac-window/mac-window';
import { ProjectCard } from '../../shared/components/project-card/project-card';
import { ProjectMedia } from '../../shared/components/project-media/project-media';
import { Reveal } from '../../shared/directives/reveal.directive';
import { MotionService } from '../../shared/services/motion.service';
import { ProjectDataService } from '../../shared/services/project-data.service';
import { ShowcaseService } from '../../shared/services/showcase.service';

@Component({
  selector: 'app-projects',
  imports: [TranslateModule, RouterLink, MacWindow, ProjectMedia, ProjectCard, Reveal],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
/**
 * Project showcase: a selectable list next to a large macOS window.
 *
 * Selecting an entry swaps media, name, description, contribution and links in
 * one signal update, so fast repeated clicks can never leave stale text behind.
 * The window plays a short spatial transition (cancelled and restarted on every
 * switch). Projects that are not part of the showcase follow as compact cards
 * linking to their existing detail pages.
 */
export class Projects {
  protected readonly showcase = inject(ShowcaseService);
  private readonly projectData = inject(ProjectDataService);
  private readonly motion = inject(MotionService);

  private readonly windowEl = viewChild<ElementRef<HTMLElement>>('windowEl');
  private readonly captionEl = viewChild<ElementRef<HTMLElement>>('captionEl');
  private readonly storyText = viewChild<ElementRef<HTMLElement>>('storyText');

  protected readonly selected = this.showcase.selected;

  /** Detail-page project behind the selected entry (media, detail link). */
  protected readonly selectedProject = computed(() => {
    const id = this.selected().projectId;
    return id ? this.projectData.getProjectById(id) : undefined;
  });

  /** Recording of the selected entry: its own, else the detail-page project's. */
  protected readonly selectedMedia = computed(
    () => this.selected().media ?? this.selectedProject()?.media,
  );

  /** Index list for the overview points of entries without a recording. */
  protected readonly overviewIndexes = computed(() =>
    Array.from({ length: this.selected().overviewPoints ?? 0 }, (_, i) => i),
  );

  /** All projects with a detail page that are not already in the showcase. */
  protected readonly moreProjects = computed(() => {
    const shown = new Set(this.showcase.allItems().map((item) => item.projectId));
    return this.projectData.allProjects().filter((project) => !shown.has(project.id));
  });

  /** Selects an entry and plays the window transition in the direction of travel. */
  protected select(id: string): void {
    const previous = this.selected().id;
    if (previous === id) return;
    this.showcase.select(id);

    const direction = this.showcase.indexOf(id) > this.showcase.indexOf(previous) ? 1 : -1;
    this.motion.animate(
      this.windowEl()?.nativeElement,
      [
        {
          transform: `perspective(1200px) translate(${direction * 14}px, 16px) rotateY(${direction * -2.5}deg) scale(0.975)`,
          opacity: 0.55,
        },
        { transform: 'none', opacity: 1 },
      ],
      { duration: 620 },
    );
    this.motion.animate(
      this.captionEl()?.nativeElement,
      [
        { transform: 'translateY(10px)', opacity: 0.4 },
        { transform: 'none', opacity: 1 },
      ],
      { duration: 460, delay: 60 },
    );
  }

  /** Gentle entrance of the project story when the accordion opens. */
  protected onStoryToggle(event: Event): void {
    if ((event.target as HTMLDetailsElement).open) {
      this.motion.animate(
        this.storyText()?.nativeElement,
        [
          { transform: 'translateY(-6px)', opacity: 0 },
          { transform: 'none', opacity: 1 },
        ],
        { duration: 300 },
      );
    }
  }
}
