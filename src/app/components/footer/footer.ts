import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs';
import { IMAGE_PATHS } from '../../shared/constants';
import { createRouteChange$, getNestedRouteData } from '../../shared/utils/route.utils';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, TranslateModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
  host: {
    '[class.light]': "theme() === 'light'",
    '[class.hidden]': 'hidden()',
  },
})
/**
 * Site-wide footer with contact CTA, social links, legal links, and copyright.
 *
 * Adapts to route data:
 * - `footerTheme: 'light'` — light background for legal pages.
 * - `hideFooter: true` — completely hidden on project-detail pages.
 */
export class Footer {
  protected readonly images = IMAGE_PATHS;

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly routeChange$ = createRouteChange$(this.router);

  /** Active color theme derived from the current route's `footerTheme` data. */
  protected readonly theme = toSignal(
    this.routeChange$.pipe(map(() => getNestedRouteData(this.route, 'footerTheme') ?? 'dark')),
    { initialValue: 'dark' },
  );

  /** `true` when the footer should be completely hidden (project-detail pages). */
  protected readonly hidden = toSignal(
    this.routeChange$.pipe(map(() => !!getNestedRouteData(this.route, 'hideFooter'))),
    { initialValue: false },
  );
}
