import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Card3dDirective } from './card-3d.directive';
import { vi } from 'vitest';

@Component({
  standalone: true,
  imports: [Card3dDirective],
  template: `<div appCard3d [appCard3dIntensity]="20" style="width: 200px; height: 100px;"></div>`,
})
class TestHostComponent {}

describe('Card3dDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let elementWithDirective: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    const directiveEl = fixture.debugElement.query(By.directive(Card3dDirective));
    elementWithDirective = directiveEl.nativeElement;

    vi.spyOn(elementWithDirective, 'getBoundingClientRect').mockReturnValue({
      width: 200,
      height: 100,
      top: 0,
      left: 0,
      right: 200,
      bottom: 100,
      x: 0,
      y: 0,
      toJSON: () => ({}),
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should apply transform on mousemove', () => {
    const rect = elementWithDirective.getBoundingClientRect();
    const mockMouseEvent = new MouseEvent('mousemove', {
      clientX: rect.left + 100,
      clientY: rect.top + 50,
    });
    elementWithDirective.dispatchEvent(mockMouseEvent);
    fixture.detectChanges();

    expect(elementWithDirective.style.transform).toBe(
      'rotateX(0deg) rotateY(0deg) scale3d(1.05, 1.05, 1.05)'
    );
  });

  it('should reset transform on mouseleave', () => {
    elementWithDirective.dispatchEvent(new MouseEvent('mousemove'));
    fixture.detectChanges();

    elementWithDirective.dispatchEvent(new MouseEvent('mouseleave'));
    fixture.detectChanges();

    expect(elementWithDirective.style.transform).toBe(
      'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    );
  });
});
