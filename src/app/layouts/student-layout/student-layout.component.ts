import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-layout',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './student-layout.component.html'
})
export class StudentLayoutComponent {
  pageTitle = 'Dashboard';

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.updatePageTitle();
    });
  }

  updatePageTitle() {
    const url = this.router.url;
    if (url.includes('mis-cursos')) {
      this.pageTitle = 'Mis Cursos';
    } else if (url.includes('biblioteca')) {
      this.pageTitle = 'Biblioteca';
    } else if (url.includes('perfil')) {
      this.pageTitle = 'Mi Perfil';
    } else if (url.includes('curso/')) {
      this.pageTitle = 'Detalle del Curso';
    } else {
      this.pageTitle = 'Dashboard';
    }
  }
}
