import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { IMAGE_PATHS } from '../../shared/constants';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, TranslateModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly logoPath = IMAGE_PATHS.LOGO;
  protected readonly icons = IMAGE_PATHS.FOOTER;
}
