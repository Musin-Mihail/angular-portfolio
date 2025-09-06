import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  // Импортируем RouterOutlet, RouterLink и RouterLinkActive для навигации
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-gray-900 text-white font-sans">
      <header class="bg-gray-800 shadow-lg">
        <nav class="container mx-auto px-6 py-4 flex justify-between items-center">
          <div class="text-2xl font-bold text-cyan-400">
            <a routerLink="/">Интерактивная Лаборатория</a>
          </div>
          <div class="flex space-x-6 text-lg">
            <a
              routerLink="/"
              routerLinkActive="text-cyan-400 border-b-2 border-cyan-400"
              [routerLinkActiveOptions]="{exact: true}"
              class="hover:text-cyan-300 transition-colors duration-300 pb-1">
              Обо мне
            </a>
            <a
              routerLink="/projects"
              routerLinkActive="text-cyan-400 border-b-2 border-cyan-400"
              class="hover:text-cyan-300 transition-colors duration-300 pb-1">
              Проекты
            </a>
            <a
              routerLink="/lab"
              routerLinkActive="text-cyan-400 border-b-2 border-cyan-400"
              class="hover:text-cyan-300 transition-colors duration-300 pb-1">
              Лаборатория
            </a>
          </div>
        </nav>
      </header>
      <main class="container mx-auto px-6 py-12">
        <!-- Здесь будут отображаться компоненты в зависимости от маршрута -->
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [],
})
export class App {}
