import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTableModule],
  template: `
    <div class="gestion-container">
      <div class="page-header">
        <h1>Gestión de Usuarios</h1>
        <button mat-raised-button color="primary"><mat-icon>person_add</mat-icon> Nuevo Usuario</button>
      </div>
      <table mat-table [dataSource]="usuarios">
        <ng-container matColumnDef="nombre">
          <th mat-header-cell *matHeaderCellDef>Nombre</th>
          <td mat-cell *matCellDef="let usuario">{{usuario.nombre}}</td>
        </ng-container>
        <ng-container matColumnDef="email">
          <th mat-header-cell *matHeaderCellDef>Email</th>
          <td mat-cell *matCellDef="let usuario">{{usuario.email}}</td>
        </ng-container>
        <ng-container matColumnDef="cursos">
          <th mat-header-cell *matHeaderCellDef>Cursos</th>
          <td mat-cell *matCellDef="let usuario">{{usuario.cursos}}</td>
        </ng-container>
        <ng-container matColumnDef="acciones">
          <th mat-header-cell *matHeaderCellDef>Acciones</th>
          <td mat-cell *matCellDef="let usuario">
            <button mat-icon-button color="primary"><mat-icon>edit</mat-icon></button>
            <button mat-icon-button color="warn"><mat-icon>delete</mat-icon></button>
          </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
    <style>
      .gestion-container { padding: 20px; }
      .page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
      .page-header h1 { font-size: 28px; font-weight: 900; color: #1e293b; margin: 0; }
      table { width: 100%; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.08); }
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
}
