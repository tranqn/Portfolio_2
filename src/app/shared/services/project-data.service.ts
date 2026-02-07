import { computed, Injectable, signal } from '@angular/core';
import { Project } from '../models';
import { IMAGE_PATHS } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class ProjectDataService {
  private readonly projects = signal<Project[]>([
    {
      id: 'join',
      title: 'Join',
      description:
        'Task manager inspired by the Kanban System. Create and organize tasks using drag and drop functions, assign users and categories.',
      implementationDetails:
        'As the sole developer, I was responsible for the Frontend, designing and implementing user interactions, and ensuring responsiveness to work independently at every stage of the development process.',
      techStack: [
        { name: 'CSS', icon: IMAGE_PATHS.SKILLS.CSS },
        { name: 'HTML', icon: IMAGE_PATHS.SKILLS.HTML },
        { name: 'Firebase', icon: IMAGE_PATHS.SKILLS.FIREBASE },
        { name: 'JavaScript', icon: IMAGE_PATHS.SKILLS.JAVASCRIPT },
      ],
      image: IMAGE_PATHS.PROJECTS.JOIN,
      featured: true,
      duration: '5 weeks',
      role: 'Team Project',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      nextProjectId: 'pollo-loco',
    },
    {
      id: 'pollo-loco',
      title: 'El Pollo Loco',
      description:
        'A simple Jump-and-Run game based on an object-oriented approach. Help Pepe to find coins and salsa bottles to fight against the crazy hen.',
      implementationDetails:
        'Built entirely from scratch using vanilla JavaScript and object-oriented programming. Implemented game physics, collision detection, and sprite animations while managing game state and user input.',
      techStack: [
        { name: 'CSS', icon: IMAGE_PATHS.SKILLS.CSS },
        { name: 'HTML', icon: IMAGE_PATHS.SKILLS.HTML },
        { name: 'JavaScript', icon: IMAGE_PATHS.SKILLS.JAVASCRIPT },
      ],
      image: IMAGE_PATHS.PROJECTS.POLLO_LOCO,
      featured: false,
      duration: '4 weeks',
      role: 'Solo Project',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      nextProjectId: 'dabubble',
    },
    {
      id: 'dabubble',
      title: 'DABubble',
      description:
        'This App is a Slack Clone App. It revolutionizes team communication and collaboration with its intuitive interface, real-time messaging, and robust channel organization.',
      implementationDetails:
        'Developed the frontend with Angular and TypeScript, implementing real-time messaging with Firebase, channel management, and responsive design using Material Design components.',
      techStack: [
        { name: 'CSS', icon: IMAGE_PATHS.SKILLS.CSS },
        { name: 'HTML', icon: IMAGE_PATHS.SKILLS.HTML },
        { name: 'Firebase', icon: IMAGE_PATHS.SKILLS.FIREBASE },
        { name: 'Angular', icon: IMAGE_PATHS.SKILLS.ANGULAR },
        { name: 'TypeScript', icon: IMAGE_PATHS.SKILLS.TYPESCRIPT },
        { name: 'Material Design', icon: IMAGE_PATHS.SKILLS.MATERIAL_DESIGN },
      ],
      image: IMAGE_PATHS.PROJECTS.DABUBBLE,
      featured: false,
      duration: '8 weeks',
      role: 'Team Project',
      githubUrl: 'https://github.com',
      liveUrl: 'https://example.com',
      nextProjectId: 'join',
    },
  ]);

  readonly allProjects = computed(() => this.projects());

  getProjectById(id: string): Project | undefined {
    return this.projects().find((p) => p.id === id);
  }
}
