import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification.service';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { SessionManager } from '../auth/session.manager';

let handling401 = false;

export const ErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const notify = inject(NotificationService);
  const router = inject(Router);
  const sessionManager = inject(SessionManager);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        notify.error('Network error. Please check your connection.');
        return throwError(() => error);
      }

      if (error.status === 401 && !handling401) {
        handling401 = true;
        sessionManager.clearSession();
        router.navigate(['/login']).finally(() => {
          handling401 = false;
        });
        return throwError(() => error);
      }

      const message =
        error.error?.message || error.error?.error || error.message || 'Something went wrong';

      notify.error(message);

      return throwError(() => error);
    })
  );
};
