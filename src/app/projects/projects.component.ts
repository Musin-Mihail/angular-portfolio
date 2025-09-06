import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, finalize, startWith, tap } from 'rxjs/operators';

import { GithubService } from './github.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="animate-fade-in">
      <div class="bg-gray-800 rounded-xl shadow-2xl p-8 mb-8">
        <h1 class="text-4xl font-bold text-cyan-400 mb-4">Мои проекты на GitHub</h1>
        <p class="text-lg text-gray-400 mb-6">
          Здесь вы можете найти список моих проектов, загруженных напрямую с GitHub API.
          Воспользуйтесь поиском для фильтрации в реальном времени.
        </p>
        <input
          [formControl]="searchControl"
          type="text"
          placeholder="Поиск по названию..."
          class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow duration-300"
        />
      </div>

      <!-- Отображение состояния загрузки -->
      @if (isLoading()) {
      <div class="flex justify-center items-center h-64">
        <div class="loader"></div>
      </div>
      }

      <!-- Отображение ошибки -->
      @if (errorMsg()) {
      <div
        class="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center"
      >
        <p class="font-bold">Ошибка!</p>
        <p>{{ errorMsg() }}</p>
      </div>
      } @if (!isLoading() && !errorMsg()) {
      <!-- Отображение проектов -->
      @if (filteredRepos().length > 0) {
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        @for (repo of filteredRepos(); track repo.name) {
        <a [href]="repo.html_url" target="_blank" class="repo-card group">
          <div>
            <h3 class="text-2xl font-bold text-cyan-400 group-hover:underline mb-2">
              {{ repo.name }}
            </h3>
            <p class="text-gray-400 mb-4 h-24 overflow-hidden">
              {{ repo.description || 'Нет описания.' }}
            </p>
          </div>
          <div
            class="flex justify-between items-center text-gray-500 mt-auto pt-4 border-t border-gray-700"
          >
            <span
              class="inline-flex items-center text-sm font-medium px-2.5 py-1 rounded-full"
              [ngClass]="getLanguageClass(repo.language)"
            >
              {{ repo.language || 'N/A' }}
            </span>
            <div class="flex space-x-4">
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  ></path>
                </svg>
                {{ repo.stargazers_count }}
              </span>
              <span class="flex items-center">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    fill-rule="evenodd"
                    d="M8.75 2.75a.75.75 0 00-1.5 0V3.5h-1a.75.75 0 000 1.5h1v1.25a.75.75 0 001.5 0V5h1.25a.75.75 0 000-1.5H8.75V2.75zM10.5 7.25a.75.75 0 000-1.5H6.75a.75.75 0 000 1.5h3.75zM5 10.75a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H5.75a.75.75 0 01-.75-.75zm.75 3.25a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                {{ repo.forks_count }}
              </span>
            </div>
          </div>
        </a>
        }
      </div>
      } @else {
      <div class="text-center py-16 text-gray-500">
        <p class="text-2xl">Проекты не найдены.</p>
        <p>Попробуйте изменить поисковый запрос или проверьте имя пользователя в GithubService.</p>
      </div>
      } }
    </div>
  `,
  styles: `
    .repo-card {
      @apply bg-gray-800 rounded-xl p-6 flex flex-col;
      @apply shadow-lg hover:shadow-cyan-500/20 transform hover:-translate-y-2 transition-all duration-300;
      border: 1px solid transparent;
      &:hover {
        border-color: #22d3ee;
      }
    }
    .loader {
      width: 50px;
      aspect-ratio: 1;
      border-radius: 50%;
      border: 8px solid #5eead4;
      border-right-color: #115e59;
      animation: l2 1s infinite linear;
    }
    @keyframes l2 {to{transform: rotate(1turn)}}
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fade-in 0.5s ease-out forwards;
    }
  `,
})
export class ProjectsComponent {
  private githubService = inject(GithubService);
  isLoading = signal(true);
  errorMsg = signal<string | null>(null);
  searchControl = new FormControl('');
  private searchTerm = toSignal(
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      startWith('')
    ),
    { initialValue: '' }
  );
  private repos = toSignal(
    this.githubService.getRepos().pipe(
      tap(() => {
        this.isLoading.set(true);
        this.errorMsg.set(null);
      }),
      catchError((err) => {
        this.errorMsg.set('Не удалось загрузить проекты. Пожалуйста, попробуйте позже.');
        console.error(err);
        return of([]);
      }),
      finalize(() => this.isLoading.set(false))
    ),
    { initialValue: [] }
  );
  filteredRepos = computed(() => {
    const allRepos = this.repos();
    const term = (this.searchTerm() || '').toLowerCase();
    if (!Array.isArray(allRepos)) {
      return [];
    }
    return allRepos.filter((repo) => repo.name.toLowerCase().includes(term));
  });
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

