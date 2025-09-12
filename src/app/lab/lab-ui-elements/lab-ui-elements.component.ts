import { ChangeDetectionStrategy, Component, ElementRef, inject, Renderer2, signal, ViewChild } from '@angular/core';

@Component({
  selector: 'app-lab-ui-elements',
  standalone: true,
  imports: [],
  templateUrl: './lab-ui-elements.component.html',
  styleUrls: ['./lab-ui-elements.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabUiElementsComponent {
  isToggled = signal(false);
  isCustomCheckboxChecked = signal(false);

  @ViewChild('card3d') private card3d?: ElementRef<HTMLDivElement>;
  private renderer = inject(Renderer2);

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
