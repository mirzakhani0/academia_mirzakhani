import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { authGuard, adminGuard, estudianteGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Rutas Públicas (Visitante)
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
      {
        path: 'inicio',
        loadComponent: () => import('./pages/public/inicio/inicio.component').then(m => m.InicioComponent),
      },
      {
        path: 'cursos-public',
        loadComponent: () => import('./pages/public/cursos-public/cursos-public.component').then(m => m.CursosPublicComponent),
      },
    ],
  },
  
  // Rutas de Autenticación
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () => import('./pages/authentication/authentication.routes').then((m) => m.AuthenticationRoutes),
      },
      {
        path: 'registro',
        redirectTo: 'cursos-public',
        pathMatch: 'full',
      },
    ],
  },
  
  // Rutas de Estudiante
  {
    path: 'estudiante',
    loadComponent: () => import('./layouts/student-layout/student-layout.component').then(m => m.StudentLayoutComponent),
    canActivate: [estudianteGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/student/student-dashboard/student-dashboard.component').then(m => m.StudentDashboardComponent),
      },
      {
        path: 'mis-cursos',
        loadComponent: () => import('./pages/student/mis-cursos/mis-cursos.component').then(m => m.MisCursosComponent),
      },
      {
        path: 'curso/:id',
        loadComponent: () => import('./pages/student/curso-detalle/curso-detalle.component').then(m => m.CursoDetalleComponent),
      },
      {
        path: 'biblioteca',
        loadComponent: () => import('./pages/student/biblioteca/biblioteca.component').then(m => m.BibliotecaComponent),
      },
      {
        path: 'perfil',
        loadComponent: () => import('./pages/student/perfil/perfil.component').then(m => m.PerfilComponent),
      },
    ],
  },
  
  // Rutas de Administrador
  {
    path: 'admin',
    loadComponent: () => import('./layouts/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
      },
      {
        path: 'cursos',
        loadComponent: () => import('./pages/admin/gestion-cursos/gestion-cursos.component').then(m => m.GestionCursosComponent),
      },
      {
        path: 'usuarios',
        loadComponent: () => import('./pages/admin/gestion-usuarios/gestion-usuarios.component').then(m => m.GestionUsuariosComponent),
      },
      {
        path: 'contenido',
        loadComponent: () => import('./pages/admin/gestion-contenido/gestion-contenido.component').then(m => m.GestionContenidoComponent),
      },
      {
        path: 'matriculas',
        loadComponent: () => import('./pages/admin/gestion-matriculas/gestion-matriculas.component').then(m => m.GestionMatriculasComponent),
      },
      {
        path: 'reportes',
        loadComponent: () => import('./pages/admin/reportes/reportes.component').then(m => m.ReportesComponent),
      },
    ],
  },
  
  // Rutas Antiguas (Redirigir a inicio)
  {
    path: 'dashboard',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'biblioteca',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
  {
    path: 'ui-components',
    loadChildren: () => import('./pages/ui-components/ui-components.routes').then((m) => m.UiComponentsRoutes),
  },
  {
    path: 'extra',
    loadChildren: () => import('./pages/extra/extra.routes').then((m) => m.ExtraRoutes),
  },
  
  // Ruta por defecto (404)
  {
    path: '**',
    redirectTo: 'inicio',
  },
];
