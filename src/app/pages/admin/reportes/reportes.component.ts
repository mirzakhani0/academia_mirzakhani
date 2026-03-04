import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [MatIconModule],
  template: `
    <div class="reportes-container">
      <h1>Reportes y Estadísticas</h1>
      <div class="reportes-grid">
        <div class="reporte-card">
          <mat-icon>trending_up</mat-icon>
          <h3>Ventas del Mes</h3>
          <p class="valor">$4,580</p>
          <span class="variacion positive">+15% vs mes anterior</span>
        </div>
        <div class="reporte-card">
          <mat-icon>people</mat-icon>
          <h3>Nuevos Estudiantes</h3>
          <p class="valor">48</p>
          <span class="variacion positive">+8% vs mes anterior</span>
        </div>
        <div class="reporte-card">
          <mat-icon>school</mat-icon>
          <h3>Cursos Más Vendidos</h3>
          <p class="valor">Álgebra Lineal</p>
          <span class="variacion">32 ventas este mes</span>
        </div>
      </div>
    </div>
    <style>
      .reportes-container { padding: 20px; }
      h1 { font-size: 28px; font-weight: 900; color: #1e293b; margin: 0 0 32px; }
      .reportes-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; }
      .reporte-card { background: white; padding: 32px; border-radius: 16px; text-align: center; box-shadow: 0 10px 40px rgba(0,0,0,0.08); }
      .reporte-card mat-icon { font-size: 48px; color: #f97316; margin-bottom: 16px; }
      .reporte-card h3 { font-size: 16px; font-weight: 700; color: #64748b; margin: 0 0 12px; text-transform: uppercase; }
      .valor { font-size: 36px; font-weight: 900; color: #1e293b; margin: 0 0 8px; }
      .variacion { font-size: 14px; color: #64748b; }
      .variacion.positive { color: #22c55e; font-weight: 700; }
    </style>
  `
})
export class ReportesComponent {

}
