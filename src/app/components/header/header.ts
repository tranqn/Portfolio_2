import { DOCUMENT } from '@angular/common';
import { Component, inject, Renderer2, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { SocialLinks } from '../../shared/components/social-links/social-links';
import { TranslationService } from '../../shared/services/translation.service';
import { IMAGE_PATHS } from '../../shared/constants';

@Component({
  selector: 'app-header',
  imports: [RouterLink, TranslateModule, SocialLinks],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly translationService = inject(TranslationService);
  protected readonly menuOpen = signal(false);
  protected readonly logoPath = IMAGE_PATHS.LOGO;

  private readonly renderer = inject(Renderer2);
  private readonly document = inject(DOCUMENT);

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
}
