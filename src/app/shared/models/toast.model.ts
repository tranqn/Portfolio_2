/** A single toast notification managed by {@link ToastService}. */
export interface ToastMessage {
  /** Auto-incrementing unique identifier for removal tracking. */
  id: number;
  /** i18n translation key for the toast message text. */
  messageKey: string;
  /** Visual variant: green check for success, red X for error. */
  type: 'success' | 'error';
}
