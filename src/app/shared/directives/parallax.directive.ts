import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appParallax]',
  standalone: true,
})
export class ParallaxDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input() parallaxImage: string | null = null;
  private el = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);
  private platformId = inject(PLATFORM_ID);
  private parallaxBg: HTMLElement | null = null;
  private observer?: IntersectionObserver;
  private isVisible = false;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.parallaxBg = this.el.nativeElement.querySelector('.parallax-bg') as HTMLElement | null;
      if (this.parallaxBg && this.parallaxImage) {
        this.renderer.setStyle(this.parallaxBg, 'backgroundImage', `url('${this.parallaxImage}')`);
      }
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.observer = new IntersectionObserver(
        (entries) => {
          this.isVisible = entries[0].isIntersecting;
          if (this.isVisible) {
            window.addEventListener('scroll', this.onWindowScroll);
            this.updateParallax();
          } else {
            window.removeEventListener('scroll', this.onWindowScroll);
          }
        },
        { threshold: 0.1 }
      );
      this.observer.observe(this.el.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('scroll', this.onWindowScroll);
    }
  }

  private onWindowScroll = (): void => {
    requestAnimationFrame(() => this.updateParallax());
  };

  private updateParallax(): void {
    if (!this.parallaxBg || !this.isVisible) {
      return;
    }
    const rect = this.el.nativeElement.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;
    const elementCenter = rect.top + rect.height / 2;
    const difference = viewportCenter - elementCenter;
    const speed = -0.15;
    const offset = difference * speed;

    this.renderer.setStyle(this.parallaxBg, 'transform', `translateY(${offset}px)`);
  }
}
