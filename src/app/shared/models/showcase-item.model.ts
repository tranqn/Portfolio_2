import { ProjectMediaAsset } from './project-media.model';

/** Entry of the selectable project showcase next to the large macOS window. */
export interface ShowcaseItem {
  /** Stable id, also used by the hero competence references. */
  id: string;
  /** Matching detail page in {@link ProjectDataService}, if one exists. */
  projectId?: string;
  /** i18n prefix, e.g. `SHOWCASE.PRAXIS` (keys: NAME, TAGLINE, STACK, TITLE, …). */
  i18nKey: string;
  /** Public live demo. */
  liveUrl?: string;
  /** Public source code and its host. */
  code?: { url: string; host: 'GitHub' | 'GitLab' };
  /** Own recording for entries without a detail page (otherwise the project's media is used). */
  media?: ProjectMediaAsset;
  /**
   * Evidence for the detail page. Texts live under `<i18nKey>.EVIDENCE`
   * (DECISION, TRADEOFF, VERIFICATION); links point at the test, ADR or code.
   */
  evidence?: { links: { labelKey: string; url: string }[]; diagram?: 'stadtpuls-ingest' };
  /** Live demo needs a sign-in, so the recording becomes the primary path. */
  liveNeedsLogin?: boolean;
  /** Number of overview points (`<i18nKey>.OVERVIEW.0…n`) shown when no recording exists. */
  overviewPoints?: number;
}
