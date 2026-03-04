import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AcademiaService, Contenido } from 'src/app/services/academia.service';

@Component({
  selector: 'app-gestion-contenido',
  standalone: true,
  imports: [
    MatIconModule, MatButtonModule, CommonModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule,
    MatChipsModule, MatButtonToggleModule
  ],
  template: `
    <div class="gestion-container">
      <!-- Header con Estadísticas -->
      <div class="gestion-header">
        <div class="header-info">
          <h1>Gestión de Contenido</h1>
          <p>Administra todos los archivos de tus cursos</p>
        </div>
        <button mat-raised-button color="primary" (click)="openSubirContenido()" class="btn-subir">
          <mat-icon>cloud_upload</mat-icon>
          <span>Subir Nuevo Contenido</span>
        </button>
      </div>

      <!-- Tarjetas de Estadísticas -->
      <div class="stats-cards">
        <div class="stat-card total">
          <div class="stat-icon">
            <mat-icon>folder</mat-icon>
          </div>
          <div class="stat-content">
            <h3>{{contenidos.length}}</h3>
            <p>Total Archivos</p>
          </div>
        </div>
        <div class="stat-card pdf">
          <div class="stat-icon">
            <mat-icon>description</mat-icon>
          </div>
          <div class="stat-content">
            <h3>{{getConteos('pdf')}}</h3>
            <p>PDFs</p>
          </div>
        </div>
        <div class="stat-card video">
          <div class="stat-icon">
            <mat-icon>play_circle</mat-icon>
          </div>
          <div class="stat-content">
            <h3>{{getConteos('video')}}</h3>
            <p>Videos</p>
          </div>
        </div>
      </div>

      <!-- Barra de Filtros y Búsqueda -->
      <div class="filter-bar">
        <div class="search-box">
          <mat-icon>search</mat-icon>
          <input 
            type="text" 
            [(ngModel)]="searchTerm" 
            placeholder="Buscar por nombre..."
            class="search-input"
          />
        </div>

        <div class="filter-group">
          <mat-button-toggle-group [(ngModel)]="filtroTipo" (change)="filtrarContenidos()">
            <mat-button-toggle value="todos">
              <mat-icon>view_list</mat-icon>
              <span class="toggle-text">Todos</span>
            </mat-button-toggle>
            <mat-button-toggle value="pdf">
              <mat-icon>description</mat-icon>
              <span class="toggle-text">PDFs</span>
            </mat-button-toggle>
            <mat-button-toggle value="video">
              <mat-icon>play_circle</mat-icon>
              <span class="toggle-text">Videos</span>
            </mat-button-toggle>
          </mat-button-toggle-group>
        </div>

        <div class="view-options">
          <button mat-icon-button [class.active]="vistaActual === 'grid'" (click)="vistaActual = 'grid'">
            <mat-icon>grid_view</mat-icon>
          </button>
          <button mat-icon-button [class.active]="vistaActual === 'list'" (click)="vistaActual = 'list'">
            <mat-icon>view_list</mat-icon>
          </button>
        </div>
      </div>

      <!-- Chips de Filtros Activos -->
      <div class="active-filters" *ngIf="mostrarFiltrosActivos()">
        <mat-chip-set>
          <mat-chip color="primary" (removed)="clearFilters()">
            {{filtroTipo === 'pdf' ? '📄 PDFs' : filtroTipo === 'video' ? '🎥 Videos' : 'Todos'}}
            <mat-icon matChipRemove>close</mat-icon>
          </mat-chip>
          <mat-chip *ngIf="searchTerm" color="accent" (removed)="searchTerm = ''">
            🔍 "{{searchTerm}}"
            <mat-icon matChipRemove>close</mat-icon>
          </mat-chip>
        </mat-chip-set>
      </div>

      <!-- Contenido Grid o Lista -->
      <div class="contenido-container" *ngIf="contenidosFiltrados.length > 0">
        <!-- Vista Grid -->
        <div class="contenido-grid" *ngIf="vistaActual === 'grid'">
          <div class="contenido-card" *ngFor="let item of contenidosFiltrados">
            <div class="card-header" [class.pdf]="item.tipo === 'pdf'" [class.video]="item.tipo === 'video'">
              <div class="card-icon">
                <mat-icon>{{item.tipo === 'pdf' ? 'description' : 'play_circle'}}</mat-icon>
              </div>
              <div class="card-actions">
                <button mat-icon-button color="primary" (click)="verContenido(item)" matTooltip="Ver">
                  <mat-icon>visibility</mat-icon>
                </button>
                <button mat-icon-button color="warn" (click)="eliminarContenido(item.id)" matTooltip="Eliminar">
                  <mat-icon>delete</mat-icon>
                </button>
              </div>
            </div>
            <div class="card-body">
              <h4 class="card-title">{{item.nombre}}</h4>

              <!-- Curso y Tema -->
              <div class="card-curso-tema">
                <div class="curso-badge">
                  <mat-icon>school</mat-icon>
                  <span>{{item.cursoNombre}}</span>
                </div>
                <div class="tema-badge">
                  <mat-icon>menu_book</mat-icon>
                  <span>{{item.tema}}</span>
                </div>
              </div>

              <div class="card-meta">
                <span class="meta-date">
                  <mat-icon>calendar_today</mat-icon>
                  {{item.fecha}}
                </span>
                <span class="meta-type" [class.pdf]="item.tipo === 'pdf'" [class.video]="item.tipo === 'video'">
                  {{item.tipo === 'pdf' ? '📄 PDF' : '🎥 Video'}}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Vista Lista -->
        <div class="contenido-list" *ngIf="vistaActual === 'list'">
          <div class="list-item" *ngFor="let item of contenidosFiltrados">
            <div class="item-icon" [class.pdf]="item.tipo === 'pdf'" [class.video]="item.tipo === 'video'">
              <mat-icon>{{item.tipo === 'pdf' ? 'description' : 'play_circle'}}</mat-icon>
            </div>
            <div class="item-info">
              <h4>{{item.nombre}}</h4>
              <div class="item-curso-tema">
                <span class="curso-tag">
                  <mat-icon>school</mat-icon>
                  {{item.cursoNombre}}
                </span>
                <span class="tema-tag">
                  <mat-icon>menu_book</mat-icon>
                  {{item.tema}}
                </span>
              </div>
              <div class="item-meta">
                <span class="item-type">{{item.tipo === 'pdf' ? 'PDF' : 'Video'}}</span>
                <span class="item-date">{{item.fecha}}</span>
              </div>
            </div>
            <div class="item-actions">
              <button mat-stroked-button color="primary" (click)="verContenido(item)">
                <mat-icon>visibility</mat-icon>
                Ver
              </button>
              <button mat-stroked-button color="warn" (click)="eliminarContenido(item.id)">
                <mat-icon>delete</mat-icon>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div class="empty-state" *ngIf="contenidosFiltrados.length === 0">
        <div class="empty-icon">
          <mat-icon>folder_open</mat-icon>
        </div>
        <h3>No se encontró contenido</h3>
        <p *ngIf="contenidos.length === 0">
          ¡Sube tu primer contenido para comenzar!
        </p>
        <p *ngIf="contenidos.length > 0">
          Intenta con otros filtros o términos de búsqueda
        </p>
        <button mat-raised-button color="primary" (click)="openSubirContenido()" *ngIf="contenidos.length === 0">
          <mat-icon>cloud_upload</mat-icon>
          Subir Contenido
        </button>
        <button mat-button color="accent" (click)="clearFilters()" *ngIf="contenidos.length > 0">
          <mat-icon>filter_alt</mat-icon>
          Limpiar Filtros
        </button>
      </div>
    </div>

    <style>
      .gestion-container { padding: 20px; }
      
      /* Header */
      .gestion-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32px;
        flex-wrap: wrap;
        gap: 20px;
      }

      .header-info h1 {
        font-size: 32px;
        font-weight: 900;
        color: #1e293b;
        margin: 0 0 8px;
        line-height: 1.2;
        word-wrap: break-word;
      }

      .header-info p {
        color: #64748b;
        margin: 0;
        font-size: 15px;
      }

      .btn-subir {
        font-weight: 700;
        padding: 12px 24px;
        box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
      }

      @media (max-width: 768px) {
        .gestion-container {
          padding: 12px;
        }

        .header-info h1 {
          font-size: 22px;
        }

        .header-info p {
          font-size: 13px;
        }

        .btn-subir {
          width: 100%;
          justify-content: center;
        }

        .stats-cards {
          grid-template-columns: 1fr;
        }

        .filter-bar {
          flex-direction: column;
          align-items: stretch;
        }

        .search-box {
          min-width: 100%;
        }

        .filter-group {
          width: 100%;
          overflow-x: auto;
        }

        .filter-group mat-button-toggle-group {
          width: 100%;
          display: flex;
        }

        .filter-group mat-button-toggle {
          flex: 1;
        }

        .contenido-grid {
          grid-template-columns: 1fr;
        }
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
        transition: transform 0.3s, box-shadow 0.3s;
      }
      
      .stat-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 60px rgba(0,0,0,0.12);
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
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .stat-card.total .stat-icon {
        background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
        box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3);
      }
      
      .stat-card.pdf .stat-icon {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
      }
      
      .stat-card.video .stat-icon {
        background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
        box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
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
        font-weight: 600;
      }
      
      /* Filter Bar */
      .filter-bar {
        background: white;
        padding: 20px;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.08);
        margin-bottom: 24px;
        display: flex;
        gap: 20px;
        align-items: center;
        flex-wrap: wrap;
      }
      
      .search-box {
        flex: 1;
        min-width: 250px;
        display: flex;
        align-items: center;
        gap: 12px;
        background: #f8fafc;
        padding: 12px 20px;
        border-radius: 12px;
        border: 2px solid transparent;
        transition: border-color 0.3s;
      }
      
      .search-box:focus-within {
        border-color: #f97316;
      }
      
      .search-box mat-icon {
        color: #94a3b8;
      }
      
      .search-input {
        flex: 1;
        border: none;
        outline: none;
        background: transparent;
        font-size: 15px;
        color: #1e293b;
      }
      
      .filter-group mat-button-toggle-group {
        border-radius: 12px;
        overflow: hidden;
      }

      .filter-group mat-button-toggle {
        border: none !important;
        padding: 12px 20px;
        font-weight: 600;
      }

      .filter-group .toggle-text {
        margin-left: 8px;
      }

      /* En celular: mostrar solo íconos */
      @media (max-width: 480px) {
        .filter-group .toggle-text {
          display: none;
        }

        .filter-group mat-button-toggle {
          padding: 12px 16px;
          min-width: 50px;
        }

        .filter-group mat-button-toggle mat-icon {
          margin: 0 !important;
        }
      }
      
      .view-options {
        display: flex;
        gap: 8px;
      }
      
      .view-options button.active {
        background: #f97316;
        color: white;
      }
      
      .view-options button mat-icon {
        color: #64748b;
      }
      
      .view-options button.active mat-icon {
        color: white;
      }
      
      /* Active Filters */
      .active-filters {
        margin-bottom: 24px;
      }
      
      /* Contenido Grid */
      .contenido-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 20px;
      }
      
      .contenido-card {
        background: white;
        border-radius: 16px;
        overflow: hidden;
        box-shadow: 0 10px 40px rgba(0,0,0,0.08);
        transition: transform 0.3s, box-shadow 0.3s;
      }
      
      .contenido-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 60px rgba(0,0,0,0.12);
      }
      
      .card-header {
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .card-header.pdf {
        background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
      }
      
      .card-header.video {
        background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
      }
      
      .card-icon {
        width: 56px;
        height: 56px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .card-header.pdf .card-icon {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        box-shadow: 0 6px 16px rgba(220, 38, 38, 0.3);
      }
      
      .card-header.video .card-icon {
        background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
        box-shadow: 0 6px 16px rgba(249, 115, 22, 0.3);
      }
      
      .card-icon mat-icon {
        font-size: 28px;
        width: 28px;
        height: 28px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .card-actions {
        display: flex;
        gap: 4px;
      }
      
      .card-body {
        padding: 20px;
      }
      
      .card-title {
        font-size: 16px;
        font-weight: 700;
        color: #1e293b;
        margin: 0 0 12px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      /* Curso y Tema Badges */
      .card-curso-tema {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 12px;
      }

      .curso-badge, .tema-badge {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 10px;
        border-radius: 8px;
        font-size: 12px;
        font-weight: 600;
      }

      .curso-badge {
        background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
        color: #1d4ed8;
        border: 1px solid #bfdbfe;
      }

      .curso-badge mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .tema-badge {
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        color: #b45309;
        border: 1px solid #fcd34d;
      }

      .tema-badge mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .card-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      .meta-date {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 13px;
        color: #94a3b8;
      }
      
      .meta-date mat-icon {
        font-size: 16px;
        width: 16px;
        height: 16px;
      }
      
      .meta-type {
        padding: 6px 12px;
        border-radius: 50px;
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
      }
      
      .meta-type.pdf {
        background: #fef2f2;
        color: #dc2626;
      }
      
      .meta-type.video {
        background: #fff7ed;
        color: #ea580c;
      }
      
      /* Contenido List */
      .contenido-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      
      .list-item {
        display: flex;
        align-items: center;
        gap: 20px;
        background: white;
        padding: 20px;
        border-radius: 16px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        transition: transform 0.3s;
      }
      
      .list-item:hover {
        transform: translateX(4px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.12);
      }
      
      .item-icon {
        width: 56px;
        height: 56px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      
      .item-icon.pdf {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        box-shadow: 0 6px 16px rgba(220, 38, 38, 0.3);
      }
      
      .item-icon.video {
        background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
        box-shadow: 0 6px 16px rgba(249, 115, 22, 0.3);
      }
      
      .item-icon mat-icon {
        font-size: 28px;
        width: 28px;
        height: 28px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .item-info {
        flex: 1;
        min-width: 0;
      }
      
      .item-info h4 {
        font-size: 16px;
        font-weight: 700;
        color: #1e293b;
        margin: 0 0 8px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .item-curso-tema {
        display: flex;
        gap: 12px;
        align-items: center;
        margin-bottom: 8px;
      }

      .curso-tag, .tema-tag {
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 600;
      }

      .curso-tag {
        background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
        color: #1d4ed8;
      }

      .curso-tag mat-icon {
        font-size: 14px;
        width: 14px;
        height: 14px;
      }

      .tema-tag {
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        color: #b45309;
      }

      .tema-tag mat-icon {
        font-size: 14px;
        width: 14px;
        height: 14px;
      }

      .item-meta {
        display: flex;
        gap: 16px;
        align-items: center;
      }
      
      .item-type {
        padding: 4px 12px;
        background: #f1f5f9;
        border-radius: 50px;
        font-size: 12px;
        font-weight: 700;
        color: #64748b;
        text-transform: uppercase;
      }
      
      .item-date {
        font-size: 13px;
        color: #94a3b8;
      }
      
      .item-actions {
        display: flex;
        gap: 8px;
      }
      
      /* Empty State */
      .empty-state {
        text-align: center;
        padding: 80px 20px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.08);
      }
      
      .empty-icon {
        width: 100px;
        height: 100px;
        margin: 0 auto 24px;
        background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .empty-icon mat-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
        color: #94a3b8;
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
    </style>
  `
})
export class GestionContenidoComponent {
  contenidos: Contenido[] = [];
  contenidosFiltrados: Contenido[] = [];
  searchTerm: string = '';
  filtroTipo: string = 'todos';
  vistaActual: 'grid' | 'list' = 'grid';

  constructor(
    private academiaService: AcademiaService,
    private dialog: MatDialog
  ) {
    this.contenidos = this.academiaService.getContenidos();
    this.contenidosFiltrados = this.contenidos;
  }

  getConteos(tipo: string): number {
    return this.contenidos.filter(c => c.tipo === tipo).length;
  }

  filtrarContenidos(): void {
    this.contenidosFiltrados = this.contenidos.filter(item => {
      const matchSearch = item.nombre.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchTipo = this.filtroTipo === 'todos' || item.tipo === this.filtroTipo;
      return matchSearch && matchTipo;
    });
  }

  mostrarFiltrosActivos(): boolean {
    return this.filtroTipo !== 'todos' || this.searchTerm !== '';
  }

  clearFilters(): void {
    this.filtroTipo = 'todos';
    this.searchTerm = '';
    this.contenidosFiltrados = this.contenidos;
  }

  openSubirContenido(): void {
    const dialogRef = this.dialog.open(SubirContenidoDialog, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.academiaService.addContenido(result);
        this.contenidos = this.academiaService.getContenidos();
        this.filtrarContenidos();
      }
    });
  }

  verContenido(contenido: Contenido): void {
    if (contenido.tipo === 'video' && contenido.url) {
      window.open(contenido.url, '_blank');
    } else {
      alert('Abriendo PDF: ' + contenido.nombre);
    }
  }

  eliminarContenido(id: number): void {
    if (confirm('¿Estás seguro de eliminar este contenido?')) {
      this.academiaService.deleteContenido(id);
      this.contenidos = this.academiaService.getContenidos();
      this.filtrarContenidos();
    }
  }
}

@Component({
  selector: 'subir-contenido-dialog',
  standalone: true,
  imports: [
    MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, MatButtonModule, CommonModule, MatButtonToggleModule, MatIconModule
  ],
  template: `
    <h2 mat-dialog-title>Subir Nuevo Contenido</h2>
    <mat-dialog-content>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Curso</mat-label>
        <mat-select [(ngModel)]="contenidoData.cursoId">
          <mat-option value="1">Álgebra Lineal</mat-option>
          <mat-option value="2">Física I: Mecánica</mat-option>
          <mat-option value="3">Cálculo Diferencial</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>TEMA</mat-label>
        <input matInput [(ngModel)]="contenidoData.nombre" placeholder="Ej: Matrices y Vectores, Cinemática...">
        <mat-hint>Escribe el nombre del tema que vas a subir</mat-hint>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Tipo de Contenido</mat-label>
        <mat-select [(ngModel)]="contenidoData.tipo" (selectionChange)="onTipoChange()">
          <mat-option value="pdf">📄 PDF (Documento)</mat-option>
          <mat-option value="video">🎥 Video (YouTube)</mat-option>
        </mat-select>
      </mat-form-field>

      <!-- Opciones para PDF -->
      <div class="pdf-options" *ngIf="contenidoData.tipo === 'pdf'">
        <div class="header-con-accion">
          <h4 class="options-title">
            <mat-icon>description</mat-icon>
            ¿Cómo quieres subir el PDF?
          </h4>
        </div>

        <mat-button-toggle-group [(ngModel)]="pdfUploadMethod" class="full-width">
          <mat-button-toggle value="archivo">
            <mat-icon>upload_file</mat-icon>
            Subir Archivo
          </mat-button-toggle>
          <mat-button-toggle value="link">
            <mat-icon>link</mat-icon>
            Pegar Link
          </mat-button-toggle>
        </mat-button-toggle-group>

        <!-- Opción 1: Subir Archivo -->
        <div class="upload-section" *ngIf="pdfUploadMethod === 'archivo'">
          <div class="file-drop-zone" (click)="fileInput.click()" (dragover)="onDragOver($event)" (dragleave)="onDragLeave($event)" (drop)="onDrop($event)" [class.dragover]="isDragover">
            <input #fileInput type="file" accept=".pdf" (change)="onFileSelected($event)" hidden>
            <mat-icon class="drop-icon">cloud_upload</mat-icon>
            <h4>Arrastra tu archivo PDF aquí</h4>
            <p>o haz click para seleccionar</p>
            <div class="selected-file" *ngIf="selectedFileName">
              <mat-icon>check_circle</mat-icon>
              <span>{{selectedFileName}}</span>
            </div>
          </div>
        </div>

        <!-- Opción 2: Pegar Link -->
        <div class="link-section" *ngIf="pdfUploadMethod === 'link'">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>URL del PDF</mat-label>
            <input matInput [(ngModel)]="contenidoData.url" placeholder="https://ejemplo.com/archivo.pdf">
            <mat-icon matPrefix>link</mat-icon>
            <mat-hint>Pega el enlace directo al archivo PDF</mat-hint>
          </mat-form-field>

          <div class="link-preview" *ngIf="contenidoData.url">
            <mat-icon>visibility</mat-icon>
            <span>Vista previa: {{contenidoData.url}}</span>
          </div>
        </div>
      </div>

      <!-- Opción para Video -->
      <div class="video-section" *ngIf="contenidoData.tipo === 'video'">
        <h4 class="options-title">
          <mat-icon>ondemand_video</mat-icon>
          Video de YouTube
        </h4>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>URL de YouTube</mat-label>
          <input matInput [(ngModel)]="contenidoData.url" placeholder="https://www.youtube.com/watch?v=... o https://youtu.be/...">
          <mat-icon matPrefix>ondemand_video</mat-icon>
          <mat-hint>Pega el enlace del video de YouTube</mat-hint>
        </mat-form-field>

        <div class="link-preview" *ngIf="contenidoData.url">
          <mat-icon>check_circle</mat-icon>
          <span>Video listo: {{contenidoData.url}}</span>
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button color="primary" [mat-dialog-close]="contenidoData" [disabled]="!isValidForm()">
        Subir
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width { width: 100%; margin-bottom: 16px; }
    mat-dialog-content { display: flex; flex-direction: column; }

    .options-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 15px;
      font-weight: 700;
      color: #1e293b;
      margin: 16px 0 12px;
    }

    .options-title mat-icon {
      color: #f97316;
    }

    .pdf-options {
      background: #f8fafc;
      padding: 20px;
      border-radius: 12px;
      border: 2px solid #e2e8f0;
    }

    .header-con-accion {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 12px;
    }

    .btn-gestion-temas {
      font-size: 12px;
      padding: 8px 16px;
    }

    mat-button-toggle-group {
      display: flex;
      margin-bottom: 16px;
    }

    mat-button-toggle {
      flex: 1;
      border: none !important;
      padding: 12px;
    }

    /* Upload Section */
    .upload-section {
      margin-top: 16px;
    }

    .file-drop-zone {
      background: white;
      border: 3px dashed #cbd5e1;
      border-radius: 16px;
      padding: 40px 20px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
    }

    .file-drop-zone:hover {
      border-color: #f97316;
      background: #fff7ed;
    }

    .file-drop-zone.dragover {
      border-color: #22c55e;
      background: #f0fdf4;
      transform: scale(1.02);
    }

    .drop-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: #94a3b8;
      margin-bottom: 16px;
    }

    .file-drop-zone h4 {
      font-size: 16px;
      font-weight: 700;
      color: #475569;
      margin: 0 0 8px;
    }

    .file-drop-zone p {
      font-size: 14px;
      color: #94a3b8;
      margin: 0;
    }

    .selected-file {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 20px;
      padding: 12px 20px;
      background: #f0fdf4;
      border-radius: 12px;
      border: 2px solid #22c55e;
    }

    .selected-file mat-icon {
      color: #22c55e;
    }

    .selected-file span {
      font-weight: 600;
      color: #166534;
    }

    /* Link Section */
    .link-section {
      margin-top: 16px;
    }

    .link-preview {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      background: #eff6ff;
      border-radius: 12px;
      border: 2px solid #3b82f6;
      margin-top: 12px;
    }

    .link-preview mat-icon {
      color: #3b82f6;
      font-size: 20px;
    }

    .link-preview span {
      font-size: 13px;
      color: #1e40af;
      font-weight: 600;
      word-break: break-all;
    }

    /* Video Section */
    .video-section {
      background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
      padding: 20px;
      border-radius: 12px;
      border: 2px solid #fca5a5;
      margin-top: 16px;
    }

    .video-section .options-title {
      color: #dc2626;
      margin-bottom: 16px;
    }
  `]
})
export class SubirContenidoDialog {
  contenidoData: any = {
    nombre: '',  // Este es el TEMA
    tipo: 'pdf',
    url: '',
    cursoId: 1,
    cursoNombre: 'Álgebra Lineal',
    fecha: new Date().toISOString().split('T')[0]
  };

  pdfUploadMethod: 'archivo' | 'link' = 'archivo';
  selectedFileName: string = '';
  isDragover: boolean = false;

  constructor(private dialog: MatDialog) {}

  onTipoChange(): void {
    // Resetear selección cuando cambia el tipo
    if (this.contenidoData.tipo !== 'pdf') {
      this.selectedFileName = '';
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      this.selectedFileName = file.name;
      this.contenidoData.url = '/assets/archivos/' + file.name;
      this.contenidoData.nombre = file.name.replace('.pdf', '');
    } else if (file) {
      alert('Por favor selecciona un archivo PDF válido');
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragover = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragover = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragover = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type === 'application/pdf') {
        this.selectedFileName = file.name;
        this.contenidoData.url = '/assets/archivos/' + file.name;
        this.contenidoData.nombre = file.name.replace('.pdf', '');
      } else {
        alert('Por favor arrastra un archivo PDF válido');
      }
    }
  }

  isValidForm(): boolean {
    if (!this.contenidoData.nombre) return false;

    if (this.contenidoData.tipo === 'pdf') {
      if (this.pdfUploadMethod === 'link' && !this.contenidoData.url) {
        return false;
      }
      if (this.pdfUploadMethod === 'archivo' && !this.selectedFileName) {
        return false;
      }
    }

    if (this.contenidoData.tipo === 'video' && !this.contenidoData.url) {
      return false;
    }

    return true;
  }
}