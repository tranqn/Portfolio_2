/**
 * One card in the "more projects" grid. Most cards open a detail page; a few
 * projects (e.g. Zyklus) have none and link straight to their live demo, so
 * no `/projects/<id>` route is ever generated for them.
 */
export interface ProjectCardEntry {
  id: string;
  /** i18n keys of the card texts. */
  titleKey: string;
  techKey: string;
  roleKey?: string;
  /** Poster frame shown in the small window (no video in the grid). */
  poster: string;
  width: number;
  height: number;
  /** Highlighted card, e.g. the team project. */
  highlight?: boolean;
  /** Either an internal detail route or an external live URL. */
  link: { route: string } | { href: string };
}
