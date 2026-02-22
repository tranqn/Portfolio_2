import { Routes } from '@angular/router';

/**
 * Top-level route definitions.
 *
 * All page components are lazy-loaded. Route `data` drives header/footer
 * behavior (theme, visibility, project styling).
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/main/main').then((m) => m.Main),
  },
  {
    path: 'legal-notice',
    loadComponent: () =>
      import('./pages/legal-notice/legal-notice').then((m) => m.LegalNotice),
    data: { footerTheme: 'light' },
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy').then((m) => m.PrivacyPolicy),
    data: { footerTheme: 'light' },
  },
  {
    path: 'projects/:projectId',
    loadComponent: () =>
      import('./pages/project-detail/project-detail').then((m) => m.ProjectDetail),
    data: { headerProject: true, headerContact: true, hideFooter: true },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
