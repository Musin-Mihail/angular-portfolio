import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

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
  private username = 'Musin-Mihail';
  getRepos(): Observable<GithubRepo[]> {
    return this.http
      .get<GithubRepo[]>(
        `https://api.github.com/users/${this.username}/repos?sort=updated&direction=desc`
      )
      .pipe(
        catchError((error) => {
          console.error('Ошибка при загрузке репозиториев:', error);
          return of([]);
        })
      );
  }
}
