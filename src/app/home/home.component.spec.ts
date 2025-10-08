import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { beforeEach, describe, expect, it } from 'vitest';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the main heading', () => {
    const headingElement = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(headingElement.textContent).toContain('Привет, я Мусин Михаил!');
  });

  it('should display the introduction text', () => {
    const pElement = fixture.debugElement.query(By.css('p.text-xl')).nativeElement;
    expect(pElement.textContent).toContain('FullStack-разработчик (.NET & Angular)');
  });

  it('should display a list of key skills', () => {
    const skillElements = fixture.debugElement.queryAll(By.css('.flex-wrap span'));
    expect(skillElements.length).toBeGreaterThan(5);
    const angularSkill = skillElements.find(
      (el) => el.nativeElement.textContent.trim() === 'Angular'
    );
    const dotnetSkill = skillElements.find(
      (el) => el.nativeElement.textContent.trim() === '.NET / C#'
    );
    expect(angularSkill).toBeTruthy();
    expect(dotnetSkill).toBeTruthy();
  });

  it('should contain links to "Проекты" and "Лабораторию"', () => {
    const links = fixture.debugElement.queryAll(By.css('a'));
    const projectsLink = links.find(
      (a) => a.nativeElement.getAttribute('routerLink') === '/projects'
    );
    const labLink = links.find((a) => a.nativeElement.getAttribute('routerLink') === '/lab');

    expect(projectsLink).toBeTruthy();
    expect(labLink).toBeTruthy();
  });
});
