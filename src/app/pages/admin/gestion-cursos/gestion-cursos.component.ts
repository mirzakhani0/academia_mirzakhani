import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { AcademiaService, Curso } from 'src/app/services/academia.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gestion-cursos',
  standalone: true,
  imports: [
    MatIconModule, MatButtonModule, CommonModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule
  ],
  templateUrl: './gestion-cursos.component.html'
})
export class GestionCursosComponent implements OnInit, OnDestroy {
  cursos: Curso[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private academiaService: AcademiaService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Suscribirse a los cambios de cursos
    this.subscription.add(
      this.academiaService.cursos$.subscribe(cursos => {
        this.cursos = cursos;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openNuevoCurso(): void {
    const dialogRef = this.dialog.open(NuevoCursoDialog, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        await this.academiaService.addCurso(result);
        // No es necesario actualizar this.cursos manualmente porque la suscripción lo hace
      }
    });
  }

  openEditarCurso(curso: Curso): void {
    const dialogRef = this.dialog.open(NuevoCursoDialog, {
      width: '500px',
      data: { ...curso, edit: true }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        await this.academiaService.updateCurso(curso.id, result);
      }
    });
  }

  async eliminarCurso(id: number): Promise<void> {
    if (confirm('¿Estás seguro de eliminar este curso?')) {
      await this.academiaService.deleteCurso(id);
    }
  }
}

const CATEGORIAS_PREDEFINIDAS = [
  { value: 'Matemáticas', label: '📐 Matemáticas' },
  { value: 'Física', label: '⚛️ Física' },
  { value: 'Química', label: '🧪 Química' },
  { value: 'Biología', label: '🧬 Biología' },
  { value: 'Letras', label: '📚 Letras' },
  { value: 'Otros', label: '📌 Otros' }
];

@Component({
  selector: 'nuevo-curso-dialog',
  standalone: true,
  imports: [
    MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    FormsModule, MatButtonModule, MatIconModule, CommonModule, MatDividerModule
  ],
  template: `
    <h2 mat-dialog-title class="dialog-title">
      <mat-icon>{{data.edit ? 'edit' : 'add_circle'}}</mat-icon>
      {{data.edit ? 'Editar' : 'Nuevo'}} Curso
    </h2>
    
    <mat-dialog-content class="dialog-content">
      <!-- Nombre -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Nombre del Curso</mat-label>
        <input matInput [(ngModel)]="cursoData.nombre" placeholder="Ej: Álgebra Lineal">
        <mat-icon matPrefix class="icon-prefix">school</mat-icon>
      </mat-form-field>

      <!-- Descripción -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Descripción</mat-label>
        <textarea matInput [(ngModel)]="cursoData.descripcion" rows="3" placeholder="Describe el contenido del curso..."></textarea>
        <mat-icon matPrefix class="icon-prefix">description</mat-icon>
      </mat-form-field>

      <!-- Categoría -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Categoría</mat-label>
        <mat-select [(ngModel)]="cursoData.categoria" (selectionChange)="onCategoriaChange($event.value)">
          @for(cat of categorias; track cat.value) {
            <mat-option [value]="cat.value">
              <span>{{cat.label}}</span>
            </mat-option>
          }
          <mat-divider></mat-divider>
          <mat-option value="_NUEVA_" class="opcion-nueva">
            <mat-icon color="accent">add_circle</mat-icon>
            <span>Crear Nueva Categoría</span>
          </mat-option>
        </mat-select>
        <mat-icon matPrefix class="icon-prefix">category</mat-icon>
      </mat-form-field>

      <!-- Panel de Nueva Categoría -->
      <div class="nueva-categoria-panel" *ngIf="crearNuevaCategoria">
        <div class="panel-header">
          <mat-icon class="panel-icon">lightbulb</mat-icon>
          <h4>¡Crea tu categoría personalizada!</h4>
        </div>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Nombre de la Categoría</mat-label>
          <input matInput [(ngModel)]="nuevaCategoriaNombre"
                 placeholder="Ej: Marketing Digital, Gastronomía..."
                 #inputCategoria
                 (keyup.enter)="guardarNuevaCategoria()">
          <mat-hint>Escribe el nombre de tu nueva categoría</mat-hint>
        </mat-form-field>

        <div class="categoria-actions">
          <button mat-stroked-button color="warn" (click)="cancelarNuevaCategoria()">
            <mat-icon>close</mat-icon>
            Cancelar
          </button>
          <button mat-flat-button color="primary" (click)="guardarNuevaCategoria()" [disabled]="!nuevaCategoriaNombre.trim()">
            <mat-icon>check</mat-icon>
            Guardar Categoría
          </button>
        </div>
      </div>

      <!-- Precio -->
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Precio ($)</mat-label>
        <input matInput type="number" [(ngModel)]="cursoData.precio" placeholder="45">
        <mat-hint>Ingresa el precio en dólares</mat-hint>
        <span matTextPrefix>$&nbsp;</span>
        <mat-icon matPrefix class="icon-prefix">attach_money</mat-icon>
      </mat-form-field>
    </mat-dialog-content>
    
    <mat-dialog-actions align="end" class="dialog-actions">
      <button mat-button mat-dialog-close class="btn-cancel">
        <mat-icon>close</mat-icon>
        Cancelar
      </button>
      <button mat-raised-button color="primary" 
              [mat-dialog-close]="cursoData" 
              [disabled]="!cursoData.nombre"
              class="btn-save">
        <mat-icon>{{data.edit ? 'update' : 'save'}}</mat-icon>
        {{data.edit ? 'Actualizar' : 'Crear'}} Curso
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width { width: 100%; margin-bottom: 20px; }

    :host ::ng-deep .mat-mdc-dialog-content {
      max-height: 70vh;
      padding: 24px !important;
    }

    .dialog-title {
      display: flex;
      align-items: center;
      gap: 12px;
      color: #1e293b;
      font-size: 24px;
      flex-shrink: 0;
    }

    .dialog-title mat-icon {
      color: #f97316;
      font-size: 28px;
      flex-shrink: 0;
    }

    .dialog-content {
      display: flex;
      flex-direction: column;
      padding: 8px 0;
    }

    /* Iconos prefix */
    .icon-prefix {
      font-size: 20px;
      width: 20px;
      height: 20px;
      color: #f97316;
      margin-right: 8px;
      flex-shrink: 0;
    }

    mat-form-field mat-label {
      font-weight: 600;
      color: #475569;
    }

    /* Panel de Nueva Categoría */
    .nueva-categoria-panel {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      padding: 24px;
      border-radius: 16px;
      margin: 16px 0;
      border: 2px solid #f59e0b;
      box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
      animation: slideDown 0.3s ease-out, pulse 2s ease-in-out infinite;
      flex-shrink: 0;
    }

    .panel-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }

    .panel-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: #f59e0b;
      animation: glow 1.5s ease-in-out infinite;
    }

    .panel-header h4 {
      margin: 0;
      color: #92400e;
      font-size: 16px;
      font-weight: 700;
    }

    .categoria-actions {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      margin-top: 16px;
    }

    .categoria-actions button {
      min-width: 120px;
    }

    .opcion-nueva {
      color: #f97316;
      font-weight: 700;
    }

    .opcion-nueva mat-icon {
      margin-right: 8px;
    }

    .dialog-actions {
      padding: 16px 24px;
      border-top: 1px solid #e2e8f0;
      gap: 12px;
      flex-shrink: 0;
    }

    .btn-save {
      font-weight: 700;
      padding: 8px 24px;
    }

    /* Animaciones */
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }

    @keyframes pulse {
      0%, 100% {
        box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
      }
      50% {
        box-shadow: 0 6px 20px rgba(245, 158, 11, 0.35);
      }
    }

    @keyframes glow {
      0%, 100% {
        transform: scale(1);
        opacity: 1;
      }
      50% {
        transform: scale(1.1);
        opacity: 0.8;
      }
    }
  `]
})
export class NuevoCursoDialog {
  cursoData: any = {
    nombre: '',
    descripcion: '',
    categoria: 'Matemáticas',
    precio: 0
  };
  
  crearNuevaCategoria = false;
  nuevaCategoriaNombre = '';
  categorias = CATEGORIAS_PREDEFINIDAS;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.edit) {
      this.cursoData = { ...data };
    }
  }

  onCategoriaChange(valor: string): void {
    if (valor === '_NUEVA_') {
      this.crearNuevaCategoria = true;
      this.nuevaCategoriaNombre = '';
      setTimeout(() => {
        this.cursoData.categoria = '';
      }, 100);
    }
  }

  guardarNuevaCategoria(): void {
    if (this.nuevaCategoriaNombre.trim()) {
      const categoriaLimpia = this.nuevaCategoriaNombre.trim();
      this.cursoData.categoria = categoriaLimpia;
      
      this.categorias = [
        ...this.categorias.filter(c => c.value !== '_NUEVA_'),
        { value: categoriaLimpia, label: '✨ ' + categoriaLimpia },
        { value: '_NUEVA_', label: '➕ Crear Nueva Categoría' }
      ];
      
      this.crearNuevaCategoria = false;
      this.nuevaCategoriaNombre = '';
    }
  }

  cancelarNuevaCategoria(): void {
    this.crearNuevaCategoria = false;
    this.nuevaCategoriaNombre = '';
    this.cursoData.categoria = 'Matemáticas';
  }
}
