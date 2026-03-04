import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true;
  }

  router.navigate(['/authentication/login']);
  return false;
};

export const adminGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    return true;
  }

  // Si no es admin, redirigir a login o dashboard según corresponda
  if (authService.isEstudiante()) {
    router.navigate(['/estudiante/dashboard']);
  } else {
    router.navigate(['/authentication/login']);
  }
  return false;
};

export const estudianteGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isEstudiante()) {
    return true;
  }

  // Si es admin, redirigir a admin
  if (authService.isAdmin()) {
    router.navigate(['/admin/dashboard']);
  } else {
    router.navigate(['/authentication/login']);
  }
  return false;
};
