import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './admin-layout.component.html'
})
export class AdminLayoutComponent {
  pageTitle = 'Dashboard';

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.updatePageTitle();
    });
  }

  updatePageTitle() {
    const url = this.router.url;
    if (url.includes('cursos')) {
      this.pageTitle = 'Gestión de Cursos';
    } else if (url.includes('usuarios')) {
      this.pageTitle = 'Gestión de Usuarios';
    } else if (url.includes('contenido')) {
      this.pageTitle = 'Gestión de Contenido';
    } else if (url.includes('reportes')) {
      this.pageTitle = 'Reportes y Estadísticas';
    } else {
      this.pageTitle = 'Dashboard';
    }
  }
}
