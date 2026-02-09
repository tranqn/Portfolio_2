import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Project } from '../../models';
import { CtaButton } from '../cta-button/cta-button';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink, TranslateModule, CtaButton],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  readonly project = input.required<Project>();
}
