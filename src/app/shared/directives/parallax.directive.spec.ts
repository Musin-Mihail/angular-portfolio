import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ParallaxDirective } from './parallax.directive';

let intersectionCallback: IntersectionObserverCallback;
const observeSpy = vi.fn();
const disconnectSpy = vi.fn();

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: readonly number[] = [];

  constructor(callback: IntersectionObserverCallback) {
    intersectionCallback = callback;
  }

  observe = observeSpy;
  disconnect = disconnectSpy;
  takeRecords = vi.fn();
  unobserve = vi.fn();
}

@Component({
  standalone: true,
  imports: [ParallaxDirective],
  template: `
    <div appParallax parallaxImage="test.jpg" style="height: 200px; position: relative;">
      <div class="parallax-bg"></div>
    </div>
  `,
})
class TestHostComponent {}

@Component({
  standalone: true,
  imports: [ParallaxDirective],
  template: `
    <div appParallax parallaxImage="test.jpg" style="height: 200px; position: relative;"></div>
  `,
})
class TestHostNoBgComponent {}

describe('ParallaxDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directiveElement: HTMLElement;
  let parallaxBgElement: HTMLElement;

  beforeEach(async () => {
    observeSpy.mockClear();
    disconnectSpy.mockClear();

    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      configurable: true,
      value: MockIntersectionObserver,
    });

    await TestBed.configureTestingModule({
      imports: [TestHostComponent, TestHostNoBgComponent, ParallaxDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    const directiveDebugEl = fixture.debugElement.query(By.directive(ParallaxDirective));
    directiveElement = directiveDebugEl.nativeElement;
    parallaxBgElement = directiveElement.querySelector('.parallax-bg') as HTMLElement;

    vi.spyOn(window, 'addEventListener');
    vi.spyOn(window, 'removeEventListener');

    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should set the background image on init', () => {
    expect(parallaxBgElement.style.backgroundImage).toContain('test.jpg');
  });

  it('should create and observe an element on view init', () => {
    expect(observeSpy).toHaveBeenCalledWith(directiveElement);
  });

  it('should add scroll listener when element becomes visible', () => {
    intersectionCallback(
      [{ isIntersecting: true }] as IntersectionObserverEntry[],
      {} as IntersectionObserver
    );
    expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('should remove scroll listener when element becomes hidden', () => {
    intersectionCallback(
      [{ isIntersecting: true }] as IntersectionObserverEntry[],
      {} as IntersectionObserver
    );
    intersectionCallback(
      [{ isIntersecting: false }] as IntersectionObserverEntry[],
      {} as IntersectionObserver
    );
    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('should clean up observer and listeners on destroy', () => {
    fixture.destroy();
    expect(disconnectSpy).toHaveBeenCalled();
    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });
});

describe('ParallaxDirective without required element', () => {
  it('should not throw an error if .parallax-bg is missing', () => {
    const fixtureNoBg = TestBed.createComponent(TestHostNoBgComponent);
    expect(() => fixtureNoBg.detectChanges()).not.toThrow();
  });
});
