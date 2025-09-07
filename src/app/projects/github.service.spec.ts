import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { GithubRepo, GithubService } from './github.service';

describe('GithubService', () => {
  let service: GithubService;
  let httpMock: HttpTestingController;
  const GITHUB_API_URL = 'https://api.github.com';
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(GithubService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('должен получать репозитории пользователя через GET-запрос', () => {
    const mockUsername = 'test-user';
    const mockRepos: GithubRepo[] = [
      {
        name: 'repo1',
        description: 'desc1',
        html_url: '',
        stargazers_count: 1,
        forks_count: 1,
        language: 'TypeScript',
      },
      {
        name: 'repo2',
        description: 'desc2',
        html_url: '',
        stargazers_count: 2,
        forks_count: 2,
        language: 'HTML',
      },
    ];
    service.getRepos(mockUsername).subscribe((repos) => {
      expect(repos.length).toBe(2);
      expect(repos).toEqual(mockRepos);
    });
    const req = httpMock.expectOne(
      `${GITHUB_API_URL}/users/${mockUsername}/repos?sort=updated&direction=desc`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockRepos);
  });
  it('должен обрабатывать ошибку при получении репозиториев', () => {
    const mockUsername = 'error-user';
    const errorMessage = 'Произошла ошибка сети';
    expect.assertions(1);
    service.getRepos(mockUsername).subscribe({
      error: (error) => {
        expect(error.status).toBe(500);
      },
    });
    const req = httpMock.expectOne(
      `${GITHUB_API_URL}/users/${mockUsername}/repos?sort=updated&direction=desc`
    );
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });
});
