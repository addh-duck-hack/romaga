import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home')
  },
  {
    path: 'sobre-nosotros',
    loadComponent: () => import('./pages/about-us/about-us')
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contact-us/contact-us')
  },
  {
    path: 'servicios',
    loadComponent: () => import('./pages/services/services')
  },
  {
    path: '**',
    redirectTo: ''
  }
];
