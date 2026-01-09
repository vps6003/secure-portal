import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../../core/models/api-response.model';
import { environment } from '../../../environments/environment';
import { SessionManager } from '../../core/auth/session.manager';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private http = inject(HttpClient);
  private postAPI = `${environment.baseApi}posts`;
  private usersAPI = `${environment.baseApi}users`;
  private session = inject(SessionManager);

  getPosts(page: number, limit: number, search: string): Observable<Post[]> {
    let params = new HttpParams().set('_page', page).set('_limit', limit);

    if (search) {
      params = params.set('q', search);
    }
    return this.http.get<Post[]>(this.postAPI, { params });
  }

  getUsers(): Observable<any> {
    return this.http.get<Post[]>(this.usersAPI);
  }

  getUser(id: any): Observable<any> {
    let params = new HttpParams().set('id', id);
    return this.http.get<Post[]>(this.usersAPI, { params });
  }

  get userId() {
    const user: any = this.session.user();
    return user?.userId;
  }
}
