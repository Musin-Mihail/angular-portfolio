import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { vi, expect, describe, it, beforeEach } from 'vitest';
import { Subject } from 'rxjs';
import { ProjectsComponent } from './projects.component';
import { ProjectService } from './project.service';
import { Project } from './project.model';

const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Angular App',
    description: 'A project using TypeScript.',
    tags: ['Angular', 'TypeScript'],
    projectUrl: '',
  },
  {
    id: 2,
    title: '.NET Web API',
    description: 'A backend service.',
    tags: ['C#', '.NET'],
    projectUrl: '',
  },
  {
    id: 3,
    title: 'Full-Stack Solution',
    description: 'An Angular and .NET app.',
    tags: ['Angular', '.NET'],
    projectUrl: '',
  },
];

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;
  let projectsSubject: Subject<Project[]>;

  const projectServiceMock = {
    getProjects: vi.fn(),
  };

  beforeEach(async () => {
    projectsSubject = new Subject<Project[]>();
    projectServiceMock.getProjects.mockReturnValue(projectsSubject.asObservable());

    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideNoopAnimations(),
        { provide: ProjectService, useValue: projectServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a loader while data is being fetched', () => {
    fixture.detectChanges();
    const loader = fixture.nativeElement.querySelector('.loader');
    expect(loader).toBeTruthy();
    expect(component.isLoading()).toBe(true);
  });

  it('should display projects when data fetching is successful', async () => {
    fixture.detectChanges();

    projectsSubject.next(MOCK_PROJECTS);
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.isLoading()).toBe(false);
    const projectElements = fixture.nativeElement.querySelectorAll('a[href]');
    expect(projectElements.length).toBe(MOCK_PROJECTS.length);
  });

  it('should display an error message when data fetching fails', async () => {
    fixture.detectChanges();

    projectsSubject.error(new Error('Failed to fetch'));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.isLoading()).toBe(false);
    const errorElement = fixture.nativeElement.querySelector('[role="alert"]');
    expect(errorElement).toBeTruthy();
  });

  it('should filter projects based on search input', async () => {
    vi.useFakeTimers();
    fixture.detectChanges();

    projectsSubject.next(MOCK_PROJECTS);
    fixture.detectChanges();

    const searchInput = fixture.nativeElement.querySelector('input');
    searchInput.value = 'api';
    searchInput.dispatchEvent(new Event('input'));

    await vi.advanceTimersByTimeAsync(300);
    fixture.detectChanges();

    expect(component.filteredProjects().length).toBe(1);
    vi.useRealTimers();
  });

  it('should show a "not found" message if filter returns no results', async () => {
    vi.useFakeTimers();
    fixture.detectChanges();

    projectsSubject.next(MOCK_PROJECTS);
    fixture.detectChanges();

    const searchInput = fixture.nativeElement.querySelector('input');
    searchInput.value = 'nonexistentquery';
    searchInput.dispatchEvent(new Event('input'));

    await vi.advanceTimersByTimeAsync(300);
    fixture.detectChanges();

    const notFoundMessage = fixture.nativeElement.querySelector('.text-center.py-16');
    expect(notFoundMessage).toBeTruthy();
    vi.useRealTimers();
  });
});
