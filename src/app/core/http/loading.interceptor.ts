import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';
import { LOADER_KIND } from './loader.context';

export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(LoaderService);
  const kind = req.context.get(LOADER_KIND);

  if (kind === 'none') {
    return next(req);
  }

  if (kind === 'global') {
    loader.showGlobal();
  }

  if (kind === 'auth') {
    loader.showAuth();
  }

  return next(req).pipe(
    finalize(() => {
      setTimeout(() => {
        if (kind === 'global') {
          loader.hideGlobal();
        }
        if (kind === 'auth') {
          loader.hideAuth();
        }
      }, 0);
    })
  );
};
