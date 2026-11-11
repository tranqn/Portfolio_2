import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { MotionService } from './motion.service';

describe('MotionService', () => {
  beforeEach(() => {
    localStorage.removeItem('portfolio-reduced-motion');
    TestBed.configureTestingModule({ providers: [provideZonelessChangeDetection()] });
  });

  afterEach(() => {
    localStorage.removeItem('portfolio-reduced-motion');
    document.documentElement.classList.remove('motion-reduced');
  });

  it('persists the manual preference and marks <html>', () => {
    const service = TestBed.inject(MotionService);
    service.systemReduced.set(false);
    service.toggleUserPreference();
    TestBed.tick();

    expect(service.reduced()).toBeTrue();
    expect(localStorage.getItem('portfolio-reduced-motion')).toBe('true');
    expect(document.documentElement.classList).toContain('motion-reduced');
  });

  it('restores the stored preference on the next visit', () => {
    localStorage.setItem('portfolio-reduced-motion', 'true');
    const service = TestBed.inject(MotionService);
    expect(service.userReduced()).toBeTrue();
  });

  it('does not animate while motion is reduced', () => {
    const service = TestBed.inject(MotionService);
    service.userReduced.set(true);
    const element = document.createElement('div');
    expect(service.animate(element, [{ opacity: 0 }, { opacity: 1 }])).toBeUndefined();
  });

  it('cancels a running animation when the same element animates again', () => {
    const service = TestBed.inject(MotionService);
    service.systemReduced.set(false);
    service.userReduced.set(false);
    const element = document.createElement('div');
    document.body.append(element);

    const first = service.animate(element, [{ opacity: 0 }, { opacity: 1 }], { duration: 1000 });
    service.animate(element, [{ opacity: 0 }, { opacity: 1 }], { duration: 1000 });

    expect(first?.playState).toBe('idle');
    element.remove();
  });
});
