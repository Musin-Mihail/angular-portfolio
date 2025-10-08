import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { of, throwError } from 'rxjs';
import { BackendTestComponent } from './backend-test.component';
import { BackendService } from './backend.service';

const mockBackendService = {
  getMessage: vi.fn(),
};

describe('BackendTestComponent', () => {
  let component: BackendTestComponent;
  let fixture: ComponentFixture<BackendTestComponent>;

  beforeEach(async () => {
    vi.resetAllMocks();

    await TestBed.configureTestingModule({
      imports: [BackendTestComponent],
      providers: [{ provide: BackendService, useValue: mockBackendService }],
    })
      .overrideComponent(BackendTestComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
  });

  it('should show loader initially and hide it after data is fetched', () => {
    mockBackendService.getMessage.mockReturnValue(of({ message: 'Success' }));

    fixture = TestBed.createComponent(BackendTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.isLoading()).toBe(false);
  });

  it('should display data when the service call is successful', () => {
    const testMessage = { message: 'Data loaded successfully' };
    mockBackendService.getMessage.mockReturnValue(of(testMessage));

    fixture = TestBed.createComponent(BackendTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.data()).toEqual(testMessage);
    expect(component.errorMsg()).toBeNull();
    expect(component.isLoading()).toBe(false);
  });

  it('should display an error message when the service call fails', () => {
    mockBackendService.getMessage.mockReturnValue(throwError(() => new Error('API Error')));

    fixture = TestBed.createComponent(BackendTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    expect(component.errorMsg()).toBe('Не удалось получить данные с бэкенда.');
    expect(component.data()).toBeNull();
    expect(component.isLoading()).toBe(false);
  });
});
