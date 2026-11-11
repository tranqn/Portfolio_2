import { Component, input } from '@angular/core';

@Component({
  selector: 'app-mac-window',
  templateUrl: './mac-window.html',
  styleUrl: './mac-window.scss',
  host: {
    '[class.mac-window--compact]': 'compact()',
  },
})
/**
 * Reusable macOS-style window frame drawn in HTML/CSS around original media.
 *
 * Three decorative traffic-light dots, a narrow (slightly translucent) title
 * bar with the project name and an opaque content area. The frame is never
 * burnt into the media files, so recordings stay untouched.
 */
export class MacWindow {
  /** Text in the title bar, usually the project name. */
  readonly title = input.required<string>();
  /** Smaller title bar for thumbnails. */
  readonly compact = input(false);
}
