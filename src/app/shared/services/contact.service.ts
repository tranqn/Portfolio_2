import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, map, catchError } from 'rxjs';
import { ContactForm } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly platformId = inject(PLATFORM_ID);

  submitContactForm(formData: ContactForm): Observable<boolean> {
    if (!isPlatformBrowser(this.platformId)) {
      return of(false);
    }
    return this.http.post('/api/contact', formData).pipe(
      map(() => true),
      catchError(() => of(false)),
    );
  }
}
