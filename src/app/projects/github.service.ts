import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GithubRepo } from './github.models';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private http = inject(HttpClient);
  private readonly GITHUB_API_URL = 'https://api.github.com';
  getRepos(username: string): Observable<GithubRepo[]> {
    const url = `${this.GITHUB_API_URL}/users/${username}/repos?sort=updated&direction=desc`;
    return this.http.get<GithubRepo[]>(url);
  }
}
