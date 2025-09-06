import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, startWith } from 'rxjs/operators';

import { GithubRepo, GithubService } from './github.service';

// Интерфейс для управления состоянием компонента
interface GithubState {
  repos: GithubRepo[];
  loading: boolean;
  error: string | null;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent {
  private githubService = inject(GithubService);
  searchControl = new FormControl('');

  // Единый сигнал для хранения состояния
  private state = signal<GithubState>({
    repos: [],
    loading: true,
    error: null,
  });

  // Вычисляемые сигналы для удобного доступа к состоянию в шаблоне
  repos = computed(() => this.state().repos);
  isLoading = computed(() => this.state().loading);
  errorMsg = computed(() => this.state().error);

  // Сигнал для поискового запроса
  private searchTerm = toSignal(
    this.searchControl.valueChanges.pipe(debounceTime(300), distinctUntilChanged(), startWith('')),
    { initialValue: '' }
  );

  // Вычисляемый сигнал для отфильтрованных репозиториев
  filteredRepos = computed(() => {
    const allRepos = this.repos();
    const term = (this.searchTerm() || '').toLowerCase();
    if (!Array.isArray(allRepos)) {
      return [];
    }
    return allRepos.filter((repo) => repo.name.toLowerCase().includes(term));
  });

  constructor() {
    this.loadRepos();
  }

  // Метод для загрузки репозиториев
  private loadRepos() {
    this.state.update((state) => ({ ...state, loading: true, error: null }));
    this.githubService
      .getRepos('Musin-Mihail')
      .pipe(
        catchError((err) => {
          console.error(err);
          this.state.update((state) => ({
            ...state,
            error: 'Не удалось загрузить проекты. Пожалуйста, попробуйте позже.',
            repos: [],
          }));
          return of([]);
        })
      )
      .subscribe((repos) => {
        this.state.update((state) => ({
          ...state,
          repos,
          loading: false,
        }));
      });
  }

  getLanguageClass(language: string): string {
    const lang = (language || 'default').toLowerCase();
    switch (lang) {
      case 'typescript':
        return 'bg-blue-900/50 text-blue-300';
      case 'javascript':
        return 'bg-yellow-900/50 text-yellow-300';
      case 'html':
        return 'bg-orange-900/50 text-orange-300';
      case 'scss':
        return 'bg-pink-900/50 text-pink-300';
      default:
        return 'bg-gray-700/50 text-gray-300';
    }
  }
}
