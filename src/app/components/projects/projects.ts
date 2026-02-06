import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectCard } from '../../shared/components/project-card/project-card';
import { ProjectDataService } from '../../shared/services/project-data.service';
import { IMAGE_PATHS } from '../../shared/constants';

@Component({
  selector: 'app-projects',
  imports: [TranslateModule, ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  protected readonly projectDataService = inject(ProjectDataService);
  protected readonly underlinePath = IMAGE_PATHS.PROJECTS.UNDERLINE;
}
