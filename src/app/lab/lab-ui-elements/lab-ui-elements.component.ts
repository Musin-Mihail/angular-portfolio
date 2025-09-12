import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Card3dDirective } from '../../shared/directives/card-3d.directive';
import { ParallaxDirective } from '../../shared/directives/parallax.directive';
import { ButtonComponent } from '../../shared/ui/button/button.component';
import { CustomCheckboxComponent } from '../../shared/ui/custom-checkbox/custom-checkbox.component';
import { ToggleSwitchComponent } from '../../shared/ui/toggle-switch/toggle-switch.component';

@Component({
  selector: 'app-lab-ui-elements',
  standalone: true,
  imports: [
    Card3dDirective,
    ParallaxDirective,
    ToggleSwitchComponent,
    CustomCheckboxComponent,
    ButtonComponent,
  ],
  templateUrl: './lab-ui-elements.component.html',
  styleUrls: ['./lab-ui-elements.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabUiElementsComponent {
  public isToggled = signal(false);
  public isCustomCheckboxChecked = signal(false);
}
