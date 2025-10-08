import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TooltipDirective } from './tooltip.directive';

@Component({
  standalone: true,
  imports: [TooltipDirective],
  template: `<span appTooltip="My Tooltip">Hover me</span>`,
})
class TestHostComponent {}

@Component({
  standalone: true,
  imports: [TooltipDirective],
  template: `<span appTooltip="">Hover me</span>`,
})
class TestHostEmptyTooltipComponent {}

describe('TooltipDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let elementWithDirective: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, TestHostEmptyTooltipComponent, TooltipDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    elementWithDirective = fixture.debugElement.query(By.css('span')).nativeElement;
    fixture.detectChanges();
  });

  it('should create tooltip on mouseenter', async () => {
    elementWithDirective.dispatchEvent(new MouseEvent('mouseenter'));
    await fixture.whenStable();
    fixture.detectChanges();

    const tooltip = document.querySelector('.tooltip-content-dynamic');
    expect(tooltip).toBeTruthy();
    expect(tooltip?.textContent).toContain('My Tooltip');
    expect(tooltip?.classList.contains('tooltip-visible')).toBe(true);
  });

  it('should remove tooltip on mouseleave', async () => {
    elementWithDirective.dispatchEvent(new MouseEvent('mouseenter'));
    await fixture.whenStable();
    fixture.detectChanges();
    expect(document.querySelector('.tooltip-content-dynamic')).toBeTruthy();

    elementWithDirective.dispatchEvent(new MouseEvent('mouseleave'));
    await fixture.whenStable();
    fixture.detectChanges();
    expect(document.querySelector('.tooltip-content-dynamic')).toBeNull();
  });

  it('should not create tooltip if content is empty', async () => {
    const emptyFixture = TestBed.createComponent(TestHostEmptyTooltipComponent);
    const element = emptyFixture.debugElement.query(By.css('span')).nativeElement;
    emptyFixture.detectChanges();

    element.dispatchEvent(new MouseEvent('mouseenter'));
    await emptyFixture.whenStable();
    emptyFixture.detectChanges();

    const tooltip = document.querySelector('.tooltip-content-dynamic');
    expect(tooltip).toBeNull();
  });

  it('should not create a second tooltip on re-entering', async () => {
    elementWithDirective.dispatchEvent(new MouseEvent('mouseenter'));
    await fixture.whenStable();
    fixture.detectChanges();

    elementWithDirective.dispatchEvent(new MouseEvent('mouseenter'));
    await fixture.whenStable();
    fixture.detectChanges();

    const tooltips = document.querySelectorAll('.tooltip-content-dynamic');
    expect(tooltips.length).toBe(1);
  });
});
