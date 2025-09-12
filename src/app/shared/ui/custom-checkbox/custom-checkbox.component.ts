import { ChangeDetectionStrategy, Component, model } from '@angular/core';

@Component({
  selector: 'app-custom-checkbox',
  standalone: true,
  templateUrl: './custom-checkbox.component.html',
  styleUrls: ['./custom-checkbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomCheckboxComponent {
  public checked = model(false);
}
