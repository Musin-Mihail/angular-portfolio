import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'projects',
    loadComponent: () => import('./projects/projects.component').then((m) => m.ProjectsComponent),
  },
  {
    path: 'lab',
    loadComponent: () => import('./lab/lab.component').then((m) => m.LabComponent),
    children: [
      {
        path: 'directives',
        loadComponent: () =>
          import('./lab/lab-directives/lab-directives.component').then(
            (m) => m.LabDirectivesComponent
          ),
      },
      {
        path: 'ngzone',
        loadComponent: () =>
          import('./lab/lab-ng-zone/lab-ng-zone.component').then((m) => m.LabNgZoneComponent),
      },
      { path: '', redirectTo: 'ngzone', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '' },
];
