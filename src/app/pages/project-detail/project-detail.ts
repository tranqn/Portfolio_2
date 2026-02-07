import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { ProjectDataService } from '../../shared/services/project-data.service';
import { CtaButton } from '../../shared/components/cta-button/cta-button';
import { IMAGE_PATHS } from '../../shared/constants';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink, TranslateModule, Header, Footer, CtaButton],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly projectDataService = inject(ProjectDataService);

  protected readonly breadcrumbArrow = IMAGE_PATHS.PROJECT_PAGES.BREADCRUMB_ARROW;
  protected readonly nextArrow = IMAGE_PATHS.PROJECT_PAGES.NEXT_PROJECT_ARROW;
  protected readonly featuredIcon = IMAGE_PATHS.SHARED.FEATURED;

  private readonly projectId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('projectId') ?? '')),
  );

  protected readonly project = computed(() => {
    const id = this.projectId();
    return id ? this.projectDataService.getProjectById(id) : undefined;
  });

  protected readonly nextProject = computed(() => {
    const current = this.project();
    if (!current?.nextProjectId) return undefined;
    return this.projectDataService.getProjectById(current.nextProjectId);
  });

  protected nextProjectRoute(): string {
    const next = this.nextProject();
    return next ? `/projects/${next.id}` : '/';
  }
}
