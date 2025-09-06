import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html', // Используем внешний шаблон
  styleUrls: ['./app.component.scss'], // Используем внешние стили
})
export class AppComponent {}
