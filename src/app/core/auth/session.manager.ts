import { Injectable, signal, computed } from '@angular/core';
import { LoginResponse } from './auth.models';

export interface SessionUser {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  updatedAt: Date;
}

@Injectable({ providedIn: 'root' })
export class SessionManager {
  // =========================
  // 🔒 PRIVATE SIGNALS
  // =========================
  private _user = signal<SessionUser | null>(null);
  private _token = signal<string | null>(null);
  private _isAdmin = signal<boolean | null>(false);

  // =========================
  // 🌍 PUBLIC READ-ONLY SIGNALS
  // =========================
  readonly user = computed(() => this._user());
  readonly token = computed(() => this._token());
  readonly isLoggedIn = computed(() => !!this._token());

  // ✅ FIX 1: Call _user() to get value, then access isAdmin property
  readonly isAdmin = computed(() => this._user()?.isAdmin ?? false);

  // =========================
  // 🚀 INIT (hydrate session)
  // =========================
  constructor() {
    this.restoreSession();
  }

  // =========================
  // 🔑 LOGIN
  // =========================
  // ✅ FIX 2: Update to accept ApiResponse or keep separate params
  // Option A: Accept ApiResponse
  startSession(response: LoginResponse): void {
    this._user.set(response.user);
    this._token.set(response.token);

    localStorage.setItem('user', JSON.stringify(response.user));
    localStorage.setItem('token', response.token);
  }

  // Option B: Keep separate params (current version is fine)
  // startSession(user: SessionUser, token: string): void {
  //   this._user.set(user);
  //   this._token.set(token);
  //   localStorage.setItem('user', JSON.stringify(user));
  //   localStorage.setItem('token', token);
  // }

  // =========================
  // 🚪 LOGOUT
  // =========================
  clearSession(): void {
    this._user.set(null);
    this._token.set(null);

    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }

  // =========================
  // ♻️ RESTORE ON REFRESH
  // =========================
  private restoreSession(): void {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
      this._user.set(JSON.parse(user));
      this._token.set(token);
    }
  }
}
