import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SessionManager } from '../../../core/auth/session.manager';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nav-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './nav-header.component.html',
})
export class NavHeaderComponent {
  router = inject(Router);
  sessionManager = inject(SessionManager);

  logout = () => {
    this.sessionManager.clearSession();
    this.router.navigate(['/login']);
  };
}
