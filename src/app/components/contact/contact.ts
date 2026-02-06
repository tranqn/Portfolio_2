import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ContactForm } from '../../shared/models';
import { ContactService } from '../../shared/services/contact.service';
import { CtaButton } from '../../shared/components/cta-button/cta-button';
import { IMAGE_PATHS } from '../../shared/constants';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, RouterLink, TranslateModule, CtaButton],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private readonly contactService = inject(ContactService);

  protected readonly underlinePath = IMAGE_PATHS.CONTACT.UNDERLINE;
  protected readonly checkPath = IMAGE_PATHS.SHARED.CHECK;
  protected readonly isSubmitting = signal(false);
  protected readonly submitSuccess = signal(false);

  protected formData: ContactForm = {
    name: '',
    email: '',
    message: '',
  };

  protected privacyAccepted = false;

  onSubmit(form: NgForm): void {
    if (!form.valid || this.isSubmitting()) {
      return;
    }
    this.isSubmitting.set(true);
    this.contactService.submitContactForm(this.formData).subscribe({
      next: () => {
        this.submitSuccess.set(true);
        form.resetForm();
        this.privacyAccepted = false;
      },
      complete: () => this.isSubmitting.set(false),
    });
  }
}
