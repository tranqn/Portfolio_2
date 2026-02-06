import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-cta-button',
  imports: [RouterLink, TranslateModule],
  templateUrl: './cta-button.html',
  styleUrl: './cta-button.scss',
})
export class CtaButton {
  readonly translateKey = input.required<string>();
  readonly href = input<string>('');
  readonly fragment = input<string>('');
  readonly type = input<'link' | 'submit'>('link');
  readonly variant = input<'dark' | 'light'>('dark');
  readonly disabled = input<boolean>(false);
  readonly buttonClick = output<void>();
}
