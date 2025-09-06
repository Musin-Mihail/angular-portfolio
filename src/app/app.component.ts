import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  navLinks = [
    { path: '/', label: 'Обо мне', options: { exact: true } },
    { path: '/projects', label: 'Проекты', options: { exact: false } },
    { path: '/lab', label: 'Лаборатория', options: { exact: false } },
  ];
}
