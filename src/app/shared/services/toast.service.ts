import { Injectable, signal } from '@angular/core';
import { ToastMessage } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  readonly toasts = signal<ToastMessage[]>([]);

  private nextId = 0;

  show(messageKey: string, type: 'success' | 'error'): void {
    const id = this.nextId++;
    this.toasts.update((list) => [...list, { id, messageKey, type }]);
    setTimeout(() => this.remove(id), 5000);
  }

  private remove(id: number): void {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }
}
