import { DOCUMENT } from '@angular/common';
import { Component, inject, Renderer2, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs';
import { SocialLinks } from '../../shared/components/social-links/social-links';
import { TranslationService } from '../../shared/services/translation.service';
import { createRouteChange$, getNestedRouteData } from '../../shared/utils/route.utils';

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
/**
 * Site-wide header with navigation links, language toggle, and responsive burger menu.
 *
 * Applies host classes based on route data:
 * - `.project` — project-detail pages (alternate nav styling)
 * - `.contact` — shows a contact CTA instead of the full nav
 *
 * The burger menu locks body scroll via a `no-scroll` CSS class.
 */
export class Header {
  protected readonly translationService = inject(TranslationService);
  /** Whether the mobile overlay menu is currently open. */
  protected readonly menuOpen = signal(false);

  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly routeChange$ = createRouteChange$(this.router);

  /** `true` when the current route has `headerProject` data (project-detail pages). */
  protected readonly isProject = toSignal(
    this.routeChange$.pipe(map(() => !!getNestedRouteData(this.route, 'headerProject'))),
    { initialValue: false },
  );

  /** `true` when the current route has `headerContact` data. */
  protected readonly isContact = toSignal(
    this.routeChange$.pipe(map(() => !!getNestedRouteData(this.route, 'headerContact'))),
    { initialValue: false },
  );

  /** Opens or closes the mobile overlay menu. */
  toggleMenu(): void {
    const isOpen = !this.menuOpen();
    this.menuOpen.set(isOpen);
    this.toggleBodyScroll(isOpen);
  }

  /** Closes the mobile overlay menu (e.g. on nav-link click). */
  closeMenu(): void {
    this.menuOpen.set(false);
    this.toggleBodyScroll(false);
  }

  /** Adds or removes the `no-scroll` class on `<body>` to prevent background scrolling. */
  private toggleBodyScroll(lock: boolean): void {
    if (lock) {
      this.renderer.addClass(this.document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(this.document.body, 'no-scroll');
    }
  }
}
