import {
  afterNextRender,
  afterRenderEffect,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectMediaAsset } from '../../models';
import { MotionService } from '../../services/motion.service';

/** Playback wish: follow the motion setting, or what the visitor chose explicitly. */
type PlaybackChoice = 'auto' | 'paused' | 'playing';

@Component({
  selector: 'app-project-media',
  imports: [TranslateModule],
  templateUrl: './project-media.html',
  styleUrl: './project-media.scss',
})
/**
 * Plays a project recording (MP4 converted from the original GIF) with a poster.
 *
 * - Nothing is downloaded before the media is near the viewport (`preload="none"`).
 * - It plays only while visible, and only automatically when motion is allowed.
 * - With reduced motion the poster stays until the visitor presses play.
 * - A visible pause/play button is always available.
 */
export class ProjectMedia {
  readonly media = input.required<ProjectMediaAsset>();
  /** Accessible description of what the recording shows. */
  readonly label = input.required<string>();
  /** `contain` keeps the whole frame inside a fixed stage (no cropping). */
  readonly fit = input<'natural' | 'contain'>('natural');

  private readonly motion = inject(MotionService);
  private readonly video = viewChild.required<ElementRef<HTMLVideoElement>>('video');

  private readonly visible = signal(false);
  private readonly choice = signal<PlaybackChoice>('auto');
  protected readonly playing = signal(false);

  private readonly shouldPlay = computed(() => {
    if (!this.visible()) return false;
    const choice = this.choice();
    return choice === 'playing' || (choice === 'auto' && !this.motion.reduced());
  });

  constructor() {
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      const element = this.video().nativeElement;
      element.muted = true;
      if (typeof IntersectionObserver !== 'function') {
        this.visible.set(true);
        return;
      }
      const observer = new IntersectionObserver(
        ([entry]) => this.visible.set(entry.isIntersecting),
        { threshold: 0.25 },
      );
      observer.observe(element);
      destroyRef.onDestroy(() => observer.disconnect());
    });

    // After render, not in a plain effect: a plain effect runs before the new [src] is
    // bound, so switching projects would start the old source and leave the new one paused.
    afterRenderEffect(() => {
      this.media();
      const play = this.shouldPlay();
      const element = this.video().nativeElement;
      if (play) {
        element.play().catch(() => this.playing.set(false));
      } else {
        element.pause();
      }
    });
  }

  /** Visitor toggles playback explicitly; this overrides the automatic behaviour. */
  protected toggle(): void {
    this.choice.set(this.playing() ? 'paused' : 'playing');
  }
}
