import { Routes } from '@angular/router';
import { languageResolver } from './shared/utils/language.resolver';

/** Pages shared by both languages; all lazy-loaded. */
const pages: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/main/main').then((m) => m.Main),
  },
  {
    path: 'legal-notice',
    loadComponent: () => import('./pages/legal-notice/legal-notice').then((m) => m.LegalNotice),
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
    path: '404',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
  },
];

/**
 * German on the root, English under `/en`. The URL decides the language;
 * the resolver activates it and waits for the translations before rendering.
 */
export const routes: Routes = [
  { path: 'en', data: { lang: 'en' }, resolve: { i18n: languageResolver }, children: pages },
  { path: '', data: { lang: 'de' }, resolve: { i18n: languageResolver }, children: pages },
];
