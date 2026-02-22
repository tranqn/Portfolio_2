import { Technology } from './technology.model';

/** Portfolio project displayed in the projects grid and detail pages. */
export interface Project {
  /** URL-friendly slug used as the route parameter (e.g. "join", "dabubble"). */
  id: string;
  /** i18n translation key for the project title. */
  title: string;
  /** i18n translation key for the short project description. */
  description: string;
  /** i18n translation key for detailed implementation notes (detail page only). */
  implementationDetails?: string;
  /** Technologies used in this project. */
  techStack: Technology[];
  /** Path to the project preview image/illustration. */
  image: string;
  /** i18n translation key for development duration. */
  duration?: string;
  /** i18n translation key for the developer's role. */
  role?: string;
  /** Whether this project is highlighted with a "featured" badge. */
  featured?: boolean;
  /** GitHub repository URL. */
  githubUrl?: string;
  /** Live demo URL. */
  liveUrl?: string;
  /** `id` of the next project for circular navigation on the detail page. */
  nextProjectId?: string;
}
