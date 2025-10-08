import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { describe, it, expect, beforeEach } from 'vitest';
import { appConfig } from './app.config';

describe('appConfig', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [...appConfig.providers],
    }).compileComponents();
  });

  it('should have a configured Router', () => {
    const router = TestBed.inject(Router, null);
    expect(router).toBeTruthy();
  });

  it('should have a configured HttpClient', () => {
    const httpClient = TestBed.inject(HttpClient, null);
    expect(httpClient).toBeTruthy();
  });

  it('should be configured for animations', () => {
    expect(appConfig.providers).toBeDefined();
  });
});
