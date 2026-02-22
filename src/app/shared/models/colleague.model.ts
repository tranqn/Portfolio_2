/** Colleague testimonial displayed in the "What colleagues say" section. */
export interface Colleague {
  /** Colleague's display name. */
  name: string;
  /** i18n translation key for the colleague's job title. */
  positionKey: string;
  /** i18n translation key for the testimonial quote. */
  textKey: string;
  /** LinkedIn profile URL (opens in new tab). */
  linkedInUrl: string;
}
