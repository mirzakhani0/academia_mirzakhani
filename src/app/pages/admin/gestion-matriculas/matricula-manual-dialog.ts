import { Component, Inject } from '@angular/core';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'matricula-manual-dialog',
  standalone: true,
  imports: [
    MatDialogModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatIconModule, FormsModule, CommonModule
  ],
  template: `
    <h2 mat-dialog-title class="dialog-title">
      <mat-icon>person_add</mat-icon>
      Matricular Estudiante
    </h2>

    <mat-dialog-content>
      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Nombre Completo</mat-label>
        <input matInput [(ngModel)]="estudianteData.nombre" placeholder="Ej: Juan Pérez García">
        <mat-icon matPrefix>person</mat-icon>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Correo Electrónico</mat-label>
        <input matInput [(ngModel)]="estudianteData.email" type="email" placeholder="juan@ejemplo.com">
        <mat-icon matPrefix>email</mat-icon>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>DNI</mat-label>
        <input matInput [(ngModel)]="estudianteData.dni" placeholder="8 dígitos" maxlength="8">
        <mat-icon matPrefix>badge</mat-icon>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Teléfono / WhatsApp</mat-label>
        <input matInput [(ngModel)]="estudianteData.telefono" placeholder="+51 999 999 999">
        <mat-icon matPrefix>phone</mat-icon>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Contraseña Temporal</mat-label>
        <input matInput [(ngModel)]="estudianteData.password" type="password" placeholder="Mínimo 6 caracteres">
        <mat-icon matPrefix>lock</mat-icon>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Seleccionar Curso</mat-label>
        <mat-select [(ngModel)]="cursoSeleccionado">
          <mat-option *ngFor="let curso of data.cursos" [value]="curso">
            {{curso.nombre}} - S/ {{curso.precio}}
          </mat-option>
        </mat-select>
        <mat-icon matPrefix>school</mat-icon>
      </mat-form-field>

      <div class="curso-resumen" *ngIf="cursoSeleccionado">
        <h4>Curso seleccionado:</h4>
        <p><strong>{{cursoSeleccionado.nombre}}</strong></p>
        <p>Precio: S/ {{cursoSeleccionado.precio}}</p>
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button color="primary" [disabled]="!isValidForm()" (click)="matricular()">
        <mat-icon>check_circle</mat-icon>
        Matricular Estudiante
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
      max-height: 80vh;
    }

    .curso-resumen {
      background: #eff6ff;
      padding: 16px;
      border-radius: 12px;
      border: 2px solid #3b82f6;
      margin-top: 16px;
    }

    .curso-resumen h4 {
      font-size: 14px;
      font-weight: 700;
      color: #1e40af;
      margin: 0 0 8px;
    }

    .curso-resumen p {
      font-size: 14px;
      color: #1e40af;
      margin: 4px 0;
    }

    mat-dialog-actions {
      padding: 16px 24px;
      border-top: 1px solid #e2e8f0;
    }
  `]
})
export class MatriculaManualDialog {
  estudianteData: any = {
    nombre: '',
    email: '',
    dni: '',
    telefono: '',
    password: ''
  };
  
  cursoSeleccionado: any = null;

  constructor(
    public dialogRef: MatDialogRef<MatriculaManualDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  isValidForm(): boolean {
    return this.estudianteData.nombre &&
           this.estudianteData.email &&
           this.estudianteData.email.includes('@') &&
           this.estudianteData.dni &&
           this.estudianteData.dni.length === 8 &&
           this.estudianteData.telefono &&
           this.estudianteData.password &&
           this.estudianteData.password.length >= 6 &&
           this.cursoSeleccionado;
  }

  matricular(): void {
    this.dialogRef.close({
      ...this.estudianteData,
      cursoId: this.cursoSeleccionado.id,
      cursoNombre: this.cursoSeleccionado.nombre,
      precio: this.cursoSeleccionado.precio
    });
  }
}
