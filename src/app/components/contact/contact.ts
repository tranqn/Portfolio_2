import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ContactForm } from '../../shared/models';
import { ContactService } from '../../shared/services/contact.service';
import { ToastService } from '../../shared/services/toast.service';
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
  private readonly toastService = inject(ToastService);

  protected readonly underlinePath = IMAGE_PATHS.CONTACT.UNDERLINE;
  protected readonly checkPath = IMAGE_PATHS.SHARED.CHECK;
  protected readonly stickerPath = IMAGE_PATHS.CONTACT.STICKER;
  protected readonly logoPath = IMAGE_PATHS.LOGO;
  protected readonly isSubmitting = signal(false);

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
        this.toastService.show('CONTACT.SUCCESS_MESSAGE', 'success');
        form.resetForm();
        this.privacyAccepted = false;
      },
      error: () => {
        this.toastService.show('CONTACT.ERROR_SUBMIT', 'error');
      },
      complete: () => this.isSubmitting.set(false),
    });
  }
}
