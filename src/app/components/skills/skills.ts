import { Component, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IMAGE_PATHS } from '../../shared/constants';

interface SkillItem {
  icon: string;
  name: string;
}

@Component({
  selector: 'app-skills',
  imports: [TranslateModule],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  protected readonly isPeeled = signal(false);
  protected readonly images = IMAGE_PATHS.SKILLS;

  protected readonly skills: SkillItem[] = [
    { icon: this.images.HTML, name: 'HTML' },
    { icon: this.images.CSS, name: 'CSS' },
    { icon: this.images.JAVASCRIPT, name: 'JavaScript' },
    { icon: this.images.TYPESCRIPT, name: 'TypeScript' },
    { icon: this.images.ANGULAR, name: 'Angular' },
    { icon: this.images.FIREBASE, name: 'Firebase' },
    { icon: this.images.GIT, name: 'Git' },
    { icon: this.images.REST_API, name: 'REST-API' },
    { icon: this.images.SCRUM, name: 'Scrum' },
    { icon: this.images.MATERIAL_DESIGN, name: 'Material Design' },
  ];

  toggleBadge(): void {
    this.isPeeled.update((v) => !v);
  }
}
