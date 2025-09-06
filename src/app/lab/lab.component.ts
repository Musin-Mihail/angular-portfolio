import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-lab',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gray-800 rounded-xl shadow-2xl p-8 animate-fade-in">
      <h1 class="text-4xl font-bold text-cyan-400 mb-4">Лаборатория Angular</h1>
      <p class="text-lg text-gray-400">
        Этот раздел посвящен демонстрации различных техник и возможностей Angular. Скоро здесь
        появятся интерактивные примеры для демонстрации NgZone, кастомных директив и Content
        Projection!
      </p>
    </div>
  `,
  styles: `
    @keyframes fade-in {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-fade-in {
      animation: fade-in 0.5s ease-out forwards;
    }
  `,
})
export class LabComponent {}
