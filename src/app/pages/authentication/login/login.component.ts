import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordDialogComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink, MatIconModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, FormsModule, CommonModule
  ],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <mat-icon class="logo-icon">school</mat-icon>
          <h1>Academia MIRZAKHANI</h1>
          <p>Inicia sesión en tu cuenta de estudiante</p>
        </div>

        <form (ngSubmit)="onLogin()" class="login-form">
          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Correo Electrónico</mat-label>
            <input matInput [(ngModel)]="email" name="email" type="email" 
                   placeholder="tu@correo.com" required>
            <mat-icon matPrefix>email</mat-icon>
          </mat-form-field>

          <mat-form-field appearance="outline" class="full-width">
            <mat-label>Contraseña</mat-label>
            <input matInput [(ngModel)]="password" name="password" type="password" 
                   placeholder="Ingresa tu contraseña" required>
            <mat-icon matPrefix>lock</mat-icon>
          </mat-form-field>

          <div class="login-options">
            <label class="checkbox-label">
              <input type="checkbox" [(ngModel)]="recordarme" name="recordarme">
              <span>Recordarme</span>
            </label>
            <a href="javascript:void(0)" class="forgot-password" (click)="openResetPassword()">¿Olvidaste tu contraseña?</a>
          </div>

          <button mat-raised-button color="primary" type="submit" 
                  class="btn-login" [disabled]="!email || !password">
            <mat-icon>login</mat-icon>
            <span>Ingresar</span>
          </button>

          <div class="login-info" *ngIf="mensajeError">
            <mat-icon>error</mat-icon>
            <p>{{mensajeError}}</p>
          </div>

          <div class="registro-link">
            <p>¿Aún no tienes cuenta?</p>
            <p>
              <a routerLink="/cursos-public">Solicita tu inscripción aquí</a>
            </p>
          </div>
        </form>
      </div>

      <div class="login-footer">
        <p>© 2026 Academia MIRZAKHANI. Todos los derechos reservados.</p>
      </div>
    </div>

    <style>
      .login-container {
        min-height: 100vh;
        background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }

      .login-card {
        background: white;
        padding: 48px;
        border-radius: 24px;
        width: 100%;
        max-width: 450px;
        box-shadow: 0 40px 80px rgba(0,0,0,0.3);
      }

      .login-header {
        text-align: center;
        margin-bottom: 32px;
      }

      .logo-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 16px;
      }

      .login-header h1 {
        font-size: 28px;
        font-weight: 900;
        color: #1e293b;
        margin: 0 0 8px;
      }

      .login-header p {
        color: #64748b;
        margin: 0;
        font-size: 15px;
      }

      .login-form {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .full-width {
        width: 100%;
      }

      mat-form-field mat-icon {
        color: #f97316;
      }

      .login-options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
      }

      .checkbox-label {
        display: flex;
        align-items: center;
        gap: 8px;
        color: #64748b;
        cursor: pointer;
      }

      .forgot-password {
        color: #f97316;
        text-decoration: none;
        font-weight: 600;
      }

      .forgot-password:hover {
        text-decoration: underline;
      }

      .btn-login {
        width: 100%;
        padding: 16px;
        font-size: 16px;
        font-weight: 800;
        margin-top: 8px;
      }

      .login-info {
        background: #fef2f2;
        padding: 16px;
        border-radius: 12px;
        border: 2px solid #ef4444;
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .login-info mat-icon {
        color: #ef4444;
      }

      .login-info p {
        margin: 0;
        color: #991b1b;
        font-size: 14px;
      }

      .registro-link {
        text-align: center;
        padding: 24px 0 0;
        border-top: 2px solid #f1f5f9;
      }

      .registro-link p {
        margin: 8px 0;
        color: #64748b;
        font-size: 14px;
      }

      .registro-link a {
        color: #f97316;
        text-decoration: none;
        font-weight: 700;
      }

      .registro-link a:hover {
        text-decoration: underline;
      }

      .login-footer {
        margin-top: 32px;
        text-align: center;
        color: rgba(255, 255, 255, 0.9);
        font-size: 14px;
      }

      @media (max-width: 480px) {
        .login-card {
          padding: 32px 24px;
        }
      }
    </style>
  `
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  recordarme: boolean = false;
  mensajeError: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  openResetPassword(): void {
    const dialogRef = this.dialog.open(ResetPasswordDialogComponent, {
      width: '400px'
    });
  }

  onLogin(): void {
    const result = this.authService.login(this.email, this.password);

    if (result.success && result.estudiante) {
      this.mensajeError = '';
      // Redirigir al dashboard del estudiante
      this.router.navigate(['/estudiante/dashboard']);
    } else {
      this.mensajeError = result.message;
    }
  }
}
