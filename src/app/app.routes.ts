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
        path: 'interceptor',
        loadComponent: () =>
          import('./lab/lab-interceptor/lab-interceptor.component').then(
            (m) => m.LabInterceptorComponent
          ),
      },
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
      {
        path: 'projection',
        loadComponent: () =>
          import('./lab/lab-projection/lab-projection.component').then(
            (m) => m.LabProjectionComponent
          ),
      },
      {
        path: 'pipes',
        loadComponent: () =>
          import('./lab/lab-pipes/lab-pipes.component').then((m) => m.LabPipesComponent),
      },
      {
        path: 'pipes-advanced',
        loadComponent: () =>
          import('./lab/lab-pipes-advanced/lab-pipes-advanced.component').then(
            (m) => m.LabPipesAdvancedComponent
          ),
      },
      {
        path: 'ui-elements',
        loadComponent: () =>
          import('./lab/lab-ui-elements/lab-ui-elements.component').then(
            (m) => m.LabUiElementsComponent
          ),
      },
      { path: '', redirectTo: 'interceptor', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '' },
];
