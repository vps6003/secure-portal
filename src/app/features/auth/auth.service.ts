import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AuthLogin,
  LoginResponse,
  VerifyTokenResponse,
} from '../../core/models/api-response.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  verifyToken = (token: String): Observable<VerifyTokenResponse> =>
    this.http.get<VerifyTokenResponse>(environment.authVerifyTokenApiUrl);

  authLogin = (obj: AuthLogin): Observable<LoginResponse> =>
    this.http.get<LoginResponse>(environment.authLoginApiUrl);

  authRegister = (obj: AuthLogin): Observable<{ message: string }> =>
    this.http.get<{ message: string }>(environment.authRegisterApiUrl);
}
