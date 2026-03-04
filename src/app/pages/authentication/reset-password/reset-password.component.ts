import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password-dialog',
  standalone: true,
  imports: [
    MatDialogModule, MatIconModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, FormsModule, CommonModule
  ],
  template: `
    <div class="reset-password-container">
      <div class="reset-header">
        <mat-icon class="reset-icon">lock_reset</mat-icon>
        <h2>Recuperar Contraseña</h2>
        <p>Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña</p>
      </div>

      <form (ngSubmit)="onReset()" class="reset-form">
        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Correo Electrónico</mat-label>
          <input matInput [(ngModel)]="email" name="email" type="email"
                 placeholder="tu@correo.com" required>
          <mat-icon matPrefix>email</mat-icon>
        </mat-form-field>

        <div class="reset-info" *ngIf="mensaje">
          <mat-icon [class.success]="success" [class.error]="!success">
            {{success ? 'check_circle' : 'error'}}
          </mat-icon>
          <p>{{mensaje}}</p>
        </div>

        <div class="reset-actions">
          <button mat-button type="button" (click)="dialogRef.close()" class="btn-cancel">
            Cancelar
          </button>
          <button mat-raised-button color="primary" type="submit"
                  [disabled]="!email || enviando" class="btn-reset">
            <mat-icon *ngIf="enviando" class="spinner">refresh</mat-icon>
            <span>{{enviando ? 'Enviando...' : 'Enviar Enlace'}}</span>
          </button>
        </div>
      </form>
    </div>

    <style>
      .reset-password-container {
        padding: 24px;
        max-width: 400px;
      }

      .reset-header {
        text-align: center;
        margin-bottom: 24px;
      }

      .reset-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        color: #f97316;
        margin-bottom: 16px;
      }

      .reset-header h2 {
        font-size: 24px;
        font-weight: 800;
        color: #1e293b;
        margin: 0 0 8px;
      }

      .reset-header p {
        font-size: 14px;
        color: #64748b;
        margin: 0;
      }

      .reset-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .full-width {
        width: 100%;
      }

      .reset-info {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        border-radius: 8px;
        font-size: 14px;
      }

      .reset-info.success {
        background: #f0fdf4;
        color: #166534;
        border: 1px solid #22c55e;
      }

      .reset-info.error {
        background: #fef2f2;
        color: #991b1b;
        border: 1px solid #ef4444;
      }

      .reset-info mat-icon {
        font-size: 24px;
      }

      .reset-info mat-icon.success {
        color: #22c55e;
      }

      .reset-info mat-icon.error {
        color: #ef4444;
      }

      .reset-actions {
        display: flex;
        gap: 12px;
        justify-content: flex-end;
      }

      .btn-cancel {
        color: #64748b;
      }

      .btn-reset {
        min-width: 120px;
      }

      .spinner {
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
    </style>
  `
})
export class ResetPasswordDialogComponent {
  email: string = '';
  mensaje: string = '';
  success: boolean = false;
  enviando: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ResetPasswordDialogComponent>,
    private authService: AuthService
  ) {}

  async onReset(): Promise<void> {
    this.enviando = true;
    this.mensaje = '';

    const result = await this.authService.resetPassword(this.email);

    this.enviando = false;
    this.success = result.success;
    this.mensaje = result.message;

    if (result.success) {
      setTimeout(() => this.dialogRef.close(), 3000);
    }
  }
}
