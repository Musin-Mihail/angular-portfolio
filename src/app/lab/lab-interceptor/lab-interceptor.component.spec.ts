import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { LabInterceptorComponent } from './lab-interceptor.component';

let httpResponseSubject: Subject<unknown>;

const httpClientMock = {
  get: vi.fn(() => httpResponseSubject.asObservable()),
};

describe('LabInterceptorComponent', () => {
  let component: LabInterceptorComponent;
  let fixture: ComponentFixture<LabInterceptorComponent>;

  beforeEach(async () => {
    vi.clearAllMocks();
    httpResponseSubject = new Subject<unknown>();

    await TestBed.configureTestingModule({
      imports: [LabInterceptorComponent],
      providers: [{ provide: HttpClient, useValue: httpClientMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(LabInterceptorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an initial state of "idle"', () => {
    expect(component.state().status).toBe('idle');
  });

  it('should transition state to loading -> success on sendSuccessRequest', () => {
    const mockData = { id: 1, title: 'Test Post' };

    component.sendSuccessRequest();

    expect(component.state().status).toBe('loading');

    httpResponseSubject.next(mockData);
    httpResponseSubject.complete();
    fixture.detectChanges();

    expect(component.state().status).toBe('success');
    expect(component.state().data).toEqual(mockData);
  });

  it('should transition state to loading -> error on sendError404Request', () => {
    const mockError = new Error('Запрошенный ресурс не найден (Ошибка 404).');

    component.sendError404Request();

    expect(component.state().status).toBe('loading');

    httpResponseSubject.error(mockError);
    fixture.detectChanges();

    expect(component.state().status).toBe('error');
    expect(component.state().error).toBe(mockError.message);
  });

  it('should transition state to loading -> error on sendError500Request', () => {
    const mockError = new Error('Произошла внутренняя ошибка сервера (Ошибка 500).');

    component.sendError500Request();

    expect(component.state().status).toBe('loading');

    httpResponseSubject.error(mockError);
    fixture.detectChanges();

    expect(component.state().status).toBe('error');
    expect(component.state().error).toBe(mockError.message);
  });
});
