import { Routes } from '@angular/router';
import { HomeComponent } from '../features/home/home.component';
import { AuthComponent } from '../features/auth/auth.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
