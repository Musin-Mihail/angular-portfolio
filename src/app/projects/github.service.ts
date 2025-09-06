import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Интерфейс, описывающий структуру объекта репозитория с GitHub API.
 */
export interface GithubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private http = inject(HttpClient);
  private readonly GITHUB_API_URL = 'https://api.github.com';

  /**
   * Получает список репозиториев для указанного пользователя.
   * @param username Имя пользователя на GitHub.
   * @returns Observable с массивом репозиториев.
   */
  getRepos(username: string): Observable<GithubRepo[]> {
    const url = `${this.GITHUB_API_URL}/users/${username}/repos`;
    const params = new HttpParams().set('sort', 'updated').set('direction', 'desc');
    return this.http.get<GithubRepo[]>(url, { params });
  }
}
