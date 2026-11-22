import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslationService } from '../services/translation.service';

/**
 * `'/legal-notice' | localize` → `/legal-notice` or `/en/legal-notice`.
 * Impure because the header and footer live outside the router outlet and
 * must follow a language switch without being recreated.
 */
@Pipe({ name: 'localize', pure: false })
export class LocalizePipe implements PipeTransform {
  private readonly language = inject(TranslationService);

  transform(path: string): string {
    return this.language.localize(path);
  }
}
