import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { SessionManager } from '../../../core/auth/session.manager';

@Component({
  selector: 'app-nav-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
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
