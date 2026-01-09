import { computed, inject, Injectable, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../shared/services/dashboard.service';
import { SessionManager } from '../../../core/auth/session.manager';
import { DashboardServiceImpl } from './dashboard.service.impl';

@Injectable({ providedIn: 'root' })
export class ProfileServiceImpl {
  private dashboardService = inject(DashboardService);
  private dashboardServiceImpl = inject(DashboardServiceImpl);
  private session = inject(SessionManager);

  // state
  user = signal<any>(null);
  loading = signal(true);
  users = signal<any[]>([]);
  hasUsers = computed(() => this.dashboardServiceImpl.users().length > 0);

  getUsers() {
    if (this.hasUsers()) {
      this.users.set(this.dashboardServiceImpl.users());
      const users: any[] = this.users() ?? [];
      this.user.set(users[this.userId - 1]);
      return;
    }
    this.dashboardService.getUsers().subscribe({
      next: (res) => {
        // API returns ARRAY → extract first user
        this.user.set(res[this.userId - 1] ?? null);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Profile fetch failed', err);
        this.loading.set(false);
      },
    });
  }

  get userId(): number {
    const user: any = this.session.user();
    return user?.userId ?? 1;
  }
}
