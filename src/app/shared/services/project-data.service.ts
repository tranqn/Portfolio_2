import { computed, Injectable, signal } from '@angular/core';
import { Project } from '../models';
import { IMAGE_PATHS } from '../constants';

@Injectable({
  providedIn: 'root',
})
/**
 * In-memory store for all portfolio projects.
 *
 * Projects are defined as a signal-based list so computed views
 * (e.g. filtered lists, single lookups) remain reactive.
 */
export class ProjectDataService {
  private readonly projects = signal<Project[]>([
    {
      id: 'join',
      title: 'PROJECTS.JOIN.TITLE',
      description: 'PROJECTS.JOIN.DESCRIPTION',
      implementationDetails: 'PROJECTS.JOIN.IMPLEMENTATION',
      techStack: [
        { name: 'CSS', icon: IMAGE_PATHS.SKILLS.CSS },
        { name: 'HTML', icon: IMAGE_PATHS.SKILLS.HTML },
        { name: 'Firebase', icon: IMAGE_PATHS.SKILLS.FIREBASE },
        { name: 'JavaScript', icon: IMAGE_PATHS.SKILLS.JAVASCRIPT },
      ],
      image: IMAGE_PATHS.PROJECTS.JOIN,
      featured: true,
      duration: 'PROJECTS.JOIN.DURATION',
      role: 'PROJECTS.JOIN.ROLE',
      githubUrl: 'https://github.com/tranqn/join',
      liveUrl: 'https://join.quocnamtran.com',
      nextProjectId: 'pollo-loco',
    },
    {
      id: 'pollo-loco',
      title: 'PROJECTS.POLLO.TITLE',
      description: 'PROJECTS.POLLO.DESCRIPTION',
      implementationDetails: 'PROJECTS.POLLO.IMPLEMENTATION',
      techStack: [
        { name: 'CSS', icon: IMAGE_PATHS.SKILLS.CSS },
        { name: 'HTML', icon: IMAGE_PATHS.SKILLS.HTML },
        { name: 'JavaScript', icon: IMAGE_PATHS.SKILLS.JAVASCRIPT },
      ],
      image: IMAGE_PATHS.PROJECTS.POLLO_LOCO,
      featured: false,
      duration: 'PROJECTS.POLLO.DURATION',
      role: 'PROJECTS.POLLO.ROLE',
      githubUrl: 'https://github.com/tranqn/Pollo_Loco',
      liveUrl: 'https://pollo-loco.quocnamtran.com',
      nextProjectId: 'pokedex',
    },
    {
      id: 'pokedex',
      title: 'PROJECTS.POKEDEX.TITLE',
      description: 'PROJECTS.POKEDEX.DESCRIPTION',
      implementationDetails: 'PROJECTS.POKEDEX.IMPLEMENTATION',
      techStack: [
        { name: 'CSS', icon: IMAGE_PATHS.SKILLS.CSS },
        { name: 'HTML', icon: IMAGE_PATHS.SKILLS.HTML },
        { name: 'JavaScript', icon: IMAGE_PATHS.SKILLS.JAVASCRIPT },
      ],
      image: IMAGE_PATHS.PROJECTS.POKEDEX,
      featured: false,
      duration: 'PROJECTS.POKEDEX.DURATION',
      role: 'PROJECTS.POKEDEX.ROLE',
      githubUrl: 'https://github.com/tranqn/Pokedex',
      liveUrl: 'https://pokedex.quocnamtran.com',
      nextProjectId: 'join',
    },
  ]);

  /** Read-only computed signal exposing every project. */
  readonly allProjects = computed(() => this.projects());

  /** Finds a project by its URL slug. Returns `undefined` if not found. */
  getProjectById(id: string): Project | undefined {
    return this.projects().find((p) => p.id === id);
  }
}
