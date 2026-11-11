import { computed, Injectable, signal } from '@angular/core';
import { ShowcaseItem } from '../models';

@Injectable({
  providedIn: 'root',
})
/**
 * Projects of the showcase section and the currently selected one.
 *
 * Shared between the hero (competence references select a project) and the
 * projects section (list + macOS window), so both always agree on the selection.
 * Only links that were checked to resolve are listed; private work has none.
 */
export class ShowcaseService {
  private readonly items = signal<ShowcaseItem[]>([
    {
      id: 'praxis',
      projectId: 'praxis-ui-lab',
      i18nKey: 'SHOWCASE.PRAXIS',
      liveUrl: 'https://praxis-ui-lab.quocnamtran.com',
    },
    {
      id: 'stadtpuls',
      projectId: 'stadtpuls',
      i18nKey: 'SHOWCASE.STADTPULS',
      liveUrl: 'https://stadtpuls.quocnamtran.com',
      code: { url: 'https://gitlab.com/nam.qt/stadtpuls', host: 'GitLab' },
    },
    {
      id: 'zyklus',
      i18nKey: 'SHOWCASE.ZYKLUS',
      liveUrl: 'https://mci.quocnamtran.com',
      media: {
        video: 'media/projects/zyklus.mp4',
        poster: 'media/projects/zyklus.jpg',
        width: 960,
        height: 640,
      },
      overviewPoints: 5,
    },
    {
      id: 'coderr',
      projectId: 'coderr',
      i18nKey: 'SHOWCASE.CODERR',
      liveUrl: 'https://coderr.quocnamtran.com',
      code: { url: 'https://github.com/tranqn/coderr', host: 'GitHub' },
    },
  ]);

  /** All showcase entries in display order. */
  readonly allItems = computed(() => this.items());
  /** Id of the selected entry. */
  readonly selectedId = signal('praxis');
  /** The selected entry (falls back to the first one). */
  readonly selected = computed(
    () => this.items().find((item) => item.id === this.selectedId()) ?? this.items()[0],
  );

  /** Selects an entry by id; unknown ids are ignored. */
  select(id: string): void {
    if (this.items().some((item) => item.id === id)) {
      this.selectedId.set(id);
    }
  }

  /** Position of an entry in the list, used for the direction of the window transition. */
  indexOf(id: string): number {
    return this.items().findIndex((item) => item.id === id);
  }
}
