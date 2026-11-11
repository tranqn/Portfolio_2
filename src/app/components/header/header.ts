import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MotionService } from '../../shared/services/motion.service';
import { TranslationService } from '../../shared/services/translation.service';

/** Sections reachable from the navigation, in page order. */
const NAV_ITEMS = [
  { fragment: 'skills', key: 'HEADER.SKILLS' },
  { fragment: 'projects', key: 'HEADER.PROJECTS' },
  { fragment: 'about', key: 'HEADER.ABOUT' },
  { fragment: 'contact', key: 'HEADER.CONTACT' },
] as const;

@Component({
  selector: 'app-header',
  imports: [RouterLink, TranslateModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    '(document:keydown.escape)': 'closeMenu(true)',
  },
})
/**
 * Compact floating navigation (pill) with the DE/EN switch.
 *
 * On the home page, section links scroll in place (smoothly only when motion is
 * allowed) and move focus to the section; from other pages they navigate to
 * `/#fragment`. Below 760px the links collapse into a small dropdown menu.
 */
export class Header {
  protected readonly translationService = inject(TranslationService);
  protected readonly navItems = NAV_ITEMS;
  /** Whether the mobile dropdown menu is open. */
  protected readonly menuOpen = signal(false);

  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly motion = inject(MotionService);
  private readonly menuButton = viewChild<ElementRef<HTMLButtonElement>>('menuButton');

  /** Opens or closes the mobile dropdown menu. */
  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  /** Closes the menu; optionally returns focus to the menu button (Escape). */
  closeMenu(restoreFocus = false): void {
    if (!this.menuOpen()) return;
    this.menuOpen.set(false);
    if (restoreFocus) this.menuButton()?.nativeElement.focus();
  }

  /**
   * Handles a section link. On the home page it scrolls in place, so repeated
   * clicks work and reduced motion is respected; elsewhere the router navigates.
   */
  protected goTo(event: MouseEvent, fragment: string): void {
    this.menuOpen.set(false);
    const onHome = this.router.url.split('#')[0].split('?')[0] === '/';
    const target = this.document.getElementById(fragment);
    if (!onHome || !target) return;

    event.preventDefault();
    this.motion.scrollTo(target);
    target.focus({ preventScroll: true });
    history.replaceState(history.state, '', `/#${fragment}`);
  }

  /** Returns to the top of the home page. */
  protected goHome(event: MouseEvent): void {
    this.menuOpen.set(false);
    if (this.router.url.split('#')[0] !== '/') return;
    event.preventDefault();
    this.document.defaultView?.scrollTo({ top: 0, behavior: this.motion.reduced() ? 'auto' : 'smooth' });
    history.replaceState(history.state, '', '/');
  }
}
