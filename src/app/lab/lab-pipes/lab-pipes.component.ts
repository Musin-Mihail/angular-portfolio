import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { ImpurePipe } from '../../shared/pipes/impure.pipe';
import { PurePipe } from '../../shared/pipes/pure.pipe';

@Component({
  selector: 'app-lab-pipes',
  standalone: true,
  imports: [CommonModule, PurePipe, ImpurePipe],
  templateUrl: './lab-pipes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabPipesComponent implements OnInit {
  private pureDemoArray = ['Элемент A', 'Элемент B'];
  public pureItems = signal<string[]>([]);
  public pureJson = signal('');

  ngOnInit(): void {
    this.pureItems.set([...this.pureDemoArray]);
    this.updatePureJson();
  }

  replacePureArray(): void {
    this.pureDemoArray = ['Элемент C', 'Элемент D'];
    this.pureItems.set([...this.pureDemoArray]);
    this.updatePureJson();
  }

  mutatePureArray(): void {
    this.pureDemoArray.push('Новый элемент (мутация)');
    this.updatePureJson();
  }

  private updatePureJson(): void {
    this.pureJson.set(JSON.stringify(this.pureDemoArray, null, 2));
  }

  impureItems = signal(['Элемент X', 'Элемент Y']);

  mutateImpureArray(): void {
    this.impureItems.update((items) => [...items, 'Новый элемент (мутация)']);
  }
}
