import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    // По умолчанию будет открываться HomeComponent
    { path: '', component: HomeComponent },
    // TODO: Добавить ленивую загрузку для других маршрутов
];
