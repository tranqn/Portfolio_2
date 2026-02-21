import { DOCUMENT } from '@angular/common';
import { Component, inject, Renderer2, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { filter, map, startWith } from 'rxjs';
import { SocialLinks } from '../../shared/components/social-links/social-links';
import { TranslationService } from '../../shared/services/translation.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, TranslateModule, SocialLinks],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  host: {
    '[class.project]': 'isProject()',
    '[class.contact]': 'isContact()',
  },
})
export class Header {
  protected readonly translationService = inject(TranslationService);
  protected readonly menuOpen = signal(false);

  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly routeChange$ = this.router.events.pipe(
    filter((e): e is NavigationEnd => e instanceof NavigationEnd),
    startWith(null),
  );

  protected readonly isProject = toSignal(
    this.routeChange$.pipe(map(() => !!this.getRouteData('headerProject'))),
    { initialValue: false },
  );

  protected readonly isContact = toSignal(
    this.routeChange$.pipe(map(() => !!this.getRouteData('headerContact'))),
    { initialValue: false },
  );

  toggleMenu(): void {
    const isOpen = !this.menuOpen();
    this.menuOpen.set(isOpen);
    this.toggleBodyScroll(isOpen);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
    this.toggleBodyScroll(false);
  }

  private toggleBodyScroll(lock: boolean): void {
    if (lock) {
      this.renderer.addClass(this.document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(this.document.body, 'no-scroll');
    }
  }

  private getRouteData(key: string): string | undefined {
    let r: ActivatedRoute = this.route;
    while (r.firstChild) r = r.firstChild;
    return r.snapshot.data[key] as string | undefined;
  }
}
