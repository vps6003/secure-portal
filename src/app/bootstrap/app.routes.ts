// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { loginGuard } from '../core/auth/guards/login.guard';
import { authGuard } from '../core/auth/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [loginGuard],
    loadComponent: () => import('./../features/auth/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadComponent: () => import('./../features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];
