import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    FormsModule, CommonModule, RouterLink
  ],
  template: `
    <div class="registro-container">
      <div class="registro-card">
        <h1>Crear Cuenta</h1>
        <p>Únete a Academia MIRZAKHANI</p>

        <form (ngSubmit)="onRegister()" class="registro-form">
          <mat-form-field appearance="outline">
            <mat-label>Nombre Completo</mat-label>
            <input matInput [(ngModel)]="nombre" name="nombre" required>
            <mat-icon matPrefix>person</mat-icon>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput [(ngModel)]="email" name="email" type="email" required>
            <mat-icon matPrefix>email</mat-icon>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>DNI</mat-label>
            <input matInput [(ngModel)]="dni" name="dni" required>
            <mat-icon matPrefix>badge</mat-icon>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Teléfono</mat-label>
            <input matInput [(ngModel)]="telefono" name="telefono" type="tel" required>
            <mat-icon matPrefix>phone</mat-icon>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Contraseña</mat-label>
            <input matInput [(ngModel)]="password" name="password" type="password" required>
            <mat-icon matPrefix>lock</mat-icon>
          </mat-form-field>

          <button mat-raised-button color="primary" type="submit" 
                  class="btn-register" 
                  [disabled]="!nombre || !email || !dni || !telefono || !password">
            <mat-icon>person_add</mat-icon>
            <span>Registrarme</span>
          </button>

          <div class="registro-info" *ngIf="mensajeError">
            <mat-icon>error</mat-icon>
            <p>{{mensajeError}}</p>
          </div>

          <div class="registro-info success" *ngIf="mensajeExito">
            <mat-icon>check_circle</mat-icon>
            <p>{{mensajeExito}}</p>
          </div>
        </form>

        <div class="login-link">
          ¿Ya tienes cuenta? <a routerLink="/authentication/login">Inicia sesión</a>
        </div>
      </div>
    </div>

    <style>
      .registro-container { min-height: 100vh; background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); display: flex; align-items: center; justify-content: center; padding: 20px; }
      .registro-card { background: white; padding: 48px; border-radius: 24px; width: 100%; max-width: 450px; box-shadow: 0 40px 80px rgba(0,0,0,0.2); }
      .registro-card h1 { font-size: 32px; font-weight: 900; color: #1e293b; margin: 0 0 8px; text-align: center; }
      .registro-card > p { color: #64748b; text-align: center; margin: 0 0 32px; }
      .registro-form { display: flex; flex-direction: column; gap: 20px; }
      mat-form-field { width: 100%; }
      mat-form-field mat-icon { color: #f97316; }
      .btn-register { width: 100%; padding: 16px; font-size: 16px; font-weight: 800; margin-top: 8px; }
      .login-link { text-align: center; margin-top: 24px; color: #64748b; }
      .login-link a { color: #f97316; text-decoration: none; font-weight: 700; }
      .login-link a:hover { text-decoration: underline; }
      .registro-info { background: #fef2f2; padding: 16px; border-radius: 12px; border: 2px solid #ef4444; display: flex; align-items: center; gap: 12px; }
      .registro-info mat-icon { color: #ef4444; }
      .registro-info p { margin: 0; color: #991b1b; font-size: 14px; }
      .registro-info.success { background: #f0fdf4; border-color: #22c55e; }
      .registro-info.success mat-icon { color: #22c55e; }
      .registro-info.success p { color: #166534; }
    </style>
  `
})
export class RegistroComponent {
  nombre: string = '';
  email: string = '';
  dni: string = '';
  telefono: string = '';
  password: string = '';
  mensajeError: string = '';
  mensajeExito: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onRegister(): Promise<void> {
    this.mensajeError = '';
    this.mensajeExito = '';

    const result = await this.authService.register({
      nombre: this.nombre,
      email: this.email,
      dni: this.dni,
      telefono: this.telefono,
      password: this.password,
      cursoId: 1 // Curso por defecto
    });

    if (result.success && result.estudiante) {
      this.mensajeExito = result.message;
      setTimeout(() => {
        this.router.navigate(['/estudiante/dashboard']);
      }, 1500);
    } else {
      this.mensajeError = result.message;
    }
  }
}
