import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Card3dDirective } from '../../shared/directives/card-3d.directive';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';

@Component({
  selector: 'app-lab-ui-elements',
  standalone: true,
  imports: [Card3dDirective, ParallaxDirective],
  templateUrl: './lab-ui-elements.component.html',
  styleUrls: ['./lab-ui-elements.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabUiElementsComponent {
  isToggled = signal(false);
  isCustomCheckboxChecked = signal(false);

  toggle(): void {
    this.isToggled.update((value) => !value);
  }

  toggleCustomCheckbox(): void {
    this.isCustomCheckboxChecked.update((value) => !value);
  }
}
