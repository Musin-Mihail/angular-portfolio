import { Pipe, PipeTransform } from '@angular/core';

interface Filterable {
  status: string;
}

@Pipe({
  name: 'statusFilter',
  standalone: true,
  pure: true,
})
export class StatusFilterPipe implements PipeTransform {
  transform<T extends Filterable>(items: T[] | null, status: string): T[] {
    if (!items || !status) {
      return [];
    }
    return items.filter((item) => item.status === status);
  }
}
