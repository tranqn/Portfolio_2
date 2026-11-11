import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';
import { MotionService } from '../services/motion.service';

/** Keyframes per reveal style. Content is never hidden by CSS, only animated in. */
const KEYFRAMES: Record<'rise' | 'window', Keyframe[]> = {
  rise: [
    { transform: 'translateY(18px)', opacity: 0 },
    { transform: 'none', opacity: 1 },
  ],
  window: [
    { transform: 'perspective(1200px) translateY(28px) rotateX(4deg) scale(0.97)', opacity: 0 },
    { transform: 'none', opacity: 1 },
  ],
};

@Directive({
  selector: '[appReveal]',
})
/**
 * Plays a short entrance animation the first time the host scrolls into view.
 *
 * The element stays fully visible without JavaScript, without
 * IntersectionObserver or with reduced motion: the directive only adds a
 * one-off Web Animation, it never sets a hidden starting state in CSS.
 */
export class Reveal {
  /** Animation style: `rise` (default) or the spatial `window` entrance. */
  readonly appReveal = input<'rise' | 'window' | ''>('');
  /** Delay in ms, used for staggered groups such as the hero. */
  readonly revealDelay = input(0);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (this.motion.reduced()) return;

      // Already on screen at first render (hero): start before the first paint, no flash.
      const rect = this.host.nativeElement.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        this.play();
        return;
      }
      if (typeof IntersectionObserver !== 'function') return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          observer.disconnect();
          this.play();
        },
        { threshold: 0.12 },
      );
      observer.observe(this.host.nativeElement);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  private play(): void {
    const style = this.appReveal() || 'rise';
    this.motion.animate(this.host.nativeElement, KEYFRAMES[style], {
      duration: style === 'window' ? 850 : 650,
      delay: this.revealDelay(),
    });
  }
}
