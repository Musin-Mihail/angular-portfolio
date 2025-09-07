import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

const NAV_LINKS = [
  { path: '/', label: 'Обо мне', options: { exact: true } },
  { path: '/projects', label: 'Проекты', options: { exact: false } },
  { path: '/lab', label: 'Лаборатория', options: { exact: false } },
];
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public readonly navLinks = NAV_LINKS;
  public isMobileMenuOpen = signal(false);
  public closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
