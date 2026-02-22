/** A technology/skill with its display name and icon path. */
export interface Technology {
  /** Human-readable technology name (e.g. "Angular", "TypeScript"). */
  name: string;
  /** Path to the SVG/PNG icon in `public/img/skills/`. */
  icon: string;
}
