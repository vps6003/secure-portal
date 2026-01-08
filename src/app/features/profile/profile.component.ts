import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../shared/services/dashboard.service';
import { SessionManager } from '../../core/auth/session.manager';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  private dashboardService = inject(DashboardService);
  private session = inject(SessionManager);

  // state
  user = signal<any | null>(null);
  loading = signal(true);

  ngOnInit(): void {
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

  get userId() {
    const user: any = this.session.user();
    return user?.userId ?? 1;
  }
}
