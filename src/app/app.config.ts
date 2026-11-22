import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
} from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ImportTranslateLoader } from './shared/utils/translate-loader';

import { routes } from './app.routes';

/**
 * Application configuration.
 *
 * Enables zoneless change detection, in-memory anchor scrolling, HTTP via
 * fetch, hydration of the prerendered HTML, and ngx-translate (files loaded as
 * lazy chunks) with German as the default/fallback language.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      // Hydrate only after the language resolver has loaded the translations,
      // so the prerendered header never flashes empty or in the wrong language.
      withEnabledBlockingInitialNavigation(),
    ),
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay()),
    provideTranslateService({
      loader: { provide: TranslateLoader, useClass: ImportTranslateLoader },
      fallbackLang: 'de',
      lang: 'de',
    }),
  ],
};
