import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CommonModule, MatCardModule],
  template: `
    <div class="gestion-container">
      <div class="page-header">
        <h1>Gestión de Usuarios</h1>
        <button mat-raised-button color="primary"><mat-icon>person_add</mat-icon> <span class="btn-text">Nuevo Usuario</span></button>
      </div>
      
      <!-- Tarjetas de Estadísticas -->
      <div class="stats-cards">
        <div class="stat-card">
          <div class="stat-icon bg-blue">
            <mat-icon>people</mat-icon>
          </div>
          <div class="stat-content">
            <h3>{{usuarios.length}}</h3>
            <p>Total Usuarios</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon bg-green">
            <mat-icon>school</mat-icon>
          </div>
          <div class="stat-content">
            <h3>{{getTotalCursos()}}</h3>
            <p>Cursos Matriculados</p>
          </div>
        </div>
      </div>

      <!-- Grid de Usuarios -->
      <div class="usuarios-grid">
        <div class="usuario-card" *ngFor="let usuario of usuarios">
          <div class="usuario-header">
            <div class="usuario-avatar">
              <mat-icon>person</mat-icon>
            </div>
            <div class="usuario-info">
              <h3>{{usuario.nombre}}</h3>
              <p>{{usuario.email}}</p>
            </div>
          </div>
          <div class="usuario-body">
            <div class="usuario-stats">
              <div class="stat-item">
                <mat-icon>school</mat-icon>
                <span>{{usuario.cursos}} cursos</span>
              </div>
            </div>
            <div class="usuario-actions">
              <button mat-stroked-button color="primary">
                <mat-icon>edit</mat-icon>
                Editar
              </button>
              <button mat-stroked-button color="warn">
                <mat-icon>delete</mat-icon>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="empty-state" *ngIf="usuarios.length === 0">
        <mat-icon>folder_open</mat-icon>
        <p>No hay usuarios registrados</p>
        <button mat-raised-button color="primary">
          <mat-icon>person_add</mat-icon> Agregar Primer Usuario
        </button>
      </div>
    </div>
    <style>
      .gestion-container { 
        padding: 20px;
        max-width: 100%;
        overflow-x: hidden;
      }
      .page-header { 
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        margin-bottom: 24px;
        flex-wrap: wrap;
        gap: 12px;
      }
      .page-header h1 { 
        font-size: 28px; 
        font-weight: 900; 
        color: #1e293b; 
        margin: 0;
        word-wrap: break-word;
        max-width: 100%;
        line-height: 1.2;
      }
      .btn-text {
        display: inline;
      }

      /* Stats Cards */
      .stats-cards {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
        box-shadow: 0 10px 40px rgba(0,0,0,0.08);
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
      }

      .stat-icon.bg-green {
        background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
      }

      .stat-content h3 {
        font-size: 32px;
        font-weight: 900;
        color: #1e293b;
        margin: 0;
      }

      .stat-content p {
        color: #64748b;
        margin: 4px 0 0;
        font-size: 14px;
      }

      /* Usuarios Grid */
      .usuarios-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 20px;
      }

      .usuario-card {
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 10px 40px rgba(0,0,0,0.08);
        transition: transform 0.3s, box-shadow 0.3s;
      }

      .usuario-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 60px rgba(0,0,0,0.12);
      }

      .usuario-header {
        background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
        padding: 24px;
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .usuario-avatar {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .usuario-avatar mat-icon {
        font-size: 32px;
        color: white;
      }

      .usuario-info {
        flex: 1;
        min-width: 0;
      }

      .usuario-info h3 {
        font-size: 18px;
        font-weight: 800;
        color: white;
        margin: 0;
        word-wrap: break-word;
        line-height: 1.3;
      }

      .usuario-info p {
        font-size: 14px;
        color: rgba(255, 255, 255, 0.9);
        margin: 4px 0 0;
        word-wrap: break-word;
      }

      .usuario-body {
        padding: 20px;
      }

      .usuario-stats {
        margin-bottom: 16px;
      }

      .usuario-stats .stat-item {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #64748b;
        font-size: 14px;
      }

      .usuario-stats mat-icon {
        color: #f97316;
        font-size: 20px;
      }

      .usuario-actions {
        display: flex;
        gap: 12px;
      }

      .usuario-actions button {
        flex: 1;
      }

      .empty-state {
        text-align: center;
        padding: 60px 20px;
        background: white;
        border-radius: 16px;
      }

      .empty-state mat-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        color: #cbd5e1;
        margin-bottom: 16px;
      }

      .empty-state p {
        color: #64748b;
        font-size: 16px;
        margin: 0 0 24px;
      }

      @media (max-width: 768px) {
        .gestion-container {
          padding: 12px;
        }

        .page-header {
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
        }

        .page-header h1 {
          font-size: 22px;
        }

        .page-header button {
          width: 100%;
          justify-content: center;
        }

        .btn-text {
          display: none;
        }

        .stats-cards {
          grid-template-columns: 1fr;
        }

        .usuarios-grid {
          grid-template-columns: 1fr;
        }

        .usuario-header {
          padding: 20px;
        }

        .usuario-avatar {
          width: 48px;
          height: 48px;
        }

        .usuario-avatar mat-icon {
          font-size: 28px;
        }

        .usuario-info h3 {
          font-size: 16px;
        }

        .usuario-info p {
          font-size: 13px;
        }

        .usuario-body {
          padding: 16px;
        }

        .usuario-actions {
          flex-direction: column;
        }

        .usuario-actions button {
          width: 100%;
        }
      }
    </style>
  `
})
export class GestionUsuariosComponent {
  displayedColumns: string[] = ['nombre', 'email', 'cursos', 'acciones'];
  usuarios = [
    { nombre: 'Juan Pérez', email: 'juan@email.com', cursos: 3 },
    { nombre: 'María López', email: 'maria@email.com', cursos: 5 },
    { nombre: 'Carlos Ruiz', email: 'carlos@email.com', cursos: 2 },
  ];

  getTotalCursos(): number {
    return this.usuarios.reduce((sum, u) => sum + u.cursos, 0);
  }
}
