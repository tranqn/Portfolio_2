import { Technology } from './technology.model';

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: Technology[];
  image: string;
  duration?: string;
  role?: string;
  featured?: boolean;
  githubUrl?: string;
  liveUrl?: string;
}
