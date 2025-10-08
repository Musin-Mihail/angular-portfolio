import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { LabUiElementsComponent } from './lab-ui-elements.component';
import { ToggleSwitchComponent } from '../../shared/ui/toggle-switch/toggle-switch.component';
import { CustomCheckboxComponent } from '../../shared/ui/custom-checkbox/custom-checkbox.component';

const observe = vi.fn();
const disconnect = vi.fn();
const mockIntersectionObserver = vi.fn(() => ({
  observe,
  disconnect,
}));

beforeEach(() => {
  vi.stubGlobal('IntersectionObserver', mockIntersectionObserver);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('LabUiElementsComponent', () => {
  let component: LabUiElementsComponent;
  let fixture: ComponentFixture<LabUiElementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabUiElementsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LabUiElementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct number of UI showcases', () => {
    const showcaseElements = fixture.debugElement.queryAll(By.css('h3'));
    expect(showcaseElements.length).toBe(6);
  });

  it('should have initial signals set to false', () => {
    expect(component.isToggled()).toBe(false);
    expect(component.isCustomCheckboxChecked()).toBe(false);
  });

  it('should update isToggled signal when the toggle switch is clicked', () => {
    const toggleSwitchDebugElement = fixture.debugElement.query(
      By.directive(ToggleSwitchComponent)
    );
    const toggleSwitchInstance =
      toggleSwitchDebugElement.componentInstance as ToggleSwitchComponent;

    expect(component.isToggled()).toBe(false);

    toggleSwitchInstance.checked.set(true);
    fixture.detectChanges();

    expect(component.isToggled()).toBe(true);
  });

  it('should update isCustomCheckboxChecked signal when the custom checkbox is clicked', () => {
    const checkboxDebugElement = fixture.debugElement.query(By.directive(CustomCheckboxComponent));
    const checkboxInstance = checkboxDebugElement.componentInstance as CustomCheckboxComponent;

    expect(component.isCustomCheckboxChecked()).toBe(false);

    checkboxInstance.checked.set(true);
    fixture.detectChanges();

    expect(component.isCustomCheckboxChecked()).toBe(true);
  });
});
