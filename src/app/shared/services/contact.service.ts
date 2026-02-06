import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ContactForm } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  submitContactForm(formData: ContactForm): Observable<boolean> {
    // TODO: Replace with actual HTTP POST when backend is ready
    return of(true).pipe(delay(1500));
  }
}
