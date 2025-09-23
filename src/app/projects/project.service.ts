import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment'; // 1. Импортируем окружение
import { Project } from './project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private http = inject(HttpClient);

  private readonly apiUrl = `${environment.apiUrl}/api/Projects`;

  /**
   * Fetches the list of projects from the backend API.
   * @returns An Observable array of projects.
   */
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl);
  }
}
