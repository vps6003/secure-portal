import { bootstrapApplication } from '@angular/platform-browser';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppComponent } from './app/shell/app.component';
import { appConfig } from './app/bootstrap/app.config';

bootstrapApplication(AppComponent, {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideAnimations(), // REQUIRED for snackbar
    ...appConfig.providers!,
  ],
}).catch(console.error);
