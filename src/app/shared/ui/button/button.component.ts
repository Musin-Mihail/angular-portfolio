import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Input } from '@angular/core';

type ButtonVariant = 'pulse' | 'gradient' | 'icon' | 'default';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() variant: ButtonVariant = 'default';
  @Input() class: string = '';

  public buttonClasses = computed(() => {
    const variantClasses: Record<ButtonVariant, string> = {
      default: '',
      pulse: 'btn-pulse',
      gradient: 'btn-gradient',
      icon: 'btn-icon',
    };
    return ['btn', variantClasses[this.variant], this.class].join(' ');
  });
}
