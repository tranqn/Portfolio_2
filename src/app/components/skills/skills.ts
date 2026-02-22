import { Component, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IMAGE_PATHS } from '../../shared/constants';
import { SkillDataService } from '../../shared/services/skill-data.service';

@Component({
  selector: 'app-skills',
  imports: [TranslateModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
/**
 * Skills section displaying a grid of technology icons with an interactive
 * "peel" badge animation toggled by {@link toggleBadge}.
 */
export class Skills {
  protected readonly skillDataService = inject(SkillDataService);
  /** Whether the badge sticker is in its "peeled" (revealed) state. */
  protected readonly isPeeled = signal(false);
  protected readonly images = IMAGE_PATHS.SKILLS;

  /** Toggles the badge between default and peeled states. */
  toggleBadge(): void {
    this.isPeeled.update((v) => !v);
  }
}
