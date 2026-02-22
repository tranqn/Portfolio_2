import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cta-button',
  imports: [RouterLink, TranslateModule],
  templateUrl: './cta-button.html',
  styleUrl: './cta-button.scss',
})
/**
 * Reusable call-to-action button supporting both anchor links and form submits.
 *
 * Renders as a `<a>` (internal route or external href) or `<button>` depending
 * on the {@link type} input. Supports dark/light color variants.
 */
export class CtaButton {
  /** i18n key for the button label text. */
  readonly translateKey = input.required<string>();
  /** External URL — used when the CTA points outside the app. */
  readonly href = input<string>('');
  /** Internal Angular route path. */
  readonly route = input<string>('');
  /** Optional fragment appended to the route (e.g. `#contact`). */
  readonly fragment = input<string>('');
  /** Render as a navigational link or a form submit button. */
  readonly type = input<'link' | 'submit'>('link');
  /** Color scheme: `dark` (default) for light backgrounds, `light` for dark backgrounds. */
  readonly variant = input<'dark' | 'light'>('dark');
  /** Disables the button (grayed-out, no pointer events). */
  readonly disabled = input<boolean>(false);
  /** Emitted on click when {@link type} is `submit`. */
  readonly buttonClick = output<void>();
}
