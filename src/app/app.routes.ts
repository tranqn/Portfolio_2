import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/main/main').then((m) => m.Main),
  },
  {
    path: 'legal-notice',
    loadComponent: () =>
      import('./pages/legal-notice/legal-notice').then((m) => m.LegalNotice),
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy').then((m) => m.PrivacyPolicy),
  },
  {
    path: 'projects/:projectId',
    loadComponent: () =>
      import('./pages/project-detail/project-detail').then((m) => m.ProjectDetail),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
