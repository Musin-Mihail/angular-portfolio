import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  @Input() appHighlight: string = '#ffc107'; // Цвет по умолчанию из плана
  private originalColor: string = '';
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  @HostListener('mouseenter') onMouseEnter() {
    this.originalColor = this.el.nativeElement.style.backgroundColor;
    this.highlight(this.appHighlight);
  }
  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(this.originalColor || null);
  }
  private highlight(color: string | null) {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', color);
  }
}
