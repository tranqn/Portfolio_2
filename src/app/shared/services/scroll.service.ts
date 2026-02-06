import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  private readonly platformId = inject(PLATFORM_ID);

  scrollToElement(elementId: string): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    const element = document.getElementById(elementId);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToTop(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
