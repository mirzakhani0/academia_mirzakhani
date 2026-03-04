import { Component, OnInit, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';

interface Usuario {
  uid?: string;
  nombre: string;
  email: string;
  dni: string;
  telefono: string;
  rol: 'estudiante' | 'admin';
  cursosMatriculados: number[];
  activo: boolean;
}

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [
    MatIconModule, MatButtonModule, CommonModule, MatCardModule,
    MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule
  ],
  template: `
    <div class="gestion-container">
      <div class="page-header">
        <h1>Gestión de Usuarios</h1>
        <button mat-raised-button color="primary" (click)="openNuevoUsuario()">
          <mat-icon>person_add</mat-icon> 
          <span class="btn-text">Nuevo Usuario</span>
        </button>
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
                <span>{{usuario.cursosMatriculados?.length || 0}} cursos</span>
              </div>
              <div class="stat-item" *ngIf="usuario.rol">
                <mat-icon>badge</mat-icon>
                <span>{{usuario.rol === 'admin' ? 'Administrador' : 'Estudiante'}}</span>
              </div>
            </div>
            <div class="usuario-actions">
              <button mat-stroked-button color="primary" (click)="openEditarUsuario(usuario)">
                <mat-icon>edit</mat-icon>
                Editar
              </button>
              <button mat-stroked-button color="warn" (click)="eliminarUsuario(usuario)">
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
        <button mat-raised-button color="primary" (click)="openNuevoUsuario()">
          <mat-icon>person_add</mat-icon> Agregar Primer Usuario
        </button>
      </div>
    </div>
  `,
  styles: [`
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
      margin-bottom: 8px;
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
  `]
})
export class GestionUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.cargarUsuarios();
  }

  async cargarUsuarios(): Promise<void> {
    try {
      const usuariosData = await this.firestoreService.getUsuarios();
      this.usuarios = usuariosData.map(u => ({
        uid: u.id,
        nombre: u.nombre,
        email: u.email,
        dni: u.dni || '',
        telefono: u.telefono || '',
        rol: u.rol || 'estudiante',
        cursosMatriculados: u.cursosMatriculados || [],
        activo: u.activo !== undefined ? u.activo : true
      }));
    } catch (error) {
      console.error('Error cargando usuarios:', error);
      // Fallback a datos locales
      this.usuarios = [
        { nombre: 'Juan Pérez', email: 'juan@email.com', dni: '', telefono: '', rol: 'estudiante', cursosMatriculados: [1], activo: true },
        { nombre: 'María López', email: 'maria@email.com', dni: '', telefono: '', rol: 'estudiante', cursosMatriculados: [2, 3], activo: true },
      ];
    }
  }

  getTotalCursos(): number {
    return this.usuarios.reduce((sum, u) => sum + (u.cursosMatriculados?.length || 0), 0);
  }

  openNuevoUsuario(): void {
    const dialogRef = this.dialog.open(NuevoUsuarioDialog, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result) {
        try {
          await this.firestoreService.createUsuario({
            nombre: result.nombre,
            email: result.email,
            dni: result.dni,
            telefono: result.telefono,
            rol: result.rol,
            password: result.password,
            cursosMatriculados: [],
            activo: true
          });
          await this.cargarUsuarios();
          alert('✅ Usuario creado exitosamente');
        } catch (error) {
          console.error('Error creando usuario:', error);
          alert('❌ Error al crear usuario. Intente nuevamente.');
        }
      }
    });
  }

  openEditarUsuario(usuario: Usuario): void {
    const dialogRef = this.dialog.open(NuevoUsuarioDialog, {
      width: '500px',
      data: { ...usuario, edit: true }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result && usuario.uid) {
        try {
          await this.firestoreService.updateUsuario(usuario.uid, {
            nombre: result.nombre,
            email: result.email,
            dni: result.dni,
            telefono: result.telefono,
            rol: result.rol,
            activo: result.activo
          });
          await this.cargarUsuarios();
          alert('✅ Usuario actualizado exitosamente');
        } catch (error) {
          console.error('Error actualizando usuario:', error);
          alert('❌ Error al actualizar usuario.');
        }
      }
    });
  }

  async eliminarUsuario(usuario: Usuario): Promise<void> {
    if (confirm(`¿Estás seguro de eliminar a ${usuario.nombre}?`)) {
      try {
        if (usuario.uid) {
          // En lugar de eliminar, desactivamos el usuario
          await this.firestoreService.updateUsuario(usuario.uid, { activo: false });
          await this.cargarUsuarios();
          alert('✅ Usuario eliminado exitosamente');
        }
      } catch (error) {
        console.error('Error eliminando usuario:', error);
        alert('❌ Error al eliminar usuario.');
      }
    }
  }
}

@Component({
  selector: 'nuevo-usuario-dialog',
  standalone: true,
  imports: [
    MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    FormsModule, MatButtonModule, MatIconModule
  ],
  template: `
    <h2 mat-dialog-title class="dialog-title">
      <mat-icon>{{data.edit ? 'edit' : 'person_add'}}</mat-icon>
      {{data.edit ? 'Editar' : 'Nuevo'}} Usuario
    </h2>

    <mat-dialog-content>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Nombre Completo</mat-label>
        <input matInput [(ngModel)]="usuarioData.nombre" placeholder="Ej: Juan Pérez García">
        <mat-icon matPrefix>person</mat-icon>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Correo Electrónico</mat-label>
        <input matInput [(ngModel)]="usuarioData.email" type="email" placeholder="juan@ejemplo.com">
        <mat-icon matPrefix>email</mat-icon>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>DNI</mat-label>
        <input matInput [(ngModel)]="usuarioData.dni" placeholder="8 dígitos" maxlength="8">
        <mat-icon matPrefix>badge</mat-icon>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Teléfono / WhatsApp</mat-label>
        <input matInput [(ngModel)]="usuarioData.telefono" placeholder="+51 999 999 999">
        <mat-icon matPrefix>phone</mat-icon>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width" *ngIf="!data.edit">
        <mat-label>Contraseña Temporal</mat-label>
        <input matInput [(ngModel)]="usuarioData.password" type="password" placeholder="Mínimo 6 caracteres">
        <mat-icon matPrefix>lock</mat-icon>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Rol</mat-label>
        <mat-select [(ngModel)]="usuarioData.rol">
          <mat-option value="estudiante">Estudiante</mat-option>
          <mat-option value="admin">Administrador</mat-option>
        </mat-select>
        <mat-icon matPrefix>badge</mat-icon>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width" *ngIf="data.edit">
        <mat-label>Estado</mat-label>
        <mat-select [(ngModel)]="usuarioData.activo">
          <mat-option [value]="true">Activo</mat-option>
          <mat-option [value]="false">Inactivo</mat-option>
        </mat-select>
        <mat-icon matPrefix>toggle_on</mat-icon>
      </mat-form-field>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button color="primary" [disabled]="!isValidForm()" (click)="guardarUsuario()">
        <mat-icon>check</mat-icon>
        {{data.edit ? 'Actualizar' : 'Crear'}}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }

    .dialog-title {
      display: flex;
      align-items: center;
      gap: 12px;
      color: #1e293b;
      padding: 16px 24px 0;
    }

    .dialog-title mat-icon {
      color: #f97316;
      font-size: 28px;
    }

    mat-dialog-content {
      padding: 24px;
      max-height: 70vh;
    }

    mat-dialog-actions {
      padding: 16px 24px;
      border-top: 1px solid #e2e8f0;
    }
  `]
})
export class NuevoUsuarioDialog {
  usuarioData: any = {
    nombre: '',
    email: '',
    dni: '',
    telefono: '',
    password: '',
    rol: 'estudiante',
    activo: true
  };

  constructor(
    public dialogRef: MatDialogRef<NuevoUsuarioDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.edit) {
      this.usuarioData = {
        nombre: data.nombre || '',
        email: data.email || '',
        dni: data.dni || '',
        telefono: data.telefono || '',
        rol: data.rol || 'estudiante',
        activo: data.activo !== undefined ? data.activo : true
      };
    }
  }

  isValidForm(): boolean {
    return this.usuarioData.nombre &&
           this.usuarioData.email &&
           this.usuarioData.email.includes('@') &&
           this.usuarioData.dni &&
           this.usuarioData.dni.length === 8 &&
           this.usuarioData.telefono &&
           (!this.data.edit || true);
  }

  guardarUsuario(): void {
    this.dialogRef.close(this.usuarioData);
  }
}
