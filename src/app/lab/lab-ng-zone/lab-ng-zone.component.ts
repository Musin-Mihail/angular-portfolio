import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-lab-ng-zone',
  standalone: true,
  imports: [],
  templateUrl: './lab-ng-zone.component.html',
  styleUrls: ['./lab-ng-zone.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabNgZoneComponent implements OnDestroy {
  private zone = inject(NgZone);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private removeMouseMoveListener?: () => void;
  private isListenerAttached = false;
  cdCounter = signal(0);
  inZoneCounter = signal(0);
  outZoneCounter = signal(0);
  inZoneCoords = signal({ x: 0, y: 0 });
  outZoneCoords = signal({ x: 0, y: 0 });
  handleInZoneMouseMove(event: MouseEvent): void {
    this.inZoneCounter.update((val) => val + 1);
    this.inZoneCoords.set({ x: event.clientX, y: event.clientY });
    this.cdCounter.update((val) => val + 1);
  }
  setupOutZoneListener(element: HTMLElement): void {
    if (isPlatformBrowser(this.platformId) && !this.isListenerAttached) {
      this.isListenerAttached = true;
      this.zone.runOutsideAngular(() => {
        const listener = (event: MouseEvent) => {
          this.outZoneCounter.update((val) => val + 1);
          this.outZoneCoords.set({ x: event.clientX, y: event.clientY });
          this.cdr.detectChanges();
        };
        element.addEventListener('mousemove', listener);
        this.removeMouseMoveListener = () => {
          element.removeEventListener('mousemove', listener);
        };
      });
    }
  }
  ngOnDestroy(): void {
    if (this.removeMouseMoveListener) {
      this.removeMouseMoveListener();
    }
  }
}
