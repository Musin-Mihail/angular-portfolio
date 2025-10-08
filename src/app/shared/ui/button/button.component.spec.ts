import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { describe, it, expect, beforeEach } from 'vitest';
import { ButtonComponent } from './button.component';

@Component({
  standalone: true,
  imports: [ButtonComponent],
  template: `
    <app-button variant="pulse">Pulse</app-button>
    <app-button variant="gradient">Gradient</app-button>
    <app-button variant="icon">Icon</app-button>
    <app-button class="custom-class">Default with custom class</app-button>
  `,
})
class TestHostComponent {}

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
  });

  it('should apply base "btn" class to all buttons', () => {
    const buttonDebugElements = fixture.debugElement.queryAll(By.css('button'));
    expect(buttonDebugElements.length).toBe(4);
    buttonDebugElements.forEach((de) => {
      expect(de.nativeElement.classList.contains('btn')).toBe(true);
    });
  });

  it('should apply "btn-pulse" class for the pulse variant', () => {
    const buttonEl = fixture.debugElement.query(
      By.css('app-button:first-child button')
    ).nativeElement;
    expect(buttonEl.classList.contains('btn-pulse')).toBe(true);
  });

  it('should apply "btn-gradient" class for the gradient variant', () => {
    const buttonEl = fixture.debugElement.query(
      By.css('app-button:nth-child(2) button')
    ).nativeElement;
    expect(buttonEl.classList.contains('btn-gradient')).toBe(true);
  });

  it('should apply "btn-icon" class for the icon variant', () => {
    const buttonEl = fixture.debugElement.query(
      By.css('app-button:nth-child(3) button')
    ).nativeElement;
    expect(buttonEl.classList.contains('btn-icon')).toBe(true);
  });

  it('should include custom classes passed via the class input', () => {
    const buttonEl = fixture.debugElement.query(
      By.css('app-button:last-child button')
    ).nativeElement;
    expect(buttonEl.classList.contains('custom-class')).toBe(true);
  });
});
