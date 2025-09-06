import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
   * Fetches repositories for a given GitHub username.
   * @param username The GitHub username.
   * @returns An Observable of GithubRepo array.
   */
  getRepos(username: string): Observable<GithubRepo[]> {
    return this.http.get<GithubRepo[]>(
      `${this.GITHUB_API_URL}/users/${username}/repos?sort=updated&direction=desc`
    );
  }
}

