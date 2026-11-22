import { inject } from '@angular/core';
import { RenderMode, ServerRoute } from '@angular/ssr';
import { ProjectDataService } from './shared/services/project-data.service';

const projectParams = async () =>
  inject(ProjectDataService)
    .allProjects()
    .map((project) => ({ projectId: project.id }));

/**
 * Everything is prerendered to static HTML (uploaded to IONOS as files).
 * Project pages are enumerated for both languages; `**` covers the other
 * static paths (home, legal pages, 404) in DE and EN.
 */
export const serverRoutes: ServerRoute[] = [
  { path: 'projects/:projectId', renderMode: RenderMode.Prerender, getPrerenderParams: projectParams },
  { path: 'en/projects/:projectId', renderMode: RenderMode.Prerender, getPrerenderParams: projectParams },
  { path: '**', renderMode: RenderMode.Prerender },
];
