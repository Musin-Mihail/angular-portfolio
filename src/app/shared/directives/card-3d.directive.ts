import { Directive, ElementRef, HostListener, inject, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCard3d]',
  standalone: true,
})
export class Card3dDirective {
  @Input('appCard3dIntensity') intensity: number = 25;

  private el = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    const { left, top, width, height } = this.el.nativeElement.getBoundingClientRect();
    const x = event.clientX - left;
    const y = event.clientY - top;

    const rotateX = (y / height - 0.5) * -this.intensity;
    const rotateY = (x / width - 0.5) * this.intensity;

    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    );
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.renderer.setStyle(
      this.el.nativeElement,
      'transform',
      'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    );
  }
}
