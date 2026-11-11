import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ContactForm } from '../../shared/models';
import { ContactService } from '../../shared/services/contact.service';
import { ToastService } from '../../shared/services/toast.service';
import { Reveal } from '../../shared/directives/reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, RouterLink, TranslateModule, Reveal],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
/**
 * Contact form section with name/email/message fields and a privacy checkbox.
 *
 * Validates fields on blur only (no live validation). Submits via
 * {@link ContactService} and shows success/error toasts via {@link ToastService}.
 * The submit button is disabled until all fields pass validation and
 * the privacy checkbox is accepted.
 */
export class Contact {
  private readonly contactService = inject(ContactService);
  private readonly toastService = inject(ToastService);

  /** Prevents double-submission while the HTTP request is in-flight. */
  protected readonly isSubmitting = signal(false);

  /** Two-way bound form model reset after successful submission. */
  protected formData: ContactForm = {
    name: '',
    email: '',
    message: '',
  };

  /** Bound to the privacy-policy acceptance checkbox. */
  protected privacyAccepted = false;

  /**
   * Submits the contact form if valid and not already submitting.
   * Shows a toast on success or failure and resets the form on success.
   */
  onSubmit(form: NgForm): void {
    if (!form.valid || this.isSubmitting()) {
      return;
    }
    this.isSubmitting.set(true);
    this.contactService.submitContactForm(this.formData).subscribe({
      next: (success) => {
        if (success) {
          this.toastService.show('CONTACT.SUCCESS_MESSAGE', 'success');
          form.resetForm();
          this.privacyAccepted = false;
        } else {
          this.toastService.show('CONTACT.ERROR_SUBMIT', 'error');
        }
      },
      complete: () => this.isSubmitting.set(false),
    });
  }
}
