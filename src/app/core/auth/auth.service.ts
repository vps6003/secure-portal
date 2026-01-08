import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthLogin, LoginResponse, VerifyTokenResponse } from './auth.models';
import { environment } from '../../../environments/environment';
import { LOADER_KIND } from '../http/loader.context';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  verifyToken = (): Observable<VerifyTokenResponse> =>
    this.http.get<VerifyTokenResponse>(environment.authVerifyTokenApiUrl, {
      context: new HttpContext().set(LOADER_KIND, 'auth'),
    });

  authLogin = (obj: AuthLogin): Observable<LoginResponse> =>
    this.http.post<LoginResponse>(environment.authLoginApiUrl, obj, {
      context: new HttpContext().set(LOADER_KIND, 'auth'),
    });

  authRegister = (obj: AuthLogin): Observable<{ message: string }> =>
    this.http.post<{ message: string }>(environment.authRegisterApiUrl, obj, {
      context: new HttpContext().set(LOADER_KIND, 'auth'),
    });
}
