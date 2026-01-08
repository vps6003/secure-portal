import { Injectable, signal } from '@angular/core';

const TOKEN_KEY = 'auth_token';

@Injectable({ providedIn: 'root' })
export class TokenStore {
  private tokenSignal = signal<string | null>(localStorage.getItem(TOKEN_KEY));

  token = this.tokenSignal.asReadonly();

  setToken(token: string): void {
    this.tokenSignal.set(token);
    localStorage.setItem(TOKEN_KEY, token);
  }

  clearToken(): void {
    this.tokenSignal.set(null);
    localStorage.removeItem(TOKEN_KEY);
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  isLoggedIn(): boolean {
    return !!this.tokenSignal();
  }
}
