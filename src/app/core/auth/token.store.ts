import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TokenStore {
  // =========================
  // 🔒 PRIVATE SIGNAL
  // =========================
  private _token = signal<string | null>(null);

  // =========================
  // 🌍 PUBLIC READ-ONLY SIGNALS
  // =========================
  readonly token = computed(() => this._token());
  readonly hasToken = computed(() => !!this._token());

  // =========================
  // 🚀 INIT (hydrate token)
  // =========================
  constructor() {
    this.restore();
  }

  // =========================
  // 🔑 SET TOKEN
  // =========================
  set(token: string): void {
    this._token.set(token);
    localStorage.setItem('token', token);
  }

  // =========================
  // ❌ CLEAR TOKEN
  // =========================
  clear(): void {
    this._token.set(null);
    localStorage.removeItem('token');
  }

  // =========================
  // ♻️ RESTORE TOKEN
  // =========================
  private restore(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this._token.set(token);
    }
  }
}
