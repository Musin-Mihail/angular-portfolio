import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Card3dDirective } from '../../shared/directives/card-3d.directive';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';

interface UiElementsState {
  isToggled: boolean;
  isCustomCheckboxChecked: boolean;
}

@Component({
  selector: 'app-lab-ui-elements',
  standalone: true,
  imports: [Card3dDirective, ParallaxDirective],
  templateUrl: './lab-ui-elements.component.html',
  styleUrls: ['./lab-ui-elements.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabUiElementsComponent {
  public state = signal<UiElementsState>({
    isToggled: false,
    isCustomCheckboxChecked: false,
  });

  toggle(): void {
    this.state.update((current) => ({ ...current, isToggled: !current.isToggled }));
  }

  toggleCustomCheckbox(): void {
    this.state.update((current) => ({
      ...current,
      isCustomCheckboxChecked: !current.isCustomCheckboxChecked,
    }));
  }
}
