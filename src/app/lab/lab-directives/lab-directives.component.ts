import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { HighlightDirective } from '../../shared/directives/highlight.directive';
import { UnlessDirective } from '../../shared/directives/unless.directive';

@Component({
  selector: 'app-lab-directives',
  standalone: true,
  imports: [UnlessDirective, HighlightDirective],
  templateUrl: './lab-directives.component.html',
  styleUrls: ['./lab-directives.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabDirectivesComponent {
  isBoxVisible = signal(false);
  toggleBoxVisibility(): void {
    this.isBoxVisible.update((value) => !value);
  }
}
