import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-lab',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabComponent {}
