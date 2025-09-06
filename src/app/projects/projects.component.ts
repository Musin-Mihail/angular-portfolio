import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';

import { GithubRepo } from './github.models';
import { GithubService } from './github.service';
import { LanguageClassPipe } from './language-class.pipe';

interface ReposState {
  repos: GithubRepo[];
  loading: boolean;
  error: string | null;
}
@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LanguageClassPipe],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  private githubService = inject(GithubService);
  public searchControl = new FormControl('');
  private reposState$ = this.githubService.getRepos('Musin-Mihail').pipe(
    map((repos) => ({ repos, loading: false, error: null } as ReposState)),
    startWith({ repos: [], loading: true, error: null }),
    catchError((err) => {
      console.error('Ошибка при загрузке репозиториев:', err);
      const errorMessage = 'Не удалось загрузить проекты. Проверьте консоль или попробуйте позже.';
      return of({ repos: [], loading: false, error: errorMessage } as ReposState);
    })
  );
  private state = toSignal(this.reposState$);
  public repos = computed(() => this.state()?.repos ?? []);
  public isLoading = computed(() => this.state()?.loading ?? true);
  public errorMsg = computed(() => this.state()?.error ?? null);
  private searchTerm = toSignal(
    this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged(), startWith('')),
    { initialValue: '' }
  );
  public filteredRepos = computed(() => {
    const allRepos = this.repos();
    const term = (this.searchTerm() || '').toLowerCase();
    if (!term) {
      return allRepos;
    }
    return allRepos.filter(
      (repo) =>
        repo.name.toLowerCase().includes(term) ||
        repo.description?.toLowerCase().includes(term)
    );
  });
}
