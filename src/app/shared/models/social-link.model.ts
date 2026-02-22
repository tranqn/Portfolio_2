/** Data for a single social-media link rendered by {@link SocialLinks}. */
export interface SocialLink {
  /** Full URL or `mailto:` URI. */
  url: string;
  /** Path to the SVG/PNG icon asset. */
  icon: string;
  /** Accessible label used for `aria-label` and tooltips. */
  label: string;
}
