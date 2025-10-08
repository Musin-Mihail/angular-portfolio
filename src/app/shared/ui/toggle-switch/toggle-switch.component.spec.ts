import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { ToggleSwitchComponent } from './toggle-switch.component';

@Component({
  standalone: true,
  imports: [ToggleSwitchComponent],
  template: `<app-toggle-switch [(checked)]="isToggledSignal">Toggle Me</app-toggle-switch>`,
})
class TestHostComponent {
  isToggledSignal = signal(false);
}

describe('ToggleSwitchComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let toggleInput: HTMLInputElement;
  let toggleLabel: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, ToggleSwitchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
    toggleInput = fixture.nativeElement.querySelector('input[type="checkbox"]');
    toggleLabel = fixture.nativeElement.querySelector('label');
  });

  it('should create and project content', () => {
    expect(toggleInput).toBeTruthy();
    expect(toggleLabel.textContent).toContain('Toggle Me');
  });

  it('should be unchecked by default', () => {
    expect(toggleInput.checked).toBe(false);
    expect(hostComponent.isToggledSignal()).toBe(false);
  });

  it('should update the parent component signal on click', () => {
    expect(hostComponent.isToggledSignal()).toBe(false);

    toggleLabel.click();
    fixture.detectChanges();

    expect(toggleInput.checked).toBe(true);
    expect(hostComponent.isToggledSignal()).toBe(true);
  });

  it('should update its checked state when the parent component signal changes', () => {
    expect(toggleInput.checked).toBe(false);

    hostComponent.isToggledSignal.set(true);
    fixture.detectChanges();

    expect(toggleInput.checked).toBe(true);
  });
});
