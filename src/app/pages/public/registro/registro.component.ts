import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
    <div class="registro-container">
      <div class="registro-card">
        <h1>Crear Cuenta</h1>
        <p>Únete a Academia MIRZAKHANI</p>
        
        <form class="registro-form">
          <mat-form-field appearance="outline">
            <mat-label>Nombre Completo</mat-label>
            <input matInput>
          </mat-form-field>
          
          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput type="email">
          </mat-form-field>
          
          <mat-form-field appearance="outline">
            <mat-label>Teléfono</mat-label>
            <input matInput type="tel">
          </mat-form-field>
          
          <mat-form-field appearance="outline">
            <mat-label>Contraseña</mat-label>
            <input matInput type="password">
          </mat-form-field>
          
          <button mat-raised-button color="primary" type="submit" class="btn-register">
            Registrarme
          </button>
        </form>
        
        <div class="login-link">
          ¿Ya tienes cuenta? <a routerLink="/login">Inicia sesión</a>
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
      .btn-register { width: 100%; padding: 16px; font-size: 16px; font-weight: 800; margin-top: 8px; }
      .login-link { text-align: center; margin-top: 24px; color: #64748b; }
      .login-link a { color: #f97316; text-decoration: none; font-weight: 700; }
      .login-link a:hover { text-decoration: underline; }
    </style>
  `
})
export class RegistroComponent {

}
