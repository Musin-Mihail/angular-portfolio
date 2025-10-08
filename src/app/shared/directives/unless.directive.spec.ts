import { Component } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UnlessDirective } from './unless.directive';

@Component({
  standalone: true,
  imports: [UnlessDirective],
  template: `
    <div *appUnless="condition">
      <p>Content is visible</p>
    </div>
  `,
})
class TestHostComponent {
  condition = false;
}

describe('UnlessDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
  });

  it('should display content when condition is false', () => {
    component.condition = false;
    fixture.detectChanges();
    const content = fixture.debugElement.query(By.css('p'));
    expect(content).toBeTruthy();
    expect(content.nativeElement.textContent).toBe('Content is visible');
  });

  it('should NOT display content when condition is true', () => {
    component.condition = true;
    fixture.detectChanges();
    const content = fixture.debugElement.query(By.css('p'));
    expect(content).toBeNull();
  });

  it('should update view when condition changes', () => {
    component.condition = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('p'))).toBeTruthy();

    component.condition = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('p'))).toBeNull();

    component.condition = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('p'))).toBeTruthy();
  });
});
