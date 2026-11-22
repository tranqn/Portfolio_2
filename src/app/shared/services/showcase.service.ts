import { computed, Injectable, signal } from '@angular/core';
import { ShowcaseItem } from '../models';

/** Evidence links are pinned to a commit, so line anchors stay on the right test. */
const STADTPULS_CODE =
  'https://gitlab.com/nam.qt/stadtpuls/-/blob/e5d8298fd2910c574e7d0f9374be7aeea062c11f/';
const CODERR_CODE =
  'https://github.com/tranqn/coderr/blob/1823dfe6d0bf063cb7deacd15fe146f600b6c1c4/';

/** Praxis demo settings page where 409, 412 and 500 can be triggered on purpose. */
export const PRAXIS_TRY_URL = 'https://praxis-ui-lab.quocnamtran.com/einstellungen';

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
          {
            labelKey: 'SHOWCASE.STADTPULS.EVIDENCE.LINK_ADR',
            url: `${STADTPULS_CODE}docs/adr/03-two-datastores.md`,
          },
          {
            labelKey: 'SHOWCASE.STADTPULS.EVIDENCE.LINK_TIME',
            url: `${STADTPULS_CODE}packages/core/time.spec.ts`,
          },
          {
            labelKey: 'SHOWCASE.STADTPULS.EVIDENCE.LINK_TENANT',
            url: `${STADTPULS_CODE}services/api/src/api.integration.spec.ts#L272`,
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
            url: PRAXIS_TRY_URL,
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
          {
            labelKey: 'SHOWCASE.CODERR.EVIDENCE.LINK_POLL',
            url: `${CODERR_CODE}backend/message_app/tests.py#L48`,
          },
          {
            labelKey: 'SHOWCASE.CODERR.EVIDENCE.LINK_CLIENT',
            url: `${CODERR_CODE}frontend/scripts/messages.js`,
          },
          {
            labelKey: 'SHOWCASE.CODERR.EVIDENCE.LINK_SNAPSHOT',
            url: `${CODERR_CODE}backend/order_app/tests.py#L75`,
          },
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
