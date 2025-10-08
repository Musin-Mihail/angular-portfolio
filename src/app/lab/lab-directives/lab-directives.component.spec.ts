import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { LabDirectivesComponent } from './lab-directives.component';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

describe('LabDirectivesComponent', () => {
  let component: LabDirectivesComponent;
  let fixture: ComponentFixture<LabDirectivesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabDirectivesComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(LabDirectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have isBoxVisible signal initialized to false', () => {
    expect(component.isBoxVisible()).toBe(false);
  });

  it('toggleBoxVisibility should invert the value of isBoxVisible', () => {
    expect(component.isBoxVisible()).toBe(false);

    component.toggleBoxVisibility();
    expect(component.isBoxVisible()).toBe(true);

    component.toggleBoxVisibility();
    expect(component.isBoxVisible()).toBe(false);
  });
});
