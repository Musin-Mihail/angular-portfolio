import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  inject,
  PLATFORM_ID,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-lab-ui-elements',
  standalone: true,
  imports: [],
  templateUrl: './lab-ui-elements.component.html',
  styleUrls: ['./lab-ui-elements.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabUiElementsComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);

  isToggled = signal(false);
  isCustomCheckboxChecked = signal(false);

  @ViewChild('card3d') private card3d?: ElementRef<HTMLDivElement>;
  @ViewChild('parallaxContainer') private parallaxContainer?: ElementRef<HTMLDivElement>;
  @ViewChild('parallaxBg') private parallaxBg?: ElementRef<HTMLDivElement>;

  private renderer = inject(Renderer2);

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      requestAnimationFrame(() => this.onWindowScroll());
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.parallaxContainer || !this.parallaxBg) {
        return;
      }
      const containerEl = this.parallaxContainer.nativeElement;
      const bgEl = this.parallaxBg.nativeElement;
      const rect = containerEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      const difference = viewportCenter - elementCenter;
      const speed = -0.15;
      const offset = difference * speed;
      this.renderer.setStyle(bgEl, 'transform', `translateY(${offset}px)`);
    }
  }

  toggle(): void {
    this.isToggled.update((value) => !value);
  }

  toggleCustomCheckbox(): void {
    this.isCustomCheckboxChecked.update((value) => !value);
  }

  onMouseMove(event: MouseEvent): void {
    if (!this.card3d) return;
    const cardElement = this.card3d.nativeElement;
    const container = cardElement.parentElement;
    if (!container) return;
    const { left, top, width, height } = container.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;
    const rotateX = (y / height - 0.5) * -25;
    const rotateY = (x / width - 0.5) * 25;
    this.renderer.setStyle(
      cardElement,
      'transform',
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    );
  }

  onMouseLeave(): void {
    if (!this.card3d) return;
    this.renderer.setStyle(
      this.card3d.nativeElement,
      'transform',
      'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    );
  }
}
