import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

const DEFAULT_COLOR_RGB = 'rgb(255, 193, 7)';

@Component({
  standalone: true,
  imports: [HighlightDirective],
  template: `
    <div appHighlight="yellow">Highlight me</div>
    <p appHighlight>Default highlight</p>
  `,
})
class TestHostComponent {}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let divEl: HTMLElement;
  let pEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    divEl = fixture.debugElement.query(By.css('div')).nativeElement;
    pEl = fixture.debugElement.query(By.css('p')).nativeElement;
  });

  it('should highlight the element with the provided color on mouseenter', () => {
    divEl.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    expect(divEl.style.backgroundColor).toBe('yellow');
  });

  it('should reset the background color on mouseleave', () => {
    divEl.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    divEl.dispatchEvent(new MouseEvent('mouseleave'));
    fixture.detectChanges();
    expect(divEl.style.backgroundColor).toBe('');
  });

  it('should use the default highlight color if none is provided', () => {
    
    pEl.dispatchEvent(new MouseEvent('mouseenter'));
    fixture.detectChanges();
    expect(pEl.style.backgroundColor).toBe(DEFAULT_COLOR_RGB);
  });
});
