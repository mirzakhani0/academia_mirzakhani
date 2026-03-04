import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  template: `
    <div class="perfil-container">
      <h1>Mi Perfil</h1>
      <div class="perfil-card">
        <div class="avatar-section">
          <div class="avatar">
            <mat-icon>person</mat-icon>
          </div>
          <button mat-raised-button color="primary">Cambiar Foto</button>
        </div>
        <div class="form-section">
          <mat-form-field appearance="outline">
            <mat-label>Nombre Completo</mat-label>
            <input matInput value="Estudiante Ejemplo">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput value="estudiante@email.com">
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Teléfono</mat-label>
            <input matInput value="+51 999 999 999">
          </mat-form-field>
          <button mat-raised-button color="primary">Guardar Cambios</button>
        </div>
      </div>
    </div>

    <style>
      .perfil-container { padding: 20px; }
      .perfil-container h1 { font-size: 32px; font-weight: 900; color: #1e293b; margin: 0 0 32px; }
      .perfil-card { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.08); }
      .avatar-section { text-align: center; margin-bottom: 32px; }
      .avatar { width: 120px; height: 120px; background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
      .avatar mat-icon { font-size: 60px; width: 60px; height: 60px; color: white; }
      .form-section { max-width: 500px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px; }
      mat-form-field { width: 100%; }
      button { align-self: flex-start; padding: 12px 32px; }
    </style>
  `
})
export class PerfilComponent {

}
