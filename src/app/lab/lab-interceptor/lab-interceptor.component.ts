import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { finalize } from 'rxjs';

type RequestState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  data?: unknown;
  error?: string;
};

@Component({
  selector: 'app-lab-interceptor',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lab-interceptor.component.html',
  styleUrls: ['./lab-interceptor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabInterceptorComponent {
  private http = inject(HttpClient);
  public state = signal<RequestState>({ status: 'idle' });

  sendSuccessRequest(): void {
    this.state.set({ status: 'loading' });
    this.http
      .get('https://jsonplaceholder.typicode.com/posts/1')
      .pipe(finalize(() => {}))
      .subscribe({
        next: (data) => this.state.set({ status: 'success', data }),
        error: (err) => this.state.set({ status: 'error', error: err.message }),
      });
  }

  sendError404Request(): void {
    this.state.set({ status: 'loading' });
    this.http
      .get('https://jsonplaceholder.typicode.com/posts/99999999')
      .pipe(finalize(() => {}))
      .subscribe({
        error: (err) => this.state.set({ status: 'error', error: err.message }),
      });
  }

  sendError500Request(): void {
    this.state.set({ status: 'loading' });
    this.http
      .get('/api/test-500')
      .pipe(finalize(() => {}))
      .subscribe({
        next: (data) => console.log('success', data),
        error: (err) => this.state.set({ status: 'error', error: err.message }),
      });
  }
}
