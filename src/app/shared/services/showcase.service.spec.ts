import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ShowcaseService } from './showcase.service';
import { ProjectDataService } from './project-data.service';

describe('ShowcaseService', () => {
  let service: ShowcaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });
    service = TestBed.inject(ShowcaseService);
  });

  it('starts with the first project selected', () => {
    expect(service.selected().id).toBe('praxis');
  });

  it('keeps only the last of several rapid selections', () => {
    service.select('stadtpuls');
    service.select('zyklus');
    service.select('coderr');
    expect(service.selected().id).toBe('coderr');
  });

  it('ignores unknown ids instead of clearing the selection', () => {
    service.select('stadtpuls');
    service.select('does-not-exist');
    expect(service.selected().id).toBe('stadtpuls');
  });

  it('links every showcase entry with a detail page to an existing project', () => {
    const projects = TestBed.inject(ProjectDataService);
    for (const item of service.allItems()) {
      if (item.projectId) {
        expect(projects.getProjectById(item.projectId)).withContext(item.id).toBeDefined();
      }
    }
  });

  it('gives entries without a recording an overview instead', () => {
    const projects = TestBed.inject(ProjectDataService);
    for (const item of service.allItems()) {
      const hasRecording =
        !!item.media || !!(item.projectId && projects.getProjectById(item.projectId)?.media);
      expect(hasRecording || (item.overviewPoints ?? 0) > 0).withContext(item.id).toBeTrue();
    }
  });
});
