import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

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

  toggle(): void {
    this.isToggled.update((value) => !value);
  }
}
