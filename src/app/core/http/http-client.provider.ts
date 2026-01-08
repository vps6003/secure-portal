import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoadingInterceptor } from './loading.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { AuthInterceptor } from '../auth/auth.interceptor';

export const httpClientProvider = provideHttpClient(
  withInterceptors([
    LoadingInterceptor,
    AuthInterceptor,
    ErrorInterceptor, // must be LAST
  ])
);
