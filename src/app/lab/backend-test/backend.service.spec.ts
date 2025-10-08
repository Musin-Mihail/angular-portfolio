import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { describe, it, expect, afterEach, beforeEach } from 'vitest';

import { BackendService, BackendMessage } from './backend.service';

describe('BackendService', () => {
  let service: BackendService;
  let httpMock: HttpTestingController;
  const backendUrl = 'https://dotnet-portfolio-production.up.railway.app/portfolio';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackendService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(BackendService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a message from the backend via GET', () => {
    const dummyMessage: BackendMessage = { message: 'Hello from mock backend' };

    service.getMessage().subscribe((data) => {
      expect(data).toEqual(dummyMessage);
    });

    const req = httpMock.expectOne(backendUrl);

    expect(req.request.method).toBe('GET');

    req.flush(dummyMessage);
  });
});
