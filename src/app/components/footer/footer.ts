import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MotionService } from '../../shared/services/motion.service';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, TranslateModule],
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
