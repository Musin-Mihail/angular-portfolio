import { vi, describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';

const mockAngularHandle = vi.fn().mockResolvedValue(undefined);

vi.mock('@angular/ssr/node', () => ({
  AngularNodeAppEngine: vi.fn(() => ({
    handle: mockAngularHandle,
  })),
  writeResponseToNodeResponse: vi.fn(),
  isMainModule: vi.fn(() => false),
  createNodeRequestHandler: vi.fn((app) => app),
}));

const { reqHandler } = await import('./server');

describe('Express Server API', () => {
  let app: express.Express;

  beforeEach(() => {
    mockAngularHandle.mockClear();
    app = reqHandler;
  });

  it('should return a 500 error for /api/test-500', async () => {
    const response = await request(app).get('/api/test-500');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Это симулированная внутренняя ошибка сервера!' });
    expect(response.headers['cache-control']).toBe('no-cache, no-store, must-revalidate');
    expect(mockAngularHandle).not.toHaveBeenCalled();
  });

  it('should attempt to call the Angular handler for non-API, non-static routes', async () => {
    await request(app).get('/some-angular-route');
    expect(mockAngularHandle).toHaveBeenCalled();
  });
});
