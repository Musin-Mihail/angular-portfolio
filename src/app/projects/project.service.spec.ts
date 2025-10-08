import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProjectService } from './project.service';
import { Project } from './project.model';
import { environment } from '../../environments/environment';
import { HttpErrorResponse } from '@angular/common/http';

describe('ProjectService', () => {
  let service: ProjectService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProjectService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve projects from the API via GET', () => {
    const dummyProjects: Project[] = [
      { id: 1, title: 'Project 1', description: 'Desc 1', projectUrl: '', tags: [] },
      { id: 2, title: 'Project 2', description: 'Desc 2', projectUrl: '', tags: [] },
    ];

    service.getProjects().subscribe((projects) => {
      expect(projects.length).toBe(2);
      expect(projects).toEqual(dummyProjects);
    });

    const request = httpMock.expectOne(`${environment.apiUrl}/api/Projects`);
    expect(request.request.method).toBe('GET');
    request.flush(dummyProjects);
  });

  it('should handle HTTP errors', () => {
    const errorMessage = '404 Not Found';

    service.getProjects().subscribe({
      next: () => {
        throw new Error('should have failed with the 404 error');
      },
      error: (error: HttpErrorResponse) => {
        expect(error).toBeInstanceOf(HttpErrorResponse);
        expect(error.status).toBe(404);
      },
    });

    const request = httpMock.expectOne(`${environment.apiUrl}/api/Projects`);
    expect(request.request.method).toBe('GET');
    request.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});
