import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LocalizePipe } from '../../shared/utils/localize.pipe';
import { MotionService } from '../../shared/services/motion.service';

@Component({
  selector: 'app-footer',
  // The motion switch depends on the visitor's OS setting, which the prerender
  // cannot know; render the footer fresh in the browser instead of hydrating it.
  host: { ngSkipHydration: 'true' },
  imports: [RouterLink, TranslateModule, LocalizePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
/**
 * Site-wide footer: name, legal pages, contact links and the
 * "reduce motion" switch (stored locally, see {@link MotionService}).
 */
export class Footer {
  protected readonly motion = inject(MotionService);
  protected readonly year = new Date().getFullYear();
}
