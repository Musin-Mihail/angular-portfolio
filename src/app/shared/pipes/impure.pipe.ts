import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'impure',
  standalone: true,
  pure: false,
})
export class ImpurePipe implements PipeTransform {
  transform<T>(value: T): T {
    console.log('--- IMPURE PIPE RUNNING ---');
    return value;
  }
}
