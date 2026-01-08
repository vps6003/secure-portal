import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../core/models/api-response.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private http = inject(HttpClient);
  private API = 'https://jsonplaceholder.typicode.com/posts';
  private usersAPI = 'https://jsonplaceholder.typicode.com/users';

  getPosts(page: number, limit: number, search: string): Observable<Post[]> {
    let params = new HttpParams().set('_page', page).set('_limit', limit);

    if (search) {
      params = params.set('q', search);
    }

    return this.http.get<Post[]>(this.API, { params });
  }

  getUsers(): Observable<any> {
    return this.http.get<Post[]>(this.usersAPI);
  }
}
