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
      id: 'videoflix',
      title: 'PROJECTS.VIDEOFLIX.TITLE',
      description: 'PROJECTS.VIDEOFLIX.DESCRIPTION',
      implementationDetails: 'PROJECTS.VIDEOFLIX.IMPLEMENTATION',
      techStack: [
        { name: 'Python', icon: IMAGE_PATHS.SKILLS.PYTHON },
        { name: 'Django', icon: IMAGE_PATHS.SKILLS.DJANGO },
        { name: 'Redis', icon: IMAGE_PATHS.SKILLS.REDIS },
        { name: 'Docker', icon: IMAGE_PATHS.SKILLS.DOCKER },
      ],
      image: IMAGE_PATHS.PROJECTS.VIDEOFLIX,
      featured: false,
      duration: 'PROJECTS.VIDEOFLIX.DURATION',
      role: 'PROJECTS.VIDEOFLIX.ROLE',
      githubUrl: 'https://github.com/tranqn/videoflix',
      liveUrl: 'https://videoflix.quocnamtran.com',
      nextProjectId: 'coderr',
    },
    {
      id: 'coderr',
      title: 'PROJECTS.CODERR.TITLE',
      description: 'PROJECTS.CODERR.DESCRIPTION',
      implementationDetails: 'PROJECTS.CODERR.IMPLEMENTATION',
      techStack: [
        { name: 'Python', icon: IMAGE_PATHS.SKILLS.PYTHON },
        { name: 'Django', icon: IMAGE_PATHS.SKILLS.DJANGO },
        { name: 'REST-API', icon: IMAGE_PATHS.SKILLS.REST_API },
        { name: 'Docker', icon: IMAGE_PATHS.SKILLS.DOCKER },
      ],
      image: IMAGE_PATHS.PROJECTS.CODERR,
      featured: false,
      duration: 'PROJECTS.CODERR.DURATION',
      role: 'PROJECTS.CODERR.ROLE',
      githubUrl: 'https://github.com/tranqn/coderr',
      liveUrl: 'https://coderr.quocnamtran.com',
      nextProjectId: 'quizly',
    },
    {
      id: 'quizly',
      title: 'PROJECTS.QUIZLY.TITLE',
      description: 'PROJECTS.QUIZLY.DESCRIPTION',
      implementationDetails: 'PROJECTS.QUIZLY.IMPLEMENTATION',
      techStack: [
        { name: 'Python', icon: IMAGE_PATHS.SKILLS.PYTHON },
        { name: 'Django', icon: IMAGE_PATHS.SKILLS.DJANGO },
        { name: 'REST-API', icon: IMAGE_PATHS.SKILLS.REST_API },
        { name: 'Docker', icon: IMAGE_PATHS.SKILLS.DOCKER },
      ],
      image: IMAGE_PATHS.PROJECTS.QUIZLY,
      featured: false,
      duration: 'PROJECTS.QUIZLY.DURATION',
      role: 'PROJECTS.QUIZLY.ROLE',
      githubUrl: 'https://github.com/tranqn/quizly',
      liveUrl: 'https://quizly.quocnamtran.com',
      nextProjectId: 'join',
    },
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
        { name: 'Next.js', icon: IMAGE_PATHS.SKILLS.NEXTJS },
        { name: 'React', icon: IMAGE_PATHS.SKILLS.REACT },
        { name: 'TypeScript', icon: IMAGE_PATHS.SKILLS.TYPESCRIPT },
        { name: 'Tailwind CSS', icon: IMAGE_PATHS.SKILLS.TAILWIND },
        { name: 'Three.js', icon: IMAGE_PATHS.SKILLS.THREEJS },
      ],
      image: IMAGE_PATHS.PROJECTS.POKEDEX,
      featured: false,
      duration: 'PROJECTS.POKEDEX.DURATION',
      role: 'PROJECTS.POKEDEX.ROLE',
      githubUrl: 'https://github.com/tranqn/pokedex-holo-tcg',
      liveUrl: 'https://pokedex.quocnamtran.com',
      nextProjectId: 'videoflix',
    },
  ]);

  /** Read-only computed signal exposing every project. */
  readonly allProjects = computed(() => this.projects());

  /** Finds a project by its URL slug. Returns `undefined` if not found. */
  getProjectById(id: string): Project | undefined {
    return this.projects().find((p) => p.id === id);
  }
}
