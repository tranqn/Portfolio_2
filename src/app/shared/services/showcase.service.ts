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
  /** Order for general fullstack roles: architecture, then UI workflows, then API and hosting. */
  private readonly items = signal<ShowcaseItem[]>([
    {
      id: 'stadtpuls',
      projectId: 'stadtpuls',
      i18nKey: 'SHOWCASE.STADTPULS',
      liveUrl: 'https://stadtpuls.quocnamtran.com',
      code: { url: 'https://gitlab.com/nam.qt/stadtpuls', host: 'GitLab' },
      liveNeedsLogin: true,
      evidence: {
        diagram: 'stadtpuls-ingest',
        links: [
          { labelKey: 'SHOWCASE.STADTPULS.EVIDENCE.LINK_ADR', url: 'https://gitlab.com/nam.qt/stadtpuls/-/blob/main/docs/adr/03-two-datastores.md' },
          { labelKey: 'SHOWCASE.STADTPULS.EVIDENCE.LINK_TIME', url: 'https://gitlab.com/nam.qt/stadtpuls/-/blob/main/packages/core/time.spec.ts' },
          {
            labelKey: 'SHOWCASE.STADTPULS.EVIDENCE.LINK_TENANT',
            url: 'https://gitlab.com/nam.qt/stadtpuls/-/blob/main/services/api/src/api.integration.spec.ts#L272',
          },
        ],
      },
    },
    {
      id: 'praxis',
      projectId: 'praxis-ui-lab',
      i18nKey: 'SHOWCASE.PRAXIS',
      liveUrl: 'https://praxis-ui-lab.quocnamtran.com',
      evidence: {
        links: [
          {
            labelKey: 'SHOWCASE.PRAXIS.EVIDENCE.LINK_TRY',
            url: 'https://praxis-ui-lab.quocnamtran.com/einstellungen',
          },
        ],
      },
    },
    {
      id: 'coderr',
      projectId: 'coderr',
      i18nKey: 'SHOWCASE.CODERR',
      liveUrl: 'https://coderr.quocnamtran.com',
      code: { url: 'https://github.com/tranqn/coderr', host: 'GitHub' },
      evidence: {
        links: [
          { labelKey: 'SHOWCASE.CODERR.EVIDENCE.LINK_POLL', url: 'https://github.com/tranqn/coderr/blob/main/backend/message_app/tests.py#L48' },
          { labelKey: 'SHOWCASE.CODERR.EVIDENCE.LINK_CLIENT', url: 'https://github.com/tranqn/coderr/blob/main/frontend/scripts/messages.js' },
          { labelKey: 'SHOWCASE.CODERR.EVIDENCE.LINK_SNAPSHOT', url: 'https://github.com/tranqn/coderr/blob/main/backend/order_app/tests.py#L75' },
        ],
      },
    },
  ]);

  /** All showcase entries in display order. */
  readonly allItems = computed(() => this.items());
  /** Id of the selected entry. */
  readonly selectedId = signal('stadtpuls');
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
