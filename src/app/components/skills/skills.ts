import { DOCUMENT } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Reveal } from '../../shared/directives/reveal.directive';
import { MotionService } from '../../shared/services/motion.service';
import { ShowcaseService } from '../../shared/services/showcase.service';

/** A competence area with the showcase entries that back it up (may be none). */
interface CompetenceArea {
  key: string;
  references: { showcaseId: string; nameKey: string }[];
}

const AREAS: CompetenceArea[] = [
  {
    key: 'SKILLS.WEB',
    references: [
      { showcaseId: 'praxis', nameKey: 'SHOWCASE.PRAXIS.NAME' },
      { showcaseId: 'zyklus', nameKey: 'SHOWCASE.ZYKLUS.NAME' },
    ],
  },
  {
    key: 'SKILLS.DATA',
    references: [
      { showcaseId: 'stadtpuls', nameKey: 'SHOWCASE.STADTPULS.NAME' },
      { showcaseId: 'coderr', nameKey: 'SHOWCASE.CODERR.NAME' },
    ],
  },
  {
    key: 'SKILLS.AI',
    references: [],
  },
  {
    key: 'SKILLS.HOSTING',
    references: [],
  },
];

@Component({
  selector: 'app-skills',
  imports: [TranslateModule, Reveal],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
/**
 * The four competence areas shown in the hero (`#skills`).
 *
 * Each reference selects the matching project in the showcase, scrolls to the
 * projects section and moves keyboard focus to the selected project.
 */
export class Skills {
  protected readonly areas = AREAS;

  private readonly showcase = inject(ShowcaseService);
  private readonly motion = inject(MotionService);
  private readonly document = inject(DOCUMENT);

  /** Selects a showcase entry and brings the projects section into view. */
  protected showProject(showcaseId: string): void {
    this.showcase.select(showcaseId);
    this.motion.scrollTo(this.document.getElementById('projects'));
    this.document
      .getElementById(`project-choice-${showcaseId}`)
      ?.focus({ preventScroll: true });
  }
}
