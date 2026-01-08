// src/app/core/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionManager } from '../session.manager';

export const authGuard: CanActivateFn = () => {
  const sessionManager = inject(SessionManager);
  const router = inject(Router);

  if (sessionManager.isLoggedIn()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
