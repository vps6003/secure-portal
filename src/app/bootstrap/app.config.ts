import { ApplicationConfig } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { httpClientProvider } from '../core/http/http-client.provider';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withHashLocation()), httpClientProvider],
};
