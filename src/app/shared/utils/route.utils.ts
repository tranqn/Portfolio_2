import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, startWith } from 'rxjs';

/**
 * Creates an observable that emits on every `NavigationEnd` event
 * and once immediately on subscription.
 *
 * Used by header and footer to re-evaluate route data after navigation.
 */
export function createRouteChange$(router: Router) {
  return router.events.pipe(
    filter((e): e is NavigationEnd => e instanceof NavigationEnd),
    startWith(null),
  );
}

/**
 * Traverses the `ActivatedRoute` tree to the deepest child
 * and reads a value from its snapshot `data`.
 *
 * @param route - The root `ActivatedRoute` to start traversal from.
 * @param key - The route data key to look up.
 * @returns The value if found, otherwise `undefined`.
 */
export function getNestedRouteData(route: ActivatedRoute, key: string): string | undefined {
  let r = route;
  while (r.firstChild) r = r.firstChild;
  return r.snapshot.data[key] as string | undefined;
}
