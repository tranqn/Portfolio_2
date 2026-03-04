import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, catchError } from 'rxjs';
import { ContactForm } from '../models';

@Injectable({
  providedIn: 'root',
})
/**
 * Handles contact-form submissions via POST to `/api/contact`.
 *
 * Returns `Observable<boolean>` — `true` on success, `false` on error.
 */
export class ContactService {
  private readonly http = inject(HttpClient);

  /**
   * Posts the contact form data to the backend API.
   * @param formData - Validated form payload.
   * @returns `true` when the server responds successfully, `false` otherwise.
   */
  submitContactForm(formData: ContactForm): Observable<boolean> {
    return this.http.post('/api/sendMail.php', formData).pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }
}
