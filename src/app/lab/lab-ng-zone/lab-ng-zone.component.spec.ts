import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgZone } from '@angular/core';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { LabNgZoneComponent } from './lab-ng-zone.component';

describe('LabNgZoneComponent', () => {
  let component: LabNgZoneComponent;
  let fixture: ComponentFixture<LabNgZoneComponent>;
  let ngZone: NgZone;
  let outZoneElement: HTMLElement;
  const MOCK_MOUSE_EVENT = { clientX: 100, clientY: 200 } as MouseEvent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabNgZoneComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LabNgZoneComponent);
    component = fixture.componentInstance;
    ngZone = TestBed.inject(NgZone);
    outZoneElement = fixture.nativeElement.querySelector('.border-yellow-500\\/50');
    fixture.detectChanges();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('handleInZoneMouseMove should update counters and coordinates', () => {
    const initialCdCount = component.cdCounter();
    component.handleInZoneMouseMove(MOCK_MOUSE_EVENT);

    expect(component.inZoneCounter()).toBe(1);
    expect(component.cdCounter()).toBe(initialCdCount + 1);
    expect(component.inZoneCoords()).toEqual({ x: 100, y: 200 });
  });

  it('setupOutZoneListener should attach a mousemove listener outside NgZone', () => {
    const runOutsideAngularSpy = vi.spyOn(ngZone, 'runOutsideAngular');
    component.setupOutZoneListener(outZoneElement);
    expect(runOutsideAngularSpy).toHaveBeenCalled();
  });

  it('mousemove event outside NgZone should update coordinates but NOT increment CD counter', () => {
    const initialCdCount = component.cdCounter();
    const cdrSpy = vi.spyOn(component['cdr'], 'detectChanges');

    component.setupOutZoneListener(outZoneElement);

    outZoneElement.dispatchEvent(new MouseEvent('mousemove', { clientX: 300, clientY: 400 }));

    expect(component.outZoneCounter()).toBe(1);
    expect(component.outZoneCoords()).toEqual({ x: 300, y: 400 });
    expect(component.cdCounter()).toBe(initialCdCount);
    expect(cdrSpy).toHaveBeenCalled();
  });

  it('ngOnDestroy should remove the event listener', () => {
    const removeListenerSpy = vi.fn();
    component['removeMouseMoveListener'] = removeListenerSpy;
    component.ngOnDestroy();
    expect(removeListenerSpy).toHaveBeenCalled();
  });
});
