import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { GithubRepo } from './github.service';
import { GithubService } from './github.service';
import { LanguageClassPipe } from './language-class.pipe';
interface ReposState {
  repos: GithubRepo[];
  loading: boolean;
  error: string | null;
}
const GITHUB_USERNAME = 'Musin-Mihail';
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
  public searchControl = new FormControl<string>('', { nonNullable: true });
  private readonly initialState: ReposState = { repos: [], loading: true, error: null };
  private reposState = toSignal(
    this.githubService.getRepos(GITHUB_USERNAME).pipe(
      map((repos): ReposState => ({ repos, loading: false, error: null })),
      startWith(this.initialState),
      catchError((err) => {
        console.error('Ошибка при загрузке репозиториев:', err);
        const errorMessage =
          'Не удалось загрузить проекты. Проверьте консоль или попробуйте позже.';
        return of<ReposState>({ repos: [], loading: false, error: errorMessage });
      })
    ),
    { initialValue: this.initialState }
  );
  public readonly repos = computed(() => this.reposState().repos);
  public readonly isLoading = computed(() => this.reposState().loading);
  public readonly errorMsg = computed(() => this.reposState().error);
  private readonly searchTerm = toSignal(
    this.searchControl.valueChanges.pipe(startWith(''), debounceTime(300), distinctUntilChanged())
  );
  public readonly filteredRepos = computed(() => {
    const allRepos = this.repos();
    const term = (this.searchTerm() || '').toLowerCase();
    if (!term) {
      return allRepos;
    }
    return allRepos.filter(
      (repo) =>
        repo.name.toLowerCase().includes(term) ||
        (repo.description && repo.description.toLowerCase().includes(term))
    );
  });
}
