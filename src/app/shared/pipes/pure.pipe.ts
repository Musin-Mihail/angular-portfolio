import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pure',
  standalone: true,
  pure: true,
})
export class PurePipe implements PipeTransform {
  transform<T>(value: T): T {
    return value;
  }
}
