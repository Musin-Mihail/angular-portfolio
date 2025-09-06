import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { UnlessDirective } from '../../shared/directives/unless.directive';

@Component({
  selector: 'app-lab-directives',
  standalone: true,
  imports: [UnlessDirective],
  templateUrl: './lab-directives.component.html',
  styleUrls: ['./lab-directives.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabDirectivesComponent {
  isBoxVisible = signal(true);

  toggleBoxVisibility(): void {
    this.isBoxVisible.update((value) => !value);
  }
}
