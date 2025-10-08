import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { vi, describe, it, expect, afterEach, beforeEach } from 'vitest';
import { apiInterceptor } from './api.interceptor';

describe('apiInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([apiInterceptor])),
        provideHttpClientTesting(),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add X-Custom-Auth header for other URLs', () => {
    const testUrl = 'https://some-other-api.com/data';
    http.get(testUrl).subscribe();

    const req = httpMock.expectOne(testUrl);
    expect(req.request.headers.has('X-Custom-Auth')).toBe(true);
    expect(req.request.headers.get('X-Custom-Auth')).toBe('my-token');
    req.flush({});
  });

  it('should NOT add X-Custom-Auth header for GitHub API URLs', () => {
    const githubUrl = 'https://api.github.com/users/test';
    http.get(githubUrl).subscribe();

    const req = httpMock.expectOne(githubUrl);
    expect(req.request.headers.has('X-Custom-Auth')).toBe(false);
    req.flush({});
  });

  it('should NOT add X-Custom-Auth header for the production backend URL', () => {
    const backendUrl = 'https://dotnet-portfolio-production.up.railway.app/some-endpoint';
    http.get(backendUrl).subscribe();

    const req = httpMock.expectOne(backendUrl);
    expect(req.request.headers.has('X-Custom-Auth')).toBe(false);
    req.flush({});
  });

  it('should transform a 404 error into a user-friendly message', () => {
    const testUrl = '/api/not-found';
    const expectedMessage = 'Запрошенный ресурс не найден (Ошибка 404).';

    http.get(testUrl).subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe(expectedMessage);
      },
    });

    const req = httpMock.expectOne(testUrl);
    req.flush('Not Found', { status: 404, statusText: 'Not Found' });
  });

  it('should transform a 500 error into a user-friendly message', () => {
    const testUrl = '/api/server-error';
    const expectedMessage = 'Произошла внутренняя ошибка сервера (Ошибка 500).';

    http.get(testUrl).subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe(expectedMessage);
      },
    });

    const req = httpMock.expectOne(testUrl);
    req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });
  });

  it('should handle client-side errors', () => {
    const testUrl = '/api/client-error';
    const mockErrorEvent = new ErrorEvent('NetworkError', { message: 'A network error occurred' });
    const expectedMessage = `Ошибка на стороне клиента: ${mockErrorEvent.message}`;

    http.get(testUrl).subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe(expectedMessage);
      },
    });

    const req = httpMock.expectOne(testUrl);
    req.error(mockErrorEvent);
  });

  it('should handle client-side or network errors', () => {
    const testUrl = '/api/some-url';
    const expectedMessage = 'Произошла неизвестная ошибка';
    const mockError = new ProgressEvent('error');

    http.get(testUrl).subscribe({
      next: () => {
        throw new Error('should have failed with a client-side error');
      },
      error: (err) => {
        expect(err).toBeInstanceOf(Error);
        expect(err.message).toBe(expectedMessage);
      },
    });

    const req = httpMock.expectOne(testUrl);
    req.error(mockError);
  });
});
