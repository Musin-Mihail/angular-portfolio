import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface BackendMessage {
  message: string;
}
@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private http = inject(HttpClient);
  private readonly backendUrl = 'https://dotnet-portfolio-production.up.railway.app/portfolio';
  getMessage(): Observable<BackendMessage> {
    return this.http.get<BackendMessage>(this.backendUrl);
  }
}
