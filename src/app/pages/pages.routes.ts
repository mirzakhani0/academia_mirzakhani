import { Routes } from '@angular/router';
import { StarterComponent } from './starter/starter.component';
import { CursosComponent } from './cursos/cursos.component';
import { BibliotecaComponent } from './biblioteca/biblioteca.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: StarterComponent,
    data: {
      title: 'Starter Page',
      urls: [
        { title: 'Dashboard', url: '/dashboards/dashboard1' },
        { title: 'Starter Page' },
      ],
    },
  },
  {
    path: 'cursos',
    component: CursosComponent,
    data: {
      title: 'Catálogo de Cursos',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Cursos' },
      ],
    },
  },
  {
    path: 'biblioteca',
    component: BibliotecaComponent,
    data: {
      title: 'Mi Biblioteca',
      urls: [
        { title: 'Dashboard', url: '/dashboard' },
        { title: 'Mi Biblioteca' },
      ],
    },
  },
];
