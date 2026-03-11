import { computed, Injectable, signal } from '@angular/core';
import { Colleague } from '../models';

/**
 * In-memory store for colleague testimonials.
 *
 * Mirrors the {@link ProjectDataService} pattern so all domain data
 * is managed consistently through injectable services.
 */
@Injectable({
  providedIn: 'root',
})
export class ColleagueDataService {
  private readonly colleagues = signal<Colleague[]>([
    {
      name: 'Christian Hajduk',
      positionKey: 'COLLEAGUES.CHRISTIAN.POSITION',
      textKey: 'COLLEAGUES.CHRISTIAN.TEXT',
      linkedInUrl: 'https://www.linkedin.com/in/christian-hajduk/',
    },
    {
      name: 'Daniel Kersten',
      positionKey: 'COLLEAGUES.DANIEL.POSITION',
      textKey: 'COLLEAGUES.DANIEL.TEXT',
      linkedInUrl: 'https://www.linkedin.com/in/kersten-daniel/',
    },
    {
      name: 'Paul',
      positionKey: 'COLLEAGUES.PAUL.POSITION',
      textKey: 'COLLEAGUES.PAUL.TEXT',
      linkedInUrl: 'https://www.linkedin.com/in/paul-angeles-chaquire/',
    },
  ]);

  /** Read-only computed signal exposing every colleague testimonial. */
  readonly allColleagues = computed(() => this.colleagues());
}
