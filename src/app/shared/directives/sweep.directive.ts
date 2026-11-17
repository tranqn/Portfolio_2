import { afterNextRender, DestroyRef, Directive, ElementRef, inject, input } from '@angular/core';
import { MotionService } from '../services/motion.service';

/** The colour band runs from the right edge of the gradient to its left edge. */
const KEYFRAMES: Keyframe[] = [
  { backgroundPosition: '100% 0', filter: 'blur(2px)' },
  { backgroundPosition: '0 0', filter: 'blur(0)' },
];

@Directive({
  selector: '[appSweep]',
  host: { class: 'sweep' },
})
/**
 * Writes a heading in from left to right with a band of colour on its leading
 * edge, the first time it scrolls into view.
 *
 * The gradient itself lives in the global `.sweep` class (src/styles.scss).
 * Its resting position shows the final text colour, so the text stays fully
 * visible without JavaScript, without IntersectionObserver and with reduced
 * motion: the directive only adds a one-off Web Animation.
 */
export class Sweep {
  /** Delay in ms, used to stagger lines such as the hero headline. */
  readonly sweepDelay = input(0);

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly motion = inject(MotionService);

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (this.motion.reduced()) return;

      // Already on screen at first render (hero, page titles): start right away.
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
        { threshold: 0.6 },
      );
      observer.observe(this.host.nativeElement);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  private play(): void {
    this.motion.animate(this.host.nativeElement, KEYFRAMES, {
      duration: 1100,
      easing: 'ease-in-out',
      delay: this.sweepDelay(),
    });
  }
}
