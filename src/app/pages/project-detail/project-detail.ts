import { Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { ProjectDataService } from '../../shared/services/project-data.service';
import { SeoService } from '../../shared/services/seo.service';
import { MacWindow } from '../../shared/components/mac-window/mac-window';
import { ProjectMedia } from '../../shared/components/project-media/project-media';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink, TranslateModule, MacWindow, ProjectMedia],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
/**
 * Full-page project detail view reached via `/projects/:projectId`.
 *
 * Resolves the project from the route param, displays description,
 * tech stack, implementation details, and external links. Provides
 * circular "next project" navigation via {@link nextProject}.
 * Updates SEO tags reactively whenever the project changes.
 */
export class ProjectDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly projectDataService = inject(ProjectDataService);
  private readonly seoService = inject(SeoService);
  private readonly translate = inject(TranslateService);

  /** Reactive project slug extracted from the `:projectId` route param. */
  private readonly projectId = toSignal(
    this.route.paramMap.pipe(map((params) => params.get('projectId') ?? '')),
  );

  /** The current project resolved from the route param, or `undefined` if invalid. */
  protected readonly project = computed(() => {
    const id = this.projectId();
    return id ? this.projectDataService.getProjectById(id) : undefined;
  });

  /** The next project in the circular chain, used for "Next project" navigation. */
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

  /** Builds the router path for the next project, falling back to home. */
  protected nextProjectRoute(): string {
    const next = this.nextProject();
    return next ? `/projects/${next.id}` : '/';
  }
}
