import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { catchError, map, startWith } from 'rxjs/operators';
import { BackendMessage, BackendService } from './backend.service';

interface BackendState {
  data: BackendMessage | null;
  loading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-backend-test',
  standalone: true,
  imports: [],
  templateUrl: './backend-test.component.html',
  styleUrls: ['./backend-test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackendTestComponent {
  private backendService = inject(BackendService);
  private readonly initialState: BackendState = { data: null, loading: true, error: null };
  private state = toSignal(
    this.backendService.getMessage().pipe(
      map((response): BackendState => ({ data: response, loading: false, error: null })),
      startWith(this.initialState),
      catchError((err) => {
        const errorMessage = 'Не удалось получить данные с бэкенда.';
        return of<BackendState>({ data: null, loading: false, error: errorMessage });
      })
    ),
    { initialValue: this.initialState }
  );
  public readonly data = computed(() => this.state().data);
  public readonly isLoading = computed(() => this.state().loading);
  public readonly errorMsg = computed(() => this.state().error);
}
