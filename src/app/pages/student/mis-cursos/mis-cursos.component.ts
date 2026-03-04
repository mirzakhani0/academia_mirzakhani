import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-mis-cursos',
  standalone: true,
  imports: [
    RouterLink, MatIconModule, MatButtonModule, MatCardModule,
    MatProgressBarModule, CommonModule
  ],
  template: `
    <div class="mis-cursos-container">
      <div class="page-header">
        <h1>Mis Cursos</h1>
        <p>Accede a todo tu contenido adquirido</p>
      </div>

      <div class="cursos-grid" *ngIf="cursosMatriculados.length > 0">
        <mat-card class="curso-card" *ngFor="let curso of cursosMatriculados">
          <div class="curso-header" [style.background]="curso.gradiente">
            <mat-icon>{{curso.icono}}</mat-icon>
            <span class="curso-badge">{{curso.categoria}}</span>
          </div>
          <mat-card-content>
            <h3>{{curso.titulo}}</h3>
            <p class="curso-descripcion">{{curso.descripcion}}</p>
            
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

            <div class="curso-stats">
              <div class="stat-item">
                <mat-icon>play_circle</mat-icon>
                <span>{{curso.clasesVistas}}/{{curso.totalClases}} clases</span>
              </div>
              <div class="stat-item">
                <mat-icon>folder</mat-icon>
                <span>{{curso.temas}} temas</span>
              </div>
            </div>

            <a routerLink="/estudiante/curso/{{curso.id}}" class="btn-ver-curso">
              <mat-icon>play_arrow</mat-icon>
              <span>Ir al Curso</span>
            </a>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="empty-state" *ngIf="cursosMatriculados.length === 0">
        <mat-icon>school</mat-icon>
        <h3>No tienes cursos inscritos</h3>
        <p>El administrador aún no te ha matriculado en ningún curso. Contacta con administración para más información.</p>
      </div>
    </div>

    <style>
      .mis-cursos-container { padding: 20px; }
      
      .page-header {
        margin-bottom: 32px;
      }
      
      .page-header h1 {
        font-size: 32px;
        font-weight: 900;
        color: #1e293b;
        margin: 0;
      }
      
      .page-header p {
        color: #64748b;
        margin: 8px 0 0;
      }
      
      .cursos-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 24px;
      }
      
      .curso-card {
        border-radius: 20px;
        overflow: hidden;
        transition: transform 0.3s, box-shadow 0.3s;
      }
      
      .curso-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 60px rgba(0,0,0,0.12);
      }
      
      .curso-header {
        height: 140px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      }
      
      .curso-header mat-icon {
        font-size: 60px;
        width: 60px;
        height: 60px;
        color: white;
        opacity: 0.9;
      }
      
      .curso-badge {
        position: absolute;
        top: 12px;
        right: 12px;
        background: rgba(0,0,0,0.7);
        backdrop-filter: blur(10px);
        color: white;
        padding: 5px 12px;
        border-radius: 50px;
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
      }
      
      mat-card-content {
        padding: 24px !important;
      }
      
      .curso-card h3 {
        font-size: 18px;
        font-weight: 800;
        color: #1e293b;
        margin: 0 0 12px !important;
      }
      
      .curso-descripcion {
        color: #64748b;
        font-size: 14px;
        line-height: 1.6;
        margin: 0 0 20px !important;
      }
      
      .progress-section {
        margin-bottom: 20px;
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
      
      .curso-stats {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
      }
      
      .stat-item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        color: #64748b;
        font-weight: 600;
      }
      
      .stat-item mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
        color: #f97316;
      }
      
      .btn-ver-curso {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
        color: white;
        padding: 14px;
        border-radius: 12px;
        text-decoration: none;
        font-weight: 700;
        font-size: 15px;
        transition: all 0.3s;
      }
      
      .btn-ver-curso:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(220, 38, 38, 0.3);
      }
      
      .btn-ver-curso mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }
      
      .empty-state {
        text-align: center;
        padding: 60px 20px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.08);
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
        margin: 0;
        font-size: 15px;
      }
    </style>
  `
})
export class MisCursosComponent {
  cursosMatriculados: any[] = [];

  constructor(private authService: AuthService) {
    this.cargarCursos();
  }

  cargarCursos(): void {
    const cursosIds = this.authService.getCursosMatriculados();
    
    const todosLosCursos = [
      {
        id: 1,
        titulo: 'Álgebra Lineal: Dominio Total',
        descripcion: 'De matrices a espacios vectoriales. Incluye 20 horas de video y resolución de exámenes pasados.',
        categoria: 'Matemáticas',
        gradiente: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
        icono: 'functions',
        progreso: 65,
        clasesVistas: 12,
        totalClases: 20,
        temas: 8
      },
      {
        id: 2,
        titulo: 'Física I: Mecánica y Estática',
        descripcion: 'Domina los diagramas de cuerpo libre y las leyes de Newton con un método 100% visual.',
        categoria: 'Física',
        gradiente: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
        icono: 'rocket_launch',
        progreso: 30,
        clasesVistas: 5,
        totalClases: 15,
        temas: 6
      },
      {
        id: 3,
        titulo: 'Pack: Cálculo Diferencial',
        descripcion: 'La guía definitiva en PDF con 200 ejercicios resueltos y trucos para derivar rápido.',
        categoria: 'Matemáticas',
        gradiente: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
        icono: 'description',
        progreso: 10,
        clasesVistas: 2,
        totalClases: 18,
        temas: 10
      }
    ];

    this.cursosMatriculados = todosLosCursos.filter(c => cursosIds.includes(c.id));
  }
}
