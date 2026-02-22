import { Injectable, signal } from '@angular/core';
import { ToastMessage } from '../models';

/** Auto-dismiss duration for toast notifications in milliseconds. */
const TOAST_DURATION_MS = 5000;

@Injectable({
  providedIn: 'root',
})
/**
 * Manages ephemeral toast notifications displayed by {@link Toast}.
 *
 * Each toast auto-dismisses after {@link TOAST_DURATION_MS} milliseconds.
 */
export class ToastService {
  /** Signal-based list of currently visible toasts. */
  readonly toasts = signal<ToastMessage[]>([]);

  private nextId = 0;

  /**
   * Displays a new toast notification.
   * @param messageKey - i18n translation key for the message text.
   * @param type - Visual variant (`success` or `error`).
   */
  show(messageKey: string, type: 'success' | 'error'): void {
    const id = this.nextId++;
    this.toasts.update((list) => [...list, { id, messageKey, type }]);
    setTimeout(() => this.remove(id), TOAST_DURATION_MS);
  }

  /** Removes a toast by its unique id. */
  private remove(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }
}
