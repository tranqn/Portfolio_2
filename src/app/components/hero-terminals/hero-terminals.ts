import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MacWindow } from '../../shared/components/mac-window/mac-window';

@Component({
  selector: 'app-hero-terminals',
  imports: [TranslateModule, MacWindow],
  templateUrl: './hero-terminals.html',
  styleUrl: './hero-terminals.scss',
})
/**
 * macOS terminal window with two panes on the same liquid glass stage as
 * the project showcase: Claude Code and Codex work through a larger project
 * (StadtPuls live updates) together. Claude implements, Codex reviews, a
 * finding goes back and forth, and a shared plan strip shows the progress.
 * Purely illustrative, exposed to assistive technology as one image with
 * a describing label.
 *
 * The lines play in once via CSS delays. Every line is visible in its
 * resting state, so with reduced motion (OS setting or footer toggle, both
 * of which switch animations off globally) the final frame shows at once.
 */
export class HeroTerminals {}
