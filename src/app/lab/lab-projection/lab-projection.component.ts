import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from '../../shared/ui/card/card.component';

@Component({
  selector: 'app-lab-projection',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './lab-projection.component.html',
  styleUrls: ['./lab-projection.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabProjectionComponent {}
