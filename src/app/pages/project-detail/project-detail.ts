import { Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProjectDataService } from '../../shared/services/project-data.service';
import { SeoService } from '../../shared/services/seo.service';
import { CtaButton } from '../../shared/components/cta-button/cta-button';
import { IMAGE_PATHS } from '../../shared/constants';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink, TranslateModule, CtaButton],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly projectDataService = inject(ProjectDataService);
  private readonly seoService = inject(SeoService);
  private readonly translate = inject(TranslateService);

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

  constructor() {
    effect(() => {
      const proj = this.project();
      if (proj) {
        const title = this.translate.instant(proj.title);
        this.seoService.updateTags({ title: `${title} | Quoc Nam Tran` });
      }
    });
  }

  protected nextProjectRoute(): string {
    const next = this.nextProject();
    return next ? `/projects/${next.id}` : '/';
  }
}
