import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="biblioteca-container">
      <h1>Biblioteca</h1>
      <div class="biblioteca-grid">
        <div class="categoria-card">
          <mat-icon>description</mat-icon>
          <h3>PDFs de Teoría</h3>
          <p>12 archivos</p>
        </div>
        <div class="categoria-card">
          <mat-icon>assignment</mat-icon>
          <h3>Ejercicios Propuestos</h3>
          <p>8 archivos</p>
        </div>
        <div class="categoria-card">
          <mat-icon>check_circle</mat-icon>
          <h3>Ejercicios Resueltos</h3>
          <p>10 archivos</p>
        </div>
        <div class="categoria-card">
          <mat-icon>play_circle</mat-icon>
          <h3>Clases Grabadas</h3>
          <p>24 videos</p>
        </div>
      </div>
    </div>

    <style>
      .biblioteca-container { padding: 20px; }
      .biblioteca-container h1 { font-size: 32px; font-weight: 900; color: #1e293b; margin: 0 0 32px; }
      .biblioteca-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; }
      .categoria-card { background: white; padding: 32px; border-radius: 20px; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.08); }
      .categoria-card mat-icon { font-size: 48px; width: 48px; height: 48px; color: #f97316; margin-bottom: 16px; }
      .categoria-card h3 { font-size: 18px; font-weight: 800; color: #1e293b; margin: 0 0 8px; }
      .categoria-card p { color: #64748b; margin: 0; }
    </style>
  `
})
export class BibliotecaComponent {

}
