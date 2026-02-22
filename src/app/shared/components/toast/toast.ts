import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [TranslateModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
/**
 * Renders the stack of toast notifications managed by {@link ToastService}.
 *
 * Placed once in the root `app.html` template. Each toast auto-dismisses
 * after 5 seconds and supports success/error variants.
 */
export class Toast {
  protected readonly toastService = inject(ToastService);
}
