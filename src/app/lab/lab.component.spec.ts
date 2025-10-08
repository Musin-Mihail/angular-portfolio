import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';
import { describe, it, expect, beforeEach } from 'vitest';

import { LabComponent } from './lab.component';

describe('LabComponent', () => {
  let component: LabComponent;
  let fixture: ComponentFixture<LabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the main heading "Лаборатория Angular"', () => {
    const headingElement = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(headingElement.textContent).toContain('Лаборатория Angular');
  });

  it('should contain a router-outlet for nested routes', () => {
    const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutlet).not.toBeNull();
  });

  it('should render all 8 navigation links for the lab experiments', () => {
    const navLinkElements = fixture.debugElement.queryAll(By.css('nav a'));
    const expectedLinks = [
      'interceptor',
      'ngzone',
      'directives',
      'projection',
      'pipes',
      'pipes-advanced',
      'ui-elements',
      'backend-test',
    ];

    expect(navLinkElements.length).toBe(expectedLinks.length);

    expectedLinks.forEach((expectedLink) => {
      const linkExists = navLinkElements.some(
        (el) => el.nativeElement.getAttribute('routerLink') === expectedLink
      );
      expect(linkExists).toBe(true);
    });
  });
});
