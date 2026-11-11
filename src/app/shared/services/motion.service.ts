import { DOCUMENT } from '@angular/common';
import { computed, effect, inject, Injectable, signal } from '@angular/core';

/** localStorage key for the visitor's manual "reduce motion" choice. */
const STORAGE_KEY = 'portfolio-reduced-motion';

@Injectable({
  providedIn: 'root',
})
/**
 * Single source of truth for motion on the site.
 *
 * Motion is reduced when the OS asks for it (`prefers-reduced-motion`) or when
 * the visitor flips the footer toggle (persisted in localStorage). The state is
 * mirrored as `motion-reduced` on `<html>`, where global CSS switches off
 * animations, transitions and smooth scrolling.
 *
 * {@link animate} wraps the Web Animations API: it does nothing while motion is
 * reduced and cancels a still-running animation on the same element, so rapid
 * interactions never queue up stale animations.
 */
export class MotionService {
  private readonly document = inject(DOCUMENT);
  private readonly mediaQuery = this.document.defaultView?.matchMedia?.(
    '(prefers-reduced-motion: reduce)',
  );
  private readonly running = new Map<Element, Animation>();

  /** `true` when the operating system requests reduced motion. */
  readonly systemReduced = signal(this.mediaQuery?.matches ?? false);
  /** `true` when the visitor chose "reduce motion" in the footer. */
  readonly userReduced = signal(this.readStoredPreference());
  /** Effective state: any source asking for less motion wins. */
  readonly reduced = computed(() => this.systemReduced() || this.userReduced());

  constructor() {
    this.mediaQuery?.addEventListener('change', (event) => this.systemReduced.set(event.matches));

    effect(() => {
      const reduced = this.reduced();
      this.document.documentElement.classList.toggle('motion-reduced', reduced);
      if (reduced) {
        this.running.forEach((animation) => animation.cancel());
        this.running.clear();
      }
    });
  }

  /** Flips the manual preference and remembers it for the next visit. */
  toggleUserPreference(): void {
    const next = !this.userReduced();
    this.userReduced.set(next);
    try {
      localStorage.setItem(STORAGE_KEY, String(next));
    } catch {
      // Storage can be blocked (private mode); the choice then lasts for this visit only.
    }
  }

  /**
   * Runs a Web Animation unless motion is reduced. A previous animation on the
   * same element is cancelled first.
   */
  animate(
    element: Element | null | undefined,
    keyframes: Keyframe[],
    options: KeyframeAnimationOptions = {},
  ): Animation | undefined {
    if (!element || this.reduced() || typeof element.animate !== 'function') return undefined;

    this.running.get(element)?.cancel();
    const animation = element.animate(keyframes, {
      duration: 560,
      easing: 'cubic-bezier(0.22, 0.7, 0.25, 1)',
      fill: 'backwards',
      ...options,
    });
    this.running.set(element, animation);
    const forget = () => {
      if (this.running.get(element) === animation) this.running.delete(element);
    };
    animation.finished.then(forget, forget);
    return animation;
  }

  /** Scrolls an element below the floating navigation, smoothly only when allowed. */
  scrollTo(element: Element | null | undefined): void {
    element?.scrollIntoView({ behavior: this.reduced() ? 'auto' : 'smooth', block: 'start' });
  }

  private readStoredPreference(): boolean {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  }
}
