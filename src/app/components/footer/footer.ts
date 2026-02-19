import { Component, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { filter, map, startWith } from 'rxjs';
import { IMAGE_PATHS } from '../../shared/constants';

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
export class Footer {
  protected readonly images = IMAGE_PATHS;

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly routeChange$ = this.router.events.pipe(
    filter((e): e is NavigationEnd => e instanceof NavigationEnd),
    startWith(null),
  );

  protected readonly theme = toSignal(
    this.routeChange$.pipe(map(() => this.getRouteData('footerTheme') ?? 'dark')),
    { initialValue: 'dark' },
  );

  protected readonly hidden = toSignal(
    this.routeChange$.pipe(map(() => !!this.getRouteData('hideFooter'))),
    { initialValue: false },
  );

  private getRouteData(key: string): string | undefined {
    let r: ActivatedRoute = this.route;
    while (r.firstChild) r = r.firstChild;
    return r.snapshot.data[key] as string | undefined;
  }
}
