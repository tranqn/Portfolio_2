import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Language, TranslationService } from '../services/translation.service';

/**
 * Activates the route's language and waits for its translation file. The
 * router (and therefore prerendering) waits for this, so no page renders with
 * raw i18n keys.
 */
export const languageResolver: ResolveFn<unknown> = (route) =>
  inject(TranslationService).use(route.data['lang'] as Language);
