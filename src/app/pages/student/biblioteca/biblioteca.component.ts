import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AcademiaService } from 'src/app/services/academia.service';

interface CursoContenido {
  id: number;
  nombre: string;
  categoria: string;
  contenidosDisponibles: number;
  icono: string;
  gradiente: string;
  contenidosPDF: number;
  contenidosVideo: number;
}

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatCardModule, CommonModule, RouterLink],
  template: `
    <div class="biblioteca-container">
      <div class="biblioteca-header">
        <h1>Mi Biblioteca</h1>
        <p>Accede al contenido de tus cursos matriculados</p>
      </div>

      <!-- Loading State -->
      <div class="loading-state" *ngIf="loading">
        <mat-icon class="loading-icon">sync</mat-icon>
        <p>Cargando tu biblioteca...</p>
      </div>

      <!-- Empty State -->
      <div class="empty-state" *ngIf="!loading && cursosMatriculados.length === 0">
        <mat-icon>menu_book</mat-icon>
        <h2>No tienes cursos matriculados</h2>
        <p>Para acceder a la biblioteca, primero debes matricularte en algún curso</p>
        <a routerLink="/cursos-public" mat-raised-button color="primary">
          <mat-icon>school</mat-icon>
          <span>Ver Cursos Disponibles</span>
        </a>
      </div>

      <!-- Biblioteca Content -->
      <div class="biblioteca-content" *ngIf="!loading && cursosMatriculados.length > 0">
        <div class="cursos-biblioteca">
          <div class="curso-biblioteca-card" *ngFor="let curso of cursosMatriculados">
            <div class="curso-header" [style.background]="curso.gradiente">
              <mat-icon>{{curso.icono}}</mat-icon>
            </div>
            <div class="curso-body">
              <span class="curso-categoria">{{curso.categoria}}</span>
              <h3>{{curso.nombre}}</h3>
              <div class="curso-stats">
                <div class="stat-item">
                  <mat-icon>description</mat-icon>
                  <span>{{curso.contenidosPDF}} PDFs</span>
                </div>
                <div class="stat-item">
                  <mat-icon>play_circle</mat-icon>
                  <span>{{curso.contenidosVideo}} Videos</span>
                </div>
              </div>
              <a routerLink="/estudiante/curso/{{curso.id}}" mat-raised-button color="primary" class="btn-acceder">
                <mat-icon>visibility</mat-icon>
                <span>Ver Contenido</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Estadísticas de Biblioteca -->
        <div class="biblioteca-stats">
          <h3>Resumen de tu Biblioteca</h3>
          <div class="stats-grid">
            <div class="stat-card">
              <mat-icon>school</mat-icon>
              <span class="stat-value">{{cursosMatriculados.length}}</span>
              <span class="stat-label">Cursos Matriculados</span>
            </div>
            <div class="stat-card">
              <mat-icon>description</mat-icon>
              <span class="stat-value">{{totalPDFs}}</span>
              <span class="stat-label">PDFs Disponibles</span>
            </div>
            <div class="stat-card">
              <mat-icon>play_circle</mat-icon>
              <span class="stat-value">{{totalVideos}}</span>
              <span class="stat-label">Videos Disponibles</span>
            </div>
            <div class="stat-card">
              <mat-icon>folder</mat-icon>
              <span class="stat-value">{{totalContenidos}}</span>
              <span class="stat-label">Total Contenidos</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style>
      .biblioteca-container {
        padding: 24px;
        background: #f8fafc;
        min-height: 100vh;
      }

      .biblioteca-header {
        margin-bottom: 32px;
      }

      .biblioteca-header h1 {
        font-size: 32px;
        font-weight: 900;
        color: #1e293b;
        margin: 0 0 8px;
      }

      .biblioteca-header p {
        font-size: 15px;
        color: #64748b;
        margin: 0;
      }

      /* Loading & Empty States */
      .loading-state, .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 80px 20px;
        background: white;
        border-radius: 20px;
        text-align: center;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
      }

      .loading-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
        color: #f97316;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      .loading-state p, .empty-state p {
        color: #64748b;
        margin: 16px 0 0;
        font-size: 15px;
      }

      .empty-state mat-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        color: #cbd5e1;
        margin-bottom: 24px;
      }

      .empty-state h2 {
        font-size: 24px;
        font-weight: 800;
        color: #1e293b;
        margin: 0 0 8px;
      }

      .empty-state button {
        margin-top: 24px;
      }

      /* Cursos Biblioteca */
      .biblioteca-content {
        display: flex;
        flex-direction: column;
        gap: 32px;
      }

      .cursos-biblioteca {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 24px;
      }

      .curso-biblioteca-card {
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
        transition: transform 0.3s, box-shadow 0.3s;
      }

      .curso-biblioteca-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
      }

      .curso-header {
        height: 140px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }

      .curso-header mat-icon {
        font-size: 60px;
        width: 60px;
        height: 60px;
        color: white;
        opacity: 0.9;
      }

      .curso-body {
        padding: 24px;
      }

      .curso-categoria {
        display: inline-block;
        background: #eff6ff;
        color: #3b82f6;
        padding: 5px 12px;
        border-radius: 50px;
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        margin-bottom: 12px;
      }

      .curso-body h3 {
        font-size: 18px;
        font-weight: 800;
        color: #1e293b;
        margin: 0 0 16px;
      }

      .curso-stats {
        display: flex;
        gap: 16px;
        margin-bottom: 20px;
      }

      .stat-item {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        color: #64748b;
      }

      .stat-item mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
        color: #f97316;
      }

      .btn-acceder {
        width: 100%;
        font-weight: 700;
      }

      /* Biblioteca Stats */
      .biblioteca-stats {
        background: white;
        padding: 32px;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
      }

      .biblioteca-stats h3 {
        font-size: 20px;
        font-weight: 800;
        color: #1e293b;
        margin: 0 0 24px;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 20px;
      }

      .stat-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        background: #f8fafc;
        border-radius: 12px;
        border: 2px solid #e2e8f0;
        transition: all 0.3s;
      }

      .stat-card:hover {
        border-color: #f97316;
        background: #fff7ed;
      }

      .stat-card mat-icon {
        font-size: 32px;
        width: 32px;
        height: 32px;
        color: #f97316;
        margin-bottom: 12px;
      }

      .stat-value {
        font-size: 28px;
        font-weight: 900;
        color: #1e293b;
        margin-bottom: 4px;
      }

      .stat-label {
        font-size: 12px;
        color: #64748b;
        text-align: center;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .biblioteca-container {
          padding: 16px;
        }

        .biblioteca-header h1 {
          font-size: 24px;
        }

        .cursos-biblioteca {
          grid-template-columns: 1fr;
        }

        .stats-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    </style>
  `
})
export class BibliotecaComponent implements OnInit {
  loading = true;
  cursosMatriculados: CursoContenido[] = [];
  totalPDFs = 0;
  totalVideos = 0;
  totalContenidos = 0;

  constructor(
    private authService: AuthService,
    private academiaService: AcademiaService
  ) {}

  ngOnInit(): void {
    this.cargarBiblioteca();
  }

  private cargarBiblioteca(): void {
    // Suscribirse al usuario actual
    this.authService.estudiante$.subscribe(estudiante => {
      if (!estudiante) {
        this.loading = false;
        return;
      }

      // Obtener IDs de cursos matriculados
      const cursosIds = estudiante.cursosMatriculados || [];

      if (cursosIds.length === 0) {
        this.cursosMatriculados = [];
        this.loading = false;
        return;
      }

      // Obtener todos los cursos y filtrar los matriculados
      const todosLosCursos = this.academiaService.getCursos();
      
      // Mapear cursos matriculados con su contenido
      this.cursosMatriculados = cursosIds.map(id => {
        const curso = todosLosCursos.find(c => c.id === id);
        const contenidos = this.academiaService.getContenidosByCurso(id);
        
        return {
          id: id,
          nombre: curso?.nombre || 'Curso',
          categoria: curso?.categoria || 'General',
          contenidosDisponibles: contenidos.length,
          contenidosPDF: contenidos.filter(c => c.tipo === 'pdf').length,
          contenidosVideo: contenidos.filter(c => c.tipo === 'video').length,
          icono: this.getIconoPorCategoria(curso?.categoria || ''),
          gradiente: this.getGradientePorCategoria(curso?.categoria || '')
        };
      });

      // Calcular totales
      this.totalPDFs = this.cursosMatriculados.reduce((sum, c) => sum + c.contenidosPDF, 0);
      this.totalVideos = this.cursosMatriculados.reduce((sum, c) => sum + c.contenidosVideo, 0);
      this.totalContenidos = this.totalPDFs + this.totalVideos;

      this.loading = false;
    });
  }

  private getIconoPorCategoria(categoria: string): string {
    const iconos: { [key: string]: string } = {
      'Matemáticas': 'functions',
      'Física': 'rocket_launch',
      'Química': 'biotech',
      'Biología': 'science',
      'Letras': 'menu_book'
    };
    return iconos[categoria] || 'school';
  }

  private getGradientePorCategoria(categoria: string): string {
    const gradientes: { [key: string]: string } = {
      'Matemáticas': 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
      'Física': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      'Química': 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      'Biología': 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
      'Letras': 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)'
    };
    return gradientes[categoria] || 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)';
  }
}
