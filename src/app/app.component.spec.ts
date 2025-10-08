import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct navigation links', () => {
    const navLinks = fixture.debugElement.queryAll(By.css('.hidden.md\\:flex a'));
    expect(navLinks.length).toBe(3);
    expect(navLinks[0].nativeElement.textContent.trim()).toBe('Обо мне');
    expect(navLinks[1].nativeElement.textContent.trim()).toBe('Проекты');
    expect(navLinks[2].nativeElement.textContent.trim()).toBe('Лаборатория');
  });

  it('should toggle mobile menu on button click', () => {
    expect(component.isMobileMenuOpen()).toBe(false);
    let mobileMenu = fixture.debugElement.query(By.css('#mobile-menu'));
    expect(mobileMenu).toBeNull();

    const toggleButton = fixture.debugElement.query(By.css('.md\\:hidden button')).nativeElement;
    toggleButton.click();
    fixture.detectChanges();

    expect(component.isMobileMenuOpen()).toBe(true);
    mobileMenu = fixture.debugElement.query(By.css('#mobile-menu'));
    expect(mobileMenu).toBeTruthy();

    toggleButton.click();
    fixture.detectChanges();

    expect(component.isMobileMenuOpen()).toBe(false);
    mobileMenu = fixture.debugElement.query(By.css('#mobile-menu'));
    expect(mobileMenu).toBeNull();
  });

  it('should close mobile menu when a navigation link is clicked', () => {
    const toggleButton = fixture.debugElement.query(By.css('.md\\:hidden button')).nativeElement;

    toggleButton.click();
    fixture.detectChanges();
    expect(component.isMobileMenuOpen()).toBe(true);

    const mobileLink = fixture.debugElement.query(By.css('#mobile-menu a')).nativeElement;
    mobileLink.click();
    fixture.detectChanges();

    expect(component.isMobileMenuOpen()).toBe(false);
  });
});
