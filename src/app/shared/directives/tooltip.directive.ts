import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective implements OnDestroy {
  @Input('appTooltip') content: string = '';

  private el = inject(ElementRef<HTMLElement>);
  private renderer = inject(Renderer2);
  private tooltipElement: HTMLElement | null = null;

  @HostListener('mouseenter')
  onMouseEnter(): void {
    if (!this.content || this.tooltipElement) {
      return;
    }
    const tooltip = this.renderer.createElement('div');
    this.renderer.setProperty(tooltip, 'textContent', this.content);
    this.renderer.addClass(tooltip, 'tooltip-content-dynamic');
    this.renderer.setAttribute(tooltip, 'role', 'tooltip');
    this.renderer.appendChild(document.body, tooltip);

    const hostPos = this.el.nativeElement.getBoundingClientRect();
    const tooltipPos = tooltip.getBoundingClientRect();

    const top = hostPos.top - tooltipPos.height - 8;
    const left = hostPos.left + hostPos.width / 2 - tooltipPos.width / 2;

    this.renderer.setStyle(tooltip, 'top', `${top}px`);
    this.renderer.setStyle(tooltip, 'left', `${left}px`);

    this.renderer.addClass(tooltip, 'tooltip-visible');

    this.tooltipElement = tooltip;
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.removeTooltip();
  }

  ngOnDestroy(): void {
    this.removeTooltip();
  }

  private removeTooltip(): void {
    if (this.tooltipElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}
