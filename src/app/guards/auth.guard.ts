import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map, take, filter, timeout } from 'rxjs';

export const authGuard = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Esperar a que Firebase termine de inicializar
  return authService.isInitializing$.pipe(
    filter(isInitializing => !isInitializing), // Esperar hasta que no esté inicializando
    take(1),
    map(() => {
      if (authService.isLoggedIn()) {
        return true;
      }
      router.navigate(['/authentication/login']);
      return false;
    })
  );
};

export const adminGuard = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isInitializing$.pipe(
    filter(isInitializing => !isInitializing),
    take(1),
    map(() => {
      if (authService.isAdmin()) {
        return true;
      }

      if (authService.isEstudiante()) {
        router.navigate(['/estudiante/dashboard']);
      } else {
        router.navigate(['/authentication/login']);
      }
      return false;
    })
  );
};

export const estudianteGuard = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isInitializing$.pipe(
    filter(isInitializing => !isInitializing),
    take(1),
    map(() => {
      if (authService.isEstudiante()) {
        return true;
      }

      if (authService.isAdmin()) {
        router.navigate(['/admin/dashboard']);
      } else {
        router.navigate(['/authentication/login']);
      }
      return false;
    })
  );
};
