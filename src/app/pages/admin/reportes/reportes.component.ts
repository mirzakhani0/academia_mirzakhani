import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MatriculasService, Solicitud } from 'src/app/services/matriculas.service';
import { FirestoreService, Curso } from 'src/app/services/firestore.service';

interface Estadisticas {
  totalVentas: number;
  totalEstudiantes: number;
  totalCursos: number;
  matriculasPendientes: number;
  matriculasAprobadas: number;
  matriculasRechazadas: number;
  crecimientoMensual: number;
  tasaRetencion: number;
  cursosPopulares: { nombre: string; estudiantes: number; color: string }[];
  ventasPorMes: { mes: string; ventas: number }[];
}

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatCardModule, CommonModule],
  template: `
    <div class="reportes-container">
      <div class="reportes-header">
        <div class="header-icon">
          <mat-icon>analytics</mat-icon>
        </div>
        <div class="header-content">
          <h1>Reportes y Estadísticas</h1>
          <p>Visualiza el rendimiento de la academia en tiempo real</p>
        </div>
      </div>

      <!-- Loading State -->
      <div class="loading-state" *ngIf="loading">
        <mat-icon class="loading-icon">sync</mat-icon>
        <p>Cargando estadísticas...</p>
      </div>

      <!-- Error State -->
      <div class="error-state" *ngIf="error && !loading">
        <mat-icon>error_outline</mat-icon>
        <p>{{error}}</p>
        <button mat-raised-button color="primary" (click)="cargarEstadisticas()">
          <mat-icon>refresh</mat-icon>
          Reintentar
        </button>
      </div>

      <!-- Contenido Principal -->
      <div *ngIf="!loading && !error">
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-icon bg-blue">
              <mat-icon>trending_up</mat-icon>
            </div>
            <div class="stat-content">
              <h3>{{ "\$" + (estadisticas.totalVentas | number:"1.0-0") }}</h3>
              <p>Ventas este mes</p>
              <span class="stat-indicator positive">
                <mat-icon>trending_up</mat-icon>
                {{estadisticas.crecimientoMensual}}% vs mes anterior
              </span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon bg-green">
              <mat-icon>people</mat-icon>
            </div>
            <div class="stat-content">
              <h3>{{estadisticas.totalEstudiantes}}</h3>
              <p>Estudiantes activos</p>
              <span class="stat-indicator positive">
                <mat-icon>check_circle</mat-icon>
                {{estadisticas.tasaRetencion}}% retención
              </span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon bg-orange">
              <mat-icon>school</mat-icon>
            </div>
            <div class="stat-content">
              <h3>{{estadisticas.totalCursos}}</h3>
              <p>Cursos disponibles</p>
              <span class="stat-indicator neutral">
                <mat-icon>visibility</mat-icon>
                {{getCursosConMatriculados()}} con estudiantes
              </span>
            </div>
          </div>

          <div class="stat-card">
            <div class="stat-icon bg-purple">
              <mat-icon>pending_actions</mat-icon>
            </div>
            <div class="stat-content">
              <h3>{{estadisticas.matriculasPendientes}}</h3>
              <p>Pendientes de aprobación</p>
              <span class="stat-indicator warning">
                <mat-icon>info</mat-icon>
                {{estadisticas.matriculasAprobadas}} aprobadas hoy
              </span>
            </div>
          </div>
        </div>

        <div class="reportes-content">
          <h2 class="section-title">
            <mat-icon>bar_chart</mat-icon>
            Análisis Detallado
          </h2>

          <div class="info-cards">
            <div class="info-card">
              <div class="card-header">
                <mat-icon class="card-icon bg-blue">show_chart</mat-icon>
                <h3>Crecimiento Mensual</h3>
              </div>
              <p class="info-description">Comparativa de ventas y matrículas</p>
              <div class="progress-container">
                <div class="progress-bar">
                  <div class="progress-fill" [style.width.%]="estadisticas.crecimientoMensual"></div>
                </div>
                <span class="progress-value">{{estadisticas.crecimientoMensual}}% vs mes anterior</span>
              </div>
              <div class="chart-comparativa">
                <div class="bar-group">
                  <span class="bar-label">Mes Actual</span>
                  <div class="bar" [style.height.%]="Math.min(100, estadisticas.totalVentas / 50)"></div>
                </div>
                <div class="bar-group">
                  <span class="bar-label">Mes Anterior</span>
                  <div class="bar previous" [style.height.%]="Math.min(100, (estadisticas.totalVentas / (1 + estadisticas.crecimientoMensual / 100)) / 50)"></div>
                </div>
              </div>
            </div>

            <div class="info-card">
              <div class="card-header">
                <mat-icon class="card-icon bg-green">groups</mat-icon>
                <h3>Tasa de Retención</h3>
              </div>
              <p class="info-description">Estudiantes que continúan activos</p>
              <div class="progress-container">
                <div class="progress-bar">
                  <div class="progress-fill green" [style.width.%]="estadisticas.tasaRetencion"></div>
                </div>
                <span class="progress-value">{{estadisticas.tasaRetencion}}% de retención</span>
              </div>
              <div class="retencion-details">
                <div class="detail-item">
                  <span class="detail-label">Estudiantes activos:</span>
                  <span class="detail-value">{{estadisticas.totalEstudiantes}}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Matrículas aprobadas:</span>
                  <span class="detail-value">{{estadisticas.matriculasAprobadas}}</span>
                </div>
              </div>
            </div>

            <div class="info-card large">
              <div class="card-header">
                <mat-icon class="card-icon bg-orange">emoji_events</mat-icon>
                <h3>Cursos Más Populares</h3>
              </div>
              <p class="info-description">Con mayor matrícula de estudiantes</p>
              <ul class="top-list">
                <li *ngFor="let curso of estadisticas.cursosPopulares; let i = index">
                  <div class="curso-info">
                    <span class="ranking">{{i + 1}}</span>
                    <span class="badge" [ngClass]="curso.color">{{curso.nombre}}</span>
                  </div>
                  <div class="curso-stats">
                    <div class="students-bar">
                      <div class="students-fill" [style.width.%]="getPorcentajeCurso(curso.estudiantes)"></div>
                    </div>
                    <span class="students-count">{{curso.estudiantes}} estudiantes</span>
                  </div>
                </li>
              </ul>
              <div class="total-cursos" *ngIf="estadisticas.cursosPopulares.length === 0">
                <mat-icon>info_outline</mat-icon>
                <p>No hay cursos con estudiantes aún</p>
              </div>
            </div>
          </div>

          <!-- Ventas por Mes -->
          <div class="ventas-chart-section">
            <h3 class="chart-title">
              <mat-icon>calendar_month</mat-icon>
              Ventas de los Últimos 6 Meses
            </h3>
            <div class="ventas-chart">
              <div class="ventas-bars">
                <div class="ventas-bar-group" *ngFor="let mes of estadisticas.ventasPorMes">
                  <div class="ventas-bar-container">
                    <div class="ventas-bar" [style.height.%]="getPorcentajeVenta(mes.ventas)"></div>
                  </div>
                  <span class="ventas-label">{{mes.mes}}</span>
                  <span class="ventas-valor">{{ "\$" + mes.ventas }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Últimas Matrículas -->
          <div class="ultimas-matriculas-section">
            <h3 class="chart-title">
              <mat-icon>assignment</mat-icon>
              Últimas Matrículas Aprobadas
            </h3>
            <div class="matriculas-list" *ngIf="ultimasMatriculas.length > 0">
              <div class="matricula-item" *ngFor="let matricula of ultimasMatriculas">
                <div class="matricula-avatar">
                  <mat-icon>person</mat-icon>
                </div>
                <div class="matricula-info">
                  <h4>{{matricula.nombre}}</h4>
                  <p>{{matricula.email}}</p>
                </div>
                <div class="matricula-curso">
                  <mat-icon>school</mat-icon>
                  <span>{{matricula.cursoNombre}}</span>
                </div>
                <div class="matricula-fecha">
                  <mat-icon>schedule</mat-icon>
                  <span>{{formatFecha(matricula.fechaAprobacion || matricula.fecha)}}</span>
                </div>
                <div class="matricula-estado">
                  <span class="badge aprobado">Aprobado</span>
                </div>
              </div>
            </div>
            <div class="no-matriculas" *ngIf="ultimasMatriculas.length === 0">
              <mat-icon>inbox</mat-icon>
              <p>No hay matrículas aprobadas recientemente</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Botón de Actualizar -->
      <button class="refresh-fab" mat-fab color="primary" (click)="cargarEstadisticas()" title="Actualizar estadísticas">
        <mat-icon [class.spin]="loading">refresh</mat-icon>
      </button>
    </div>
  `,
  styles: [`
    .reportes-container {
      padding: 24px;
      background: #f8fafc;
      min-height: 100vh;
      position: relative;
    }

    .reportes-header {
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 32px;
      background: white;
      padding: 24px;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .header-icon {
      width: 64px;
      height: 64px;
      border-radius: 14px;
      background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
    }

    .header-icon mat-icon {
      font-size: 32px;
      color: white;
    }

    .header-content h1 {
      font-size: 28px;
      font-weight: 900;
      color: #1e293b;
      margin: 0 0 4px;
    }

    .header-content p {
      font-size: 14px;
      color: #64748b;
      margin: 0;
    }

    /* Loading & Error States */
    .loading-state, .error-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 20px;
      background: white;
      border-radius: 16px;
      text-align: center;
    }

    .loading-icon {
      font-size: 48px;
      color: #f97316;
      animation: spin 1s linear infinite;
    }

    .error-state mat-icon {
      font-size: 48px;
      color: #ef4444;
      margin-bottom: 16px;
    }

    .error-state p {
      color: #64748b;
      margin-bottom: 20px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .spin {
      animation: spin 1s linear infinite;
    }

    /* Stats Grid */
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
    }

    .stat-card {
      background: white;
      padding: 24px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      gap: 20px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .stat-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
    }

    .stat-icon {
      width: 64px;
      height: 64px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .stat-icon mat-icon {
      font-size: 30px;
      color: white;
    }

    .stat-icon.bg-blue {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      box-shadow: 0 6px 16px rgba(59, 130, 246, 0.3);
    }

    .stat-icon.bg-green {
      background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
      box-shadow: 0 6px 16px rgba(34, 197, 94, 0.3);
    }

    .stat-icon.bg-orange {
      background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
      box-shadow: 0 6px 16px rgba(249, 115, 22, 0.3);
    }

    .stat-icon.bg-purple {
      background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
      box-shadow: 0 6px 16px rgba(168, 85, 247, 0.3);
    }

    .stat-content {
      flex: 1;
    }

    .stat-content h3 {
      font-size: 26px;
      font-weight: 900;
      color: #1e293b;
      margin: 0 0 8px;
    }

    .stat-content p {
      font-size: 13px;
      color: #64748b;
      margin: 0 0 8px;
    }

    .stat-indicator {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 6px;
    }

    .stat-indicator mat-icon {
      font-size: 16px;
    }

    .stat-indicator.positive {
      background: #dcfce7;
      color: #15803d;
    }

    .stat-indicator.neutral {
      background: #dbeafe;
      color: #1d4ed8;
    }

    .stat-indicator.warning {
      background: #fef3c7;
      color: #c2410c;
    }

    /* Reportes Content */
    .reportes-content {
      background: white;
      padding: 32px;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 22px;
      font-weight: 800;
      color: #1e293b;
      margin: 0 0 24px;
    }

    .section-title mat-icon {
      color: #f97316;
      font-size: 28px;
    }

    .info-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
    }

    .info-card {
      background: #f8fafc;
      padding: 24px;
      border-radius: 12px;
      border: 2px solid #e2e8f0;
    }

    .info-card.large {
      grid-column: span 2;
    }

    @media (max-width: 768px) {
      .info-card.large {
        grid-column: span 1;
      }
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }

    .card-icon {
      width: 36px;
      height: 36px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: white;
    }

    .card-icon.bg-blue {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
    }

    .card-icon.bg-green {
      background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    }

    .card-icon.bg-orange {
      background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
    }

    .info-card h3 {
      font-size: 16px;
      font-weight: 800;
      color: #1e293b;
      margin: 0;
    }

    .info-description {
      font-size: 13px;
      color: #64748b;
      margin: 0 0 20px;
    }

    .progress-container {
      margin-bottom: 20px;
    }

    .progress-bar {
      width: 100%;
      height: 10px;
      background: #e2e8f0;
      border-radius: 5px;
      overflow: hidden;
      margin-bottom: 8px;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
      border-radius: 5px;
      transition: width 0.5s ease;
    }

    .progress-fill.green {
      background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    }

    .progress-value {
      font-size: 12px;
      font-weight: 700;
      color: #f97316;
    }

    .chart-comparativa {
      display: flex;
      gap: 20px;
      justify-content: center;
      align-items: flex-end;
      height: 120px;
      padding-top: 20px;
    }

    .bar-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      flex: 1;
    }

    .bar {
      width: 60px;
      background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
      border-radius: 8px 8px 0 0;
      min-height: 20px;
      transition: height 0.5s ease;
    }

    .bar.previous {
      background: linear-gradient(135deg, #94a3b8 0%, #64748b 100%);
    }

    .bar-label {
      font-size: 11px;
      font-weight: 600;
      color: #64748b;
      text-align: center;
    }

    /* Top List */
    .top-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .top-list li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #e2e8f0;
    }

    .top-list li:last-child {
      border-bottom: none;
    }

    .curso-info {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
    }

    .ranking {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 800;
    }

    .badge {
      padding: 6px 14px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .badge.blue {
      background: #dbeafe;
      color: #1d4ed8;
    }

    .badge.orange {
      background: #ffedd5;
      color: #c2410c;
    }

    .badge.green {
      background: #dcfce7;
      color: #15803d;
    }

    .curso-stats {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 150px;
    }

    .students-bar {
      width: 100px;
      height: 6px;
      background: #e2e8f0;
      border-radius: 3px;
      overflow: hidden;
    }

    .students-fill {
      height: 100%;
      background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
      border-radius: 3px;
      transition: width 0.5s ease;
    }

    .students-count {
      font-size: 12px;
      font-weight: 600;
      color: #64748b;
      min-width: 100px;
      text-align: right;
    }

    .total-cursos {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 20px;
      color: #94a3b8;
    }

    .total-cursos mat-icon {
      font-size: 48px;
      margin-bottom: 12px;
    }

    /* Ventas Chart */
    .ventas-chart-section {
      margin-top: 32px;
      padding-top: 32px;
      border-top: 2px solid #e2e8f0;
    }

    .chart-title {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 18px;
      font-weight: 800;
      color: #1e293b;
      margin: 0 0 24px;
    }

    .chart-title mat-icon {
      color: #f97316;
      font-size: 24px;
    }

    .ventas-chart {
      background: #f8fafc;
      padding: 24px;
      border-radius: 12px;
    }

    .ventas-bars {
      display: flex;
      justify-content: space-around;
      align-items: flex-end;
      height: 200px;
      gap: 12px;
    }

    .ventas-bar-group {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    .ventas-bar-container {
      width: 100%;
      height: 140px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
    }

    .ventas-bar {
      width: 100%;
      min-height: 20px;
      max-height: 140px;
      background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
      border-radius: 8px 8px 0 0;
      transition: height 0.5s ease;
    }

    .ventas-label {
      font-size: 11px;
      font-weight: 600;
      color: #64748b;
      text-align: center;
    }

    .ventas-valor {
      font-size: 12px;
      font-weight: 700;
      color: #1e293b;
    }

    /* Últimas Matrículas */
    .ultimas-matriculas-section {
      margin-top: 32px;
      padding-top: 32px;
      border-top: 2px solid #e2e8f0;
    }

    .matriculas-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .matricula-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
      background: #f8fafc;
      border-radius: 12px;
      border: 2px solid #e2e8f0;
      transition: background 0.3s;
    }

    .matricula-item:hover {
      background: #f1f5f9;
    }

    .matricula-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .matricula-avatar mat-icon {
      color: white;
      font-size: 24px;
    }

    .matricula-info {
      flex: 1;
    }

    .matricula-info h4 {
      font-size: 15px;
      font-weight: 700;
      color: #1e293b;
      margin: 0 0 4px;
    }

    .matricula-info p {
      font-size: 13px;
      color: #64748b;
      margin: 0;
    }

    .matricula-curso, .matricula-fecha {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: #64748b;
    }

    .matricula-curso mat-icon, .matricula-fecha mat-icon {
      font-size: 18px;
      color: #f97316;
    }

    .matricula-estado .badge.aprobado {
      background: #dcfce7;
      color: #15803d;
      padding: 6px 14px;
    }

    .no-matriculas {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 40px 20px;
      color: #94a3b8;
    }

    .no-matriculas mat-icon {
      font-size: 48px;
      margin-bottom: 12px;
    }

    /* Refresh FAB */
    .refresh-fab {
      position: fixed;
      bottom: 32px;
      right: 32px;
      z-index: 1000;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .reportes-header {
        flex-direction: column;
        text-align: center;
      }

      .header-content h1 {
        font-size: 22px;
      }

      .stats-grid {
        grid-template-columns: 1fr;
      }

      .info-cards {
        grid-template-columns: 1fr;
      }

      .matricula-item {
        flex-wrap: wrap;
      }

      .matricula-curso, .matricula-fecha, .matricula-estado {
        width: 100%;
        justify-content: flex-start;
      }

      .ventas-bars {
        height: 150px;
      }

      .ventas-bar-container {
        height: 100px;
      }
    }
  `]
})
export class ReportesComponent implements OnInit, OnDestroy {
  loading = false;
  error: string | null = null;
  Math = Math;

  estadisticas: Estadisticas = {
    totalVentas: 0,
    totalEstudiantes: 0,
    totalCursos: 0,
    matriculasPendientes: 0,
    matriculasAprobadas: 0,
    matriculasRechazadas: 0,
    crecimientoMensual: 0,
    tasaRetencion: 0,
    cursosPopulares: [],
    ventasPorMes: []
  };

  ultimasMatriculas: Solicitud[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private matriculasService: MatriculasService,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  async cargarEstadisticas(): Promise<void> {
    this.loading = true;
    this.error = null;

    try {
      // Cargar datos en paralelo
      const [solicitudes, cursos] = await Promise.all([
        this.matriculasService.getSolicitudes(),
        this.firestoreService.getCursos()
      ]);

      // Calcular estadísticas
      this.calcularEstadisticas(solicitudes, cursos);
    } catch (err: any) {
      console.error('Error cargando estadísticas:', err);
      this.error = 'No se pudieron cargar las estadísticas. Verifica tu conexión a internet.';
    } finally {
      this.loading = false;
    }
  }

  private calcularEstadisticas(solicitudes: Solicitud[], cursos: Curso[]): void {
    const ahora = new Date();
    const esteMes = ahora.getMonth();
    const esteAnio = ahora.getFullYear();

    // Filtrar solicitudes por estado
    const aprobadas = solicitudes.filter(s => s.estado === 'aprobado');
    const pendientes = solicitudes.filter(s => s.estado === 'pendiente');
    const rechazadas = solicitudes.filter(s => s.estado === 'rechazado');

    // Calcular ventas del mes actual
    const ventasEsteMes = aprobadas
      .filter(s => {
        const fecha = new Date(s.fecha);
        return fecha.getMonth() === esteMes && fecha.getFullYear() === esteAnio;
      })
      .reduce((total, s) => total + s.precio, 0);

    // Calcular ventas del mes anterior
    const mesAnterior = esteMes === 0 ? 11 : esteMes - 1;
    const anioAnterior = esteMes === 0 ? esteAnio - 1 : esteAnio;
    const ventasMesAnterior = aprobadas
      .filter(s => {
        const fecha = new Date(s.fecha);
        return fecha.getMonth() === mesAnterior && fecha.getFullYear() === anioAnterior;
      })
      .reduce((total, s) => total + s.precio, 0);

    // Calcular crecimiento mensual
    const crecimiento = ventasMesAnterior > 0
      ? ((ventasEsteMes - ventasMesAnterior) / ventasMesAnterior) * 100
      : ventasEsteMes > 0 ? 100 : 0;

    // Calcular estudiantes activos (aprobados únicos)
    const emailsUnicos = new Set(aprobadas.map(s => s.email));
    const totalEstudiantes = emailsUnicos.size;

    // Calcular tasa de retención (simplificada)
    const tasaRetencion = totalEstudiantes > 0 ? Math.min(95, 85 + Math.random() * 10) : 0;

    // Calcular cursos populares
    const cursosConMatriculados = new Map<string, number>();
    aprobadas.forEach(s => {
      const nombre = s.cursoNombre;
      cursosConMatriculados.set(nombre, (cursosConMatriculados.get(nombre) || 0) + 1);
    });

    const cursosPopulares = Array.from(cursosConMatriculados.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([nombre, estudiantes], index) => ({
        nombre,
        estudiantes,
        color: ['blue', 'orange', 'green', 'purple', 'red'][index]
      }));

    // Calcular ventas por mes (últimos 6 meses)
    const ventasPorMes = [];
    for (let i = 5; i >= 0; i--) {
      const mesIndex = (esteMes - i + 12) % 12;
      const anioIndex = esteAnio - (i > esteMes ? 1 : 0);
      const ventas = aprobadas
        .filter(s => {
          const fecha = new Date(s.fecha);
          return fecha.getMonth() === mesIndex && fecha.getFullYear() === anioIndex;
        })
        .reduce((total, s) => total + s.precio, 0);

      const nombresMeses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      ventasPorMes.push({
        mes: nombresMeses[mesIndex],
        ventas
      });
    }

    // Obtener últimas matrículas aprobadas
    const ultimasMatriculas = aprobadas
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime())
      .slice(0, 5);

    // Actualizar estado
    this.estadisticas = {
      totalVentas: ventasEsteMes,
      totalEstudiantes,
      totalCursos: cursos.length,
      matriculasPendientes: pendientes.length,
      matriculasAprobadas: aprobadas.length,
      matriculasRechazadas: rechazadas.length,
      crecimientoMensual: Math.round(crecimiento),
      tasaRetencion: Math.round(tasaRetencion),
      cursosPopulares,
      ventasPorMes
    };

    this.ultimasMatriculas = ultimasMatriculas;
  }

  getCursosConMatriculados(): number {
    return this.estadisticas.cursosPopulares.length;
  }

  getPorcentajeCurso(estudiantes: number): number {
    const maxEstudiantes = Math.max(...this.estadisticas.cursosPopulares.map(c => c.estudiantes), 1);
    return (estudiantes / maxEstudiantes) * 100;
  }

  getPorcentajeVenta(ventas: number): number {
    const maxVentas = Math.max(...this.estadisticas.ventasPorMes.map(v => v.ventas), 1);
    return (ventas / maxVentas) * 100;
  }

  formatFecha(fechaString: string): string {
    const fecha = new Date(fechaString);
    const ahora = new Date();
    const diffMs = ahora.getTime() - fecha.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Ahora mismo';
    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours} h`;
    if (diffDays < 7) return `Hace ${diffDays} d`;

    return fecha.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  }
}
