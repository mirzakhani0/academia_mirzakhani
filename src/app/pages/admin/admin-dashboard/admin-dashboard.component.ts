import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatButtonModule, MatCardModule, CommonModule],
  template: `
    <div class="admin-dashboard-container">
      <!-- Sidebar de Accesos Rápidos -->
      <div class="quick-access-sidebar">
        <h2 class="sidebar-title">
          <mat-icon>dashboard</mat-icon>
          Panel de Control
        </h2>
        
        <div class="sidebar-section">
          <h3>Gestión de Cursos</h3>
          <a routerLink="/admin/cursos" class="sidebar-link">
            <div class="link-icon bg-blue">
              <mat-icon>class</mat-icon>
            </div>
            <div class="link-info">
              <span class="link-title">Nuevo Curso</span>
              <span class="link-subtitle">Crear y editar cursos</span>
            </div>
            <mat-icon class="link-arrow">chevron_right</mat-icon>
          </a>
          
          <a routerLink="/admin/matriculas" class="sidebar-link">
            <div class="link-icon bg-orange">
              <mat-icon>assignment</mat-icon>
            </div>
            <div class="link-info">
              <span class="link-title">Matrículas</span>
              <span class="link-subtitle">Aprobar solicitudes</span>
            </div>
            <mat-icon class="link-arrow">chevron_right</mat-icon>
          </a>
        </div>

        <div class="sidebar-section">
          <h3>Gestión de Usuarios</h3>
          <a routerLink="/admin/usuarios" class="sidebar-link">
            <div class="link-icon bg-green">
              <mat-icon>people</mat-icon>
            </div>
            <div class="link-info">
              <span class="link-title">Nuevo Usuario</span>
              <span class="link-subtitle">Administrar estudiantes</span>
            </div>
            <mat-icon class="link-arrow">chevron_right</mat-icon>
          </a>
        </div>

        <div class="sidebar-section">
          <h3>Contenido</h3>
          <a routerLink="/admin/contenido" class="sidebar-link">
            <div class="link-icon bg-purple">
              <mat-icon>cloud_upload</mat-icon>
            </div>
            <div class="link-info">
              <span class="link-title">Subir Contenido</span>
              <span class="link-subtitle">PDFs y videos</span>
            </div>
            <mat-icon class="link-arrow">chevron_right</mat-icon>
          </a>
        </div>

        <div class="sidebar-section">
          <h3>Reportes</h3>
          <a routerLink="/admin/reportes" class="sidebar-link">
            <div class="link-icon bg-red">
              <mat-icon>assessment</mat-icon>
            </div>
            <div class="link-info">
              <span class="link-title">Ver Reportes</span>
              <span class="link-subtitle">Estadísticas y ventas</span>
            </div>
            <mat-icon class="link-arrow">chevron_right</mat-icon>
          </a>
        </div>
      </div>

      <!-- Contenido Principal -->
      <div class="main-content">
        <!-- Header con Estadísticas -->
        <div class="dashboard-header">
          <h1>Dashboard Administrativo</h1>
          <p>Panel de control y gestión de la academia</p>
        </div>

        <!-- Tarjetas de Estadísticas -->
        <div class="stats-cards">
          <div class="stat-card" routerLink="/admin/cursos">
            <div class="stat-icon bg-blue">
              <mat-icon>class</mat-icon>
            </div>
            <div class="stat-content">
              <h3>12</h3>
              <p>Cursos Activos</p>
            </div>
          </div>

          <div class="stat-card" routerLink="/admin/usuarios">
            <div class="stat-icon bg-green">
              <mat-icon>people</mat-icon>
            </div>
            <div class="stat-content">
              <h3>256</h3>
              <p>Estudiantes</p>
            </div>
          </div>

          <div class="stat-card" routerLink="/admin/matriculas">
            <div class="stat-icon bg-orange">
              <mat-icon>pending_actions</mat-icon>
            </div>
            <div class="stat-content">
              <h3>8</h3>
              <p>Pendientes</p>
            </div>
          </div>

          <div class="stat-card" routerLink="/admin/reportes">
            <div class="stat-icon bg-purple">
              <mat-icon>attach_money</mat-icon>
            </div>
            <div class="stat-content">
              <h3>$4,580</h3>
              <p>Ventas este mes</p>
            </div>
          </div>
        </div>

        <!-- Acciones Rápidas -->
        <div class="quick-actions">
          <h2 class="section-title">Acciones Rápidas</h2>
          <div class="actions-grid">
            <a routerLink="/admin/cursos" class="action-card">
              <div class="action-icon bg-blue">
                <mat-icon>add_circle</mat-icon>
              </div>
              <h3>Crear Curso</h3>
              <p>Agregar nuevo curso al catálogo</p>
            </a>

            <a routerLink="/admin/usuarios" class="action-card">
              <div class="action-icon bg-green">
                <mat-icon>person_add</mat-icon>
              </div>
              <h3>Nuevo Usuario</h3>
              <p>Registrar nuevo estudiante</p>
            </a>

            <a routerLink="/admin/contenido" class="action-card">
              <div class="action-icon bg-purple">
                <mat-icon>cloud_upload</mat-icon>
              </div>
              <h3>Subir Contenido</h3>
              <p>Agregar PDFs o videos</p>
            </a>

            <a routerLink="/admin/reportes" class="action-card">
              <div class="action-icon bg-red">
                <mat-icon>analytics</mat-icon>
              </div>
              <h3>Ver Reportes</h3>
              <p>Estadísticas detalladas</p>
            </a>
          </div>
        </div>

        <!-- Actividades Recientes -->
        <div class="recent-activity">
          <h2 class="section-title">Actividades Recientes</h2>
          <div class="activity-list">
            <div class="activity-item">
              <div class="activity-icon bg-blue">
                <mat-icon>class</mat-icon>
              </div>
              <div class="activity-info">
                <h4>Nuevo curso creado</h4>
                <p>Álgebra Lineal Avanzada</p>
              </div>
              <span class="activity-time">Hace 2 horas</span>
            </div>

            <div class="activity-item">
              <div class="activity-icon bg-green">
                <mat-icon>person_add</mat-icon>
              </div>
              <div class="activity-info">
                <h4>Nuevo estudiante registrado</h4>
                <p>Juan Pérez García</p>
              </div>
              <span class="activity-time">Hace 4 horas</span>
            </div>

            <div class="activity-item">
              <div class="activity-icon bg-orange">
                <mat-icon>check_circle</mat-icon>
              </div>
              <div class="activity-info">
                <h4>Matrícula aprobada</h4>
                <p>María López - Física I</p>
              </div>
              <span class="activity-time">Hace 6 horas</span>
            </div>

            <div class="activity-item">
              <div class="activity-icon bg-purple">
                <mat-icon>cloud_upload</mat-icon>
              </div>
              <div class="activity-info">
                <h4>Contenido subido</h4>
                <p>PDF: Ejercicios Resueltos</p>
              </div>
              <span class="activity-time">Hace 8 horas</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style>
      .admin-dashboard-container {
        display: grid;
        grid-template-columns: 320px 1fr;
        gap: 24px;
        padding: 20px;
        min-height: calc(100vh - 80px);
      }

      /* Sidebar */
      .quick-access-sidebar {
        background: white;
        border-radius: 20px;
        padding: 24px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
        height: fit-content;
        position: sticky;
        top: 20px;
      }

      .sidebar-title {
        display: flex;
        align-items: center;
        gap: 12px;
        font-size: 22px;
        font-weight: 900;
        color: #1e293b;
        margin: 0 0 24px;
        padding-bottom: 16px;
        border-bottom: 2px solid #f1f5f9;
      }

      .sidebar-title mat-icon {
        color: #f97316;
        font-size: 28px;
      }

      .sidebar-section {
        margin-bottom: 24px;
      }

      .sidebar-section h3 {
        font-size: 13px;
        font-weight: 700;
        color: #94a3b8;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin: 0 0 12px;
      }

      .sidebar-link {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 14px 16px;
        background: #f8fafc;
        border-radius: 12px;
        text-decoration: none;
        margin-bottom: 8px;
        transition: all 0.3s;
        cursor: pointer;
      }

      .sidebar-link:hover {
        background: linear-gradient(135deg, #fef3c7 0%, #ffedd5 100%);
        transform: translateX(4px);
      }

      .link-icon {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .link-icon mat-icon {
        font-size: 24px;
        width: 24px;
        height: 24px;
        color: white;
      }

      .link-icon.bg-blue {
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        box-shadow: 0 6px 16px rgba(59, 130, 246, 0.3);
      }

      .link-icon.bg-green {
        background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
        box-shadow: 0 6px 16px rgba(34, 197, 94, 0.3);
      }

      .link-icon.bg-orange {
        background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
        box-shadow: 0 6px 16px rgba(249, 115, 22, 0.3);
      }

      .link-icon.bg-purple {
        background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
        box-shadow: 0 6px 16px rgba(168, 85, 247, 0.3);
      }

      .link-icon.bg-red {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        box-shadow: 0 6px 16px rgba(239, 68, 68, 0.3);
      }

      .link-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .link-title {
        font-size: 15px;
        font-weight: 700;
        color: #1e293b;
      }

      .link-subtitle {
        font-size: 12px;
        color: #64748b;
      }

      .link-arrow {
        color: #cbd5e1;
        font-size: 20px;
      }

      /* Main Content */
      .main-content {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .dashboard-header {
        background: white;
        padding: 32px;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
      }

      .dashboard-header h1 {
        font-size: 32px;
        font-weight: 900;
        color: #1e293b;
        margin: 0 0 8px;
        line-height: 1.2;
        word-wrap: break-word;
      }

      .dashboard-header p {
        color: #64748b;
        margin: 0;
        font-size: 15px;
      }

      @media (max-width: 768px) {
        .dashboard-header {
          padding: 20px;
        }

        .dashboard-header h1 {
          font-size: 22px;
        }

        .dashboard-header p {
          font-size: 13px;
        }
      }

      .stats-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
      }

      .stat-card {
        background: white;
        padding: 24px;
        border-radius: 16px;
        display: flex;
        align-items: center;
        gap: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
        cursor: pointer;
        transition: transform 0.3s, box-shadow 0.3s;
      }

      .stat-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
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
        color: white;
      }

      .stat-icon.bg-blue {
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
      }

      .stat-icon.bg-green {
        background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
        box-shadow: 0 8px 20px rgba(34, 197, 94, 0.3);
      }

      .stat-icon.bg-orange {
        background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
        box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
      }

      .stat-icon.bg-purple {
        background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
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
      }

      .section-title {
        font-size: 24px;
        font-weight: 800;
        color: #1e293b;
        margin: 0 0 24px;
      }

      .quick-actions {
        background: white;
        padding: 32px;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
      }

      .actions-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 20px;
      }

      .action-card {
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        padding: 28px 24px;
        border-radius: 16px;
        text-align: center;
        text-decoration: none;
        transition: all 0.3s;
        border: 2px solid transparent;
      }

      .action-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        border-color: #f97316;
      }

      .action-icon {
        width: 70px;
        height: 70px;
        margin: 0 auto 16px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
      }

      .action-icon mat-icon {
        font-size: 36px;
        color: white;
      }

      @media (max-width: 768px) {
        .action-card {
          padding: 20px 16px;
        }

        .action-icon {
          width: 56px;
          height: 56px;
          margin: 0 auto 12px;
        }

        .action-icon mat-icon {
          font-size: 28px;
        }

        .action-card h3 {
          font-size: 15px;
          margin-bottom: 6px;
        }

        .action-card p {
          font-size: 12px;
        }
      }

      .action-icon.bg-blue {
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
        box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
      }

      .action-icon.bg-green {
        background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
        box-shadow: 0 8px 20px rgba(34, 197, 94, 0.3);
      }

      .action-icon.bg-purple {
        background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
        box-shadow: 0 8px 20px rgba(168, 85, 247, 0.3);
      }

      .action-icon.bg-red {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
      }

      .action-card h3 {
        font-size: 18px;
        font-weight: 800;
        color: #1e293b;
        margin: 0 0 8px;
      }

      .action-card p {
        font-size: 13px;
        color: #64748b;
        margin: 0;
        line-height: 1.5;
      }

      .recent-activity {
        background: white;
        padding: 32px;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
      }

      .activity-list {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .activity-item {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px;
        background: #f8fafc;
        border-radius: 12px;
        transition: all 0.3s;
      }

      .activity-item:hover {
        background: linear-gradient(135deg, #fef3c7 0%, #ffedd5 100%);
        transform: translateX(4px);
      }

      .activity-icon {
        width: 50px;
        height: 50px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .activity-icon mat-icon {
        font-size: 26px;
        color: white;
      }

      .activity-icon.bg-blue {
        background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      }

      .activity-icon.bg-green {
        background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
      }

      .activity-icon.bg-orange {
        background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
      }

      .activity-icon.bg-purple {
        background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
      }

      .activity-info {
        flex: 1;
      }

      .activity-info h4 {
        font-size: 15px;
        font-weight: 700;
        color: #1e293b;
        margin: 0 0 4px;
      }

      .activity-info p {
        font-size: 13px;
        color: #64748b;
        margin: 0;
      }

      .activity-time {
        font-size: 13px;
        color: #94a3b8;
        font-weight: 600;
      }

      @media (max-width: 1024px) {
        .admin-dashboard-container {
          grid-template-columns: 1fr;
        }

        .quick-access-sidebar {
          position: static;
        }
      }

      @media (max-width: 768px) {
        .admin-dashboard-container {
          padding: 12px;
          gap: 16px;
        }

        .quick-access-sidebar {
          padding: 16px;
        }

        .sidebar-title {
          font-size: 18px;
          margin-bottom: 16px;
        }

        .sidebar-title mat-icon {
          font-size: 24px;
          width: 24px;
          height: 24px;
        }

        .sidebar-section h3 {
          font-size: 11px;
        }

        .sidebar-link {
          padding: 10px 12px;
          margin-bottom: 6px;
        }

        .link-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
        }

        .link-icon mat-icon {
          font-size: 20px;
          width: 20px;
          height: 20px;
        }

        .link-title {
          font-size: 13px;
        }

        .link-subtitle {
          font-size: 11px;
        }

        .stats-cards {
          grid-template-columns: 1fr;
          gap: 12px;
        }

        .stat-card {
          padding: 16px;
        }

        .stat-icon {
          width: 50px;
          height: 50px;
        }

        .stat-icon mat-icon {
          font-size: 24px;
        }

        .stat-content h3 {
          font-size: 24px;
        }

        .section-title {
          font-size: 18px;
        }

        .actions-grid {
          grid-template-columns: 1fr;
          gap: 12px;
        }

        .activity-item {
          padding: 12px;
        }

        .activity-icon {
          width: 40px;
          height: 40px;
        }

        .activity-icon mat-icon {
          font-size: 20px;
        }

        .activity-info h4 {
          font-size: 13px;
        }

        .activity-info p {
          font-size: 12px;
        }

        .activity-time {
          font-size: 11px;
        }
      }
    </style>
  `
})
export class AdminDashboardComponent {

}
