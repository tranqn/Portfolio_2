import { computed, Injectable, signal } from '@angular/core';
import { SkillItem } from '../models';
import { IMAGE_PATHS } from '../constants';

/**
 * In-memory store for the developer's skill set.
 *
 * Mirrors the {@link ProjectDataService} pattern so all domain data
 * is managed consistently through injectable services.
 */
@Injectable({
  providedIn: 'root',
})
export class SkillDataService {
  private readonly skills = signal<SkillItem[]>([
    { icon: IMAGE_PATHS.SKILLS.HTML, name: 'HTML' },
    { icon: IMAGE_PATHS.SKILLS.CSS, name: 'CSS' },
    { icon: IMAGE_PATHS.SKILLS.JAVASCRIPT, name: 'JavaScript' },
    { icon: IMAGE_PATHS.SKILLS.TYPESCRIPT, name: 'TypeScript' },
    { icon: IMAGE_PATHS.SKILLS.ANGULAR, name: 'Angular' },
    { icon: IMAGE_PATHS.SKILLS.FIREBASE, name: 'Firebase' },
    { icon: IMAGE_PATHS.SKILLS.GIT, name: 'Git' },
    { icon: IMAGE_PATHS.SKILLS.REST_API, name: 'REST-API' },
    { icon: IMAGE_PATHS.SKILLS.SCRUM, name: 'Scrum' },
    { icon: IMAGE_PATHS.SKILLS.MATERIAL_DESIGN, name: 'Material Design' },
  ]);

  /** Read-only computed signal exposing every skill. */
  readonly allSkills = computed(() => this.skills());
}
