import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  // Указываем, что компонент является standalone
  standalone: true,
  // Импортируем RouterOutlet для работы с маршрутизацией
  imports: [RouterOutlet],
  // Прямое указание шаблона и стилей
  template: `
    <!-- Основное место для отображения компонентов в зависимости от маршрута -->
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class App {}
