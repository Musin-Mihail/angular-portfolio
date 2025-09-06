import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gray-800 rounded-xl shadow-2xl p-8 animate-fade-in">
      <h1 class="text-5xl font-bold text-cyan-400 mb-4">Привет, я [Ваше Имя]!</h1>
      <p class="text-xl text-gray-300 mb-6">
        Frontend-разработчик, увлеченный созданием интерактивных и производительных веб-приложений с помощью Angular.
      </p>
      <p class="text-lg text-gray-400 mb-8">
        Это портфолио — не просто визитка, а "живая" демонстрация моих навыков. Каждый раздел здесь — это небольшой проект, показывающий, как я решаю практические задачи.
      </p>

      <div class="border-t border-gray-700 pt-6">
        <h2 class="text-3xl font-bold text-cyan-300 mb-4">Ключевые навыки:</h2>
        <div class="flex flex-wrap gap-4">
          <span class="skill-badge">Angular</span>
          <span class="skill-badge">TypeScript</span>
          <span class="skill-badge">RxJS</span>
          <span class="skill-badge">Signals</span>
          <span class="skill-badge">Standalone Components</span>
          <span class="skill-badge">NgRx</span>
          <span class="skill-badge">SCSS/Tailwind</span>
          <span class="skill-badge">Тестирование (Jest/Jasmine)</span>
        </div>
      </div>
    </div>
  `,
  styles: `
    .skill-badge {
      @apply bg-cyan-800/50 text-cyan-300 text-lg px-4 py-2 rounded-lg font-medium;
    }
    @keyframes fade-in {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in {
      animation: fade-in 0.5s ease-out forwards;
    }
  `
})
export class HomeComponent {

}
