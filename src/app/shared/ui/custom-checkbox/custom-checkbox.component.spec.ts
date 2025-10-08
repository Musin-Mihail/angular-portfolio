import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { describe, it, expect, beforeEach } from 'vitest';
import { CustomCheckboxComponent } from './custom-checkbox.component';

@Component({
  standalone: true,
  imports: [CustomCheckboxComponent],
  template: `<app-custom-checkbox [(checked)]="isCheckedSignal">My Checkbox</app-custom-checkbox>`,
})
class TestHostComponent {
  isCheckedSignal = signal(false);
}

describe('CustomCheckboxComponent', () => {
  let hostComponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;
  let checkboxInput: HTMLInputElement;
  let checkboxLabel: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, CustomCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    fixture.detectChanges();
    checkboxInput = fixture.nativeElement.querySelector('input[type="checkbox"]');
    checkboxLabel = fixture.nativeElement.querySelector('label');
  });

  it('should create and project content', () => {
    expect(checkboxInput).toBeTruthy();
    expect(checkboxLabel.textContent).toContain('My Checkbox');
  });

  it('should be unchecked by default', () => {
    expect(checkboxInput.checked).toBe(false);
    expect(hostComponent.isCheckedSignal()).toBe(false);
  });

  it('should update the parent component signal on click', () => {
    expect(hostComponent.isCheckedSignal()).toBe(false);
    checkboxLabel.click();
    fixture.detectChanges();
    expect(checkboxInput.checked).toBe(true);
    expect(hostComponent.isCheckedSignal()).toBe(true);
  });

  it('should update its checked state when the parent component signal changes', () => {
    expect(checkboxInput.checked).toBe(false);
    hostComponent.isCheckedSignal.set(true);
    fixture.detectChanges();
    expect(checkboxInput.checked).toBe(true);
  });
});
