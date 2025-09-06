import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component'; // Обновленный импорт

bootstrapApplication(AppComponent, appConfig) // Используем AppComponent
  .catch((err) => console.error(err));
