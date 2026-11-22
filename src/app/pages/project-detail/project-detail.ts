import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { takeUntilDestroyed, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { ProjectDataService } from '../../shared/services/project-data.service';
import { SeoService, SITE_NAME } from '../../shared/services/seo.service';
import { ShowcaseService } from '../../shared/services/showcase.service';
import { MacWindow } from '../../shared/components/mac-window/mac-window';
import { ProjectMedia } from '../../shared/components/project-media/project-media';
import { Sweep } from '../../shared/directives/sweep.directive';

@Component({
  selector: 'app-project-detail',
  imports: [RouterLink, TranslateModule, MacWindow, ProjectMedia, Sweep],
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
  private readonly showcase = inject(ShowcaseService);

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
    // stream() waits for the translation file and follows language changes,
    // so the title never shows a raw key (instant() did on direct hits).
    toObservable(this.project)
      .pipe(
        switchMap((proj) => {
          if (!proj) {
            // Unknown id: never keep the previous project's tags.
            const path = `/projects/${this.projectId() ?? ''}`;
            return this.translate
              .stream(['NOT_FOUND.TITLE', 'NOT_FOUND.TEXT'])
              .pipe(map((t: Record<string, string>) => ({ path, title: t['NOT_FOUND.TITLE'], description: t['NOT_FOUND.TEXT'] })));
          }
          const showcaseKey = this.showcase.allItems().find((item) => item.projectId === proj.id)?.i18nKey;
          const descriptionKey = showcaseKey ? `${showcaseKey}.SUMMARY` : proj.description;
          return this.translate
            .stream([proj.title, descriptionKey])
            .pipe(
              map((t: Record<string, string>) => ({
                path: `/projects/${proj.id}`,
                title: t[proj.title],
                description: t[descriptionKey],
              })),
            );
        }),
        takeUntilDestroyed(),
      )
      .subscribe(({ path, title, description }) =>
        this.seoService.setPage({ title: `${title} | ${SITE_NAME}`, description, path }),
      );
  }

  /** Builds the router path for the next project, falling back to home. */
  protected nextProjectRoute(): string {
    const next = this.nextProject();
    return next ? `/projects/${next.id}` : '/';
  }
}
