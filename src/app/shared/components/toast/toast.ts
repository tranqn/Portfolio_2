import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [TranslateModule],
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast {
  protected readonly toastService = inject(ToastService);
}
