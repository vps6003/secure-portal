import { Injectable, signal, computed } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private globalRequests = signal(0);
  private authRequests = signal(0);

  // global loader (overlay, spinner)
  readonly isGlobalLoading = computed(() => this.globalRequests() > 0);

  // auth loader (login / register buttons)
  readonly isAuthLoading = computed(() => this.authRequests() > 0);

  showGlobal(): void {
    this.globalRequests.update((c) => c + 1);
  }

  hideGlobal(): void {
    this.globalRequests.update((c) => Math.max(0, c - 1));
  }

  showAuth(): void {
    this.authRequests.update((c) => c + 1);
  }

  hideAuth(): void {
    this.authRequests.update((c) => Math.max(0, c - 1));
  }
}
