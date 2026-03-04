import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { AuthService, Estudiante } from 'src/app/services/auth.service';
import { AcademiaService } from 'src/app/services/academia.service';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [
    RouterLink, MatIconModule, MatButtonModule, MatCardModule,
    MatProgressBarModule, CommonModule
  ],
  template: `
    <div class="dashboard-container">
      <!-- Welcome Header -->
      <div class="welcome-header">
        <div class="welcome-content">
          <h1>¡Hola, {{estudiante?.nombre}}! 👋</h1>
          <p>Continúa donde lo dejaste y alcanza tus metas de aprendizaje</p>
        </div>
        <div class="welcome-actions">
          <a routerLink="/estudiante/mis-cursos" class="btn-primary">
            <mat-icon>school</mat-icon>
            <span>Mis Cursos</span>
          </a>
          <a routerLink="/estudiante/biblioteca" class="btn-secondary">
            <mat-icon>menu_book</mat-icon>
            <span>Biblioteca</span>
          </a>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon bg-orange">
            <mat-icon>class</mat-icon>
          </div>
          <div class="stat-content">
            <h3>{{cursosMatriculados.length}}</h3>
            <p>Cursos Inscritos</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon bg-green">
            <mat-icon>trending_up</mat-icon>
          </div>
          <div class="stat-content">
            <h3>{{progresoPromedio}}%</h3>
            <p>Progreso Promedio</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon bg-blue">
            <mat-icon>play_circle</mat-icon>
          </div>
          <div class="stat-content">
            <h3>12</h3>
            <p>Clases Vistas</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon bg-purple">
            <mat-icon>emoji_events</mat-icon>
          </div>
          <div class="stat-content">
            <h3>0</h3>
            <p>Certificados</p>
          </div>
        </div>
      </div>

      <!-- Mis Cursos Section -->
      <div class="section">
        <div class="section-header">
          <h2 class="section-title">Mis Cursos</h2>
          <a routerLink="/estudiante/mis-cursos" class="view-all">Ver todos</a>
        </div>

        <div class="cursos-grid" *ngIf="cursosMatriculados.length > 0">
          <div class="curso-card" *ngFor="let curso of cursosMatriculados">
            <div class="curso-header" [style.background]="curso.gradiente">
              <mat-icon class="curso-icon">{{curso.icono}}</mat-icon>
              <span class="curso-badge">{{curso.categoria}}</span>
            </div>
            <div class="curso-body">
              <h3 class="curso-title">{{curso.titulo}}</h3>
              
              <div class="progress-section">
                <div class="progress-header">
                  <span class="progress-label">Progreso</span>
                  <span class="progress-value">{{curso.progreso}}%</span>
                </div>
                <mat-progress-bar 
                  mode="determinate" 
                  [value]="curso.progreso"
                  class="progress-bar">
                </mat-progress-bar>
              </div>

              <div class="curso-meta">
                <span class="meta-item">
                  <mat-icon>play_circle</mat-icon>
                  {{curso.clasesVistas}}/{{curso.totalClases}} clases
                </span>
              </div>

              <a routerLink="/estudiante/curso/{{curso.id}}" class="btn-continue">
                <mat-icon>play_arrow</mat-icon>
                <span>Continuar</span>
              </a>
            </div>
          </div>
        </div>

        <div class="empty-state" *ngIf="cursosMatriculados.length === 0">
          <mat-icon>school</mat-icon>
          <h3>No tienes cursos inscritos</h3>
          <p>El administrador aún no te ha matriculado en ningún curso</p>
          <a routerLink="/cursos-public" class="btn-primary">
            <mat-icon>shopping_cart</mat-icon>
            <span>Ver Cursos Disponibles</span>
          </a>
        </div>
      </div>
    </div>

    <style>
      .dashboard-container {
        display: flex;
        flex-direction: column;
        gap: 32px;
        padding: 20px;
      }

      .welcome-header {
        background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
        border-radius: 24px;
        padding: 48px;
        text-align: center;
        color: white;
        box-shadow: 0 20px 60px rgba(220, 38, 38, 0.3);
        position: relative;
        overflow: hidden;
      }

      .welcome-header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        opacity: 0.3;
      }

      .welcome-content {
        position: relative;
        z-index: 1;
      }

      .welcome-content h1 {
        font-size: 40px;
        font-weight: 900;
        margin: 0 0 12px;
      }

      .welcome-content p {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.9);
        margin: 0 0 32px;
      }

      .welcome-actions {
        display: flex;
        gap: 16px;
        justify-content: center;
        flex-wrap: wrap;
      }

      .btn-primary, .btn-secondary {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 14px 28px;
        border-radius: 14px;
        text-decoration: none;
        font-weight: 700;
        font-size: 15px;
        transition: all 0.3s;
      }

      .btn-primary {
        background: white;
        color: #dc2626;
      }

      .btn-primary:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
      }

      .btn-secondary {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(255, 255, 255, 0.3);
      }

      .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
      }

      .btn-primary mat-icon, .btn-secondary mat-icon {
        font-size: 22px;
        width: 22px;
        height: 22px;
      }

      .stats-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
      }

      .stat-card {
        background: white;
        border-radius: 20px;
        padding: 24px;
        display: flex;
        align-items: center;
        gap: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
        transition: transform 0.3s;
      }

      .stat-card:hover {
        transform: translateY(-4px);
      }

      .stat-icon {
        width: 60px;
        height: 60px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .stat-icon mat-icon {
        font-size: 30px;
        width: 30px;
        height: 30px;
        color: white;
      }

      .stat-icon.bg-orange {
        background: linear-gradient(135deg, #fb923c 0%, #f97316 100%);
        box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
      }

      .stat-icon.bg-green {
        background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%);
        box-shadow: 0 8px 20px rgba(34, 197, 94, 0.3);
      }

      .stat-icon.bg-blue {
        background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
        box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
      }

      .stat-icon.bg-purple {
        background: linear-gradient(135deg, #c084fc 0%, #a855f7 100%);
        box-shadow: 0 8px 20px rgba(168, 85, 247, 0.3);
      }

      .stat-content h3 {
        font-size: 32px;
        font-weight: 900;
        color: #1e293b;
        margin: 0 0 4px;
      }

      .stat-content p {
        color: #64748b;
        margin: 0;
        font-size: 14px;
        font-weight: 600;
      }

      .section {
        background: white;
        border-radius: 24px;
        padding: 32px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
      }

      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
      }

      .section-title {
        font-size: 24px;
        font-weight: 800;
        color: #1e293b;
        margin: 0;
      }

      .view-all {
        color: #f97316;
        text-decoration: none;
        font-weight: 700;
        font-size: 14px;
      }

      .view-all:hover {
        text-decoration: underline;
      }

      .cursos-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 24px;
      }

      .curso-card {
        background: white;
        border-radius: 20px;
        overflow: hidden;
        border: 2px solid #f1f5f9;
        transition: all 0.3s;
      }

      .curso-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        border-color: rgba(249, 115, 22, 0.3);
      }

      .curso-header {
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        padding: 20px;
      }

      .curso-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
        color: white;
        opacity: 0.9;
      }

      .curso-badge {
        position: absolute;
        top: 12px;
        right: 12px;
        background: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(10px);
        color: white;
        padding: 5px 12px;
        border-radius: 50px;
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
      }

      .curso-body {
        padding: 24px;
      }

      .curso-title {
        font-size: 18px;
        font-weight: 800;
        color: #1e293b;
        margin: 0 0 20px;
        line-height: 1.3;
      }

      .progress-section {
        margin-bottom: 16px;
      }

      .progress-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
      }

      .progress-label {
        font-size: 13px;
        color: #64748b;
        font-weight: 600;
      }

      .progress-value {
        font-size: 13px;
        color: #f97316;
        font-weight: 800;
      }

      .progress-bar {
        height: 8px;
        border-radius: 10px;
      }

      .curso-meta {
        margin-bottom: 20px;
      }

      .meta-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        color: #64748b;
        font-weight: 600;
      }

      .meta-item mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
        color: #f97316;
      }

      .btn-continue {
        display: block;
        background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
        color: white;
        text-align: center;
        padding: 12px;
        border-radius: 12px;
        text-decoration: none;
        font-weight: 700;
        font-size: 14px;
        transition: all 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      .btn-continue:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(220, 38, 38, 0.3);
      }

      .btn-continue mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }

      .empty-state {
        text-align: center;
        padding: 60px 20px;
      }

      .empty-state mat-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        color: #cbd5e1;
        margin-bottom: 24px;
      }

      .empty-state h3 {
        font-size: 22px;
        font-weight: 800;
        color: #1e293b;
        margin: 0 0 12px;
      }

      .empty-state p {
        color: #64748b;
        margin: 0 0 24px;
        font-size: 15px;
      }

      @media (max-width: 768px) {
        .welcome-header {
          padding: 32px 20px;
        }

        .welcome-content h1 {
          font-size: 28px;
        }

        .stats-grid {
          grid-template-columns: repeat(2, 1fr);
        }

        .cursos-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  `
})
export class StudentDashboardComponent implements OnInit {
  estudiante: Estudiante | null = null;
  cursosMatriculados: any[] = [];
  progresoPromedio: number = 0;
  loading = true;

  constructor(
    private authService: AuthService,
    private academiaService: AcademiaService
  ) {}

  ngOnInit(): void {
    this.cargarDashboard();
  }

  cargarDashboard(): void {
    // Suscribirse al usuario actual
    this.authService.estudiante$.subscribe(estudiante => {
      this.estudiante = estudiante;
      
      if (!estudiante) {
        this.loading = false;
        return;
      }

      // Obtener IDs de cursos matriculados
      const cursosIds = estudiante.cursosMatriculados || [];

      if (cursosIds.length === 0) {
        this.cursosMatriculados = [];
        this.progresoPromedio = 0;
        this.loading = false;
        return;
      }

      // Obtener todos los cursos y filtrar los matriculados
      const todosLosCursos = this.academiaService.getCursos();
      
      // Mapear cursos matriculados con progreso simulado
      this.cursosMatriculados = cursosIds.map(id => {
        const curso = todosLosCursos.find(c => c.id === id);
        const contenidos = this.academiaService.getContenidosByCurso(id);
        const totalContenidos = contenidos.length;
        // Simular progreso (en producción esto vendría de un servicio de progreso)
        const progresoSimulado = Math.floor(Math.random() * 100);
        
        return {
          id: id,
          titulo: curso?.nombre || 'Curso',
          categoria: curso?.categoria || 'General',
          gradiente: this.getGradientePorCategoria(curso?.categoria || ''),
          icono: this.getIconoPorCategoria(curso?.categoria || ''),
          progreso: progresoSimulado,
          clasesVistas: Math.floor(totalContenidos * (progresoSimulado / 100)),
          totalClases: totalContenidos
        };
      });

      // Calcular progreso promedio
      if (this.cursosMatriculados.length > 0) {
        const sumaProgresos = this.cursosMatriculados.reduce((sum, c) => sum + c.progreso, 0);
        this.progresoPromedio = Math.round(sumaProgresos / this.cursosMatriculados.length);
      }

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
