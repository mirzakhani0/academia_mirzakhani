import { Component, Inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { MatriculasService, Solicitud } from 'src/app/services/matriculas.service';
import { AuthService, Estudiante } from 'src/app/services/auth.service';
import { AcademiaService, Curso } from 'src/app/services/academia.service';
import { MatriculaManualDialog } from './matricula-manual-dialog';

@Component({
  selector: 'app-gestion-matriculas',
  standalone: true,
  imports: [
    MatIconModule, MatButtonModule, MatChipsModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatCheckboxModule,
    FormsModule, CommonModule, DatePipe, MatCardModule, MatriculaManualDialog
  ],
  template: `
    <div class="matriculas-container">
      <!-- Header con Estadísticas -->
      <div class="matriculas-header">
        <div class="header-info">
          <h1>Gestión de Matrículas</h1>
          <p>Administra las solicitudes de inscripción de estudiantes</p>
        </div>
        <button mat-raised-button color="primary" (click)="openMatriculaManual()">
          <mat-icon>person_add</mat-icon>
          <span>Matricular Estudiante</span>
        </button>
      </div>

      <!-- Tarjetas de Estadísticas -->
      <div class="stats-cards">
        <div class="stat-card pendientes">
          <div class="stat-icon">
            <mat-icon>pending</mat-icon>
          </div>
          <div class="stat-content">
            <h3>{{conteoPendientes}}</h3>
            <p>Pendientes</p>
          </div>
        </div>
        <div class="stat-card aprobados">
          <div class="stat-icon">
            <mat-icon>check_circle</mat-icon>
          </div>
          <div class="stat-content">
            <h3>{{conteoAprobados}}</h3>
            <p>Aprobados</p>
          </div>
        </div>
        <div class="stat-card total">
          <div class="stat-icon">
            <mat-icon>people</mat-icon>
          </div>
          <div class="stat-content">
            <h3>{{solicitudes.length}}</h3>
            <p>Total Solicitudes</p>
          </div>
        </div>
      </div>

      <!-- Lista de Solicitudes -->
      <div class="solicitudes-list">
        <h2 class="section-title">Solicitudes Recientes</h2>
        
        <div class="solicitud-card" *ngFor="let solicitud of solicitudes" [class.estado-solicitud]="solicitud.estado">
          <div class="solicitud-header">
            <div class="solicitud-info">
              <h3>{{solicitud.nombre}}</h3>
              <p class="curso-nombre">{{solicitud.cursoNombre}}</p>
            </div>
            <mat-chip [class]="solicitud.estado">
              {{solicitud.estado}}
            </mat-chip>
          </div>

          <div class="solicitud-body">
            <div class="info-grid">
              <div class="info-item">
                <mat-icon>email</mat-icon>
                <span>{{solicitud.email}}</span>
              </div>
              <div class="info-item">
                <mat-icon>badge</mat-icon>
                <span>DNI: {{solicitud.dni}}</span>
              </div>
              <div class="info-item">
                <mat-icon>phone</mat-icon>
                <span>{{solicitud.telefono}}</span>
              </div>
              <div class="info-item">
                <mat-icon>calendar_today</mat-icon>
                <span>{{solicitud.fecha | date:'dd/MM/yyyy HH:mm'}}</span>
              </div>
            </div>

            <div class="solicitud-footer">
              <div class="precio-info" *ngIf="solicitud.estado === 'pendiente'">
                <mat-icon>attach_money</mat-icon>
                <span>Precio: <strong>\${{solicitud.precio}}</strong></span>
              </div>

              <div class="credenciales" *ngIf="solicitud.estado === 'aprobado' && solicitud.password">
                <mat-icon>lock</mat-icon>
                <div class="credenciales-info">
                  <span><strong>Email:</strong> {{solicitud.email}}</span>
                  <span><strong>Contraseña:</strong> {{solicitud.password}}</span>
                </div>
                <button mat-button color="primary" (click)="copiarCredenciales(solicitud)">
                  <mat-icon>content_copy</mat-icon>
                  Copiar
                </button>
              </div>

              <div class="acciones">
                <ng-container *ngIf="solicitud.estado === 'pendiente'">
                  <button mat-stroked-button color="warn" (click)="rechazarSolicitud(solicitud)">
                    <mat-icon>cancel</mat-icon>
                    Rechazar
                  </button>
                  <button mat-flat-button color="primary" (click)="aprobarSolicitud(solicitud)">
                    <mat-icon>check_circle</mat-icon>
                    Aprobar y Matricular
                  </button>
                </ng-container>

                <button mat-stroked-button color="accent" (click)="asignarCursos(solicitud)" *ngIf="solicitud.estado === 'aprobado'">
                  <mat-icon>school</mat-icon>
                  Asignar Cursos
                </button>
                
                <button mat-stroked-button color="primary" (click)="verDetalle(solicitud)" *ngIf="solicitud.estado !== 'pendiente' && solicitud.estado !== 'aprobado'">
                  <mat-icon>visibility</mat-icon>
                  Ver Detalle
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="empty-state" *ngIf="solicitudes.length === 0">
          <mat-icon>inbox</mat-icon>
          <p>No hay solicitudes para mostrar</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .matriculas-container { padding: 20px; }
    
    .matriculas-header {
      margin-bottom: 32px;
    }
    
    .header-info h1 {
      font-size: 32px;
      font-weight: 900;
      color: #1e293b;
      margin: 0 0 8px;
    }
    
    .header-info p {
      color: #64748b;
      margin: 0;
    }
    
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
      border-left: 4px solid transparent;
    }
    
    .stat-card.pendientes {
      border-left-color: #f59e0b;
    }
    
    .stat-card.aprobados {
      border-left-color: #22c55e;
    }
    
    .stat-card.total {
      border-left-color: #3b82f6;
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
    
    .stat-card.pendientes .stat-icon {
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
    }
    
    .stat-card.aprobados .stat-icon {
      background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    }
    
    .stat-card.total .stat-icon {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
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
    
    .section-title {
      font-size: 24px;
      font-weight: 800;
      color: #1e293b;
      margin: 0 0 24px;
    }
    
    .solicitudes-list {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .solicitud-card {
      background: white;
      border-radius: 16px;
      padding: 24px;
      box-shadow: 0 10px 40px rgba(0,0,0,0.08);
      border: 2px solid transparent;
      transition: all 0.3s;
    }
    
    .solicitud-card.estado-pendiente {
      border-color: #f59e0b;
    }
    
    .solicitud-card.estado-aprobado {
      border-color: #22c55e;
    }
    
    .solicitud-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding-bottom: 16px;
      border-bottom: 2px solid #f1f5f9;
    }
    
    .solicitud-info h3 {
      font-size: 20px;
      font-weight: 800;
      color: #1e293b;
      margin: 0 0 6px;
    }
    
    .curso-nombre {
      font-size: 15px;
      color: #64748b;
      margin: 0;
    }
    
    .mat-chip {
      font-weight: 700;
      text-transform: uppercase;
      font-size: 11px;
    }
    
    .mat-chip.pendiente {
      background: #fef3c7;
      color: #92400e;
    }
    
    .mat-chip.aprobado {
      background: #f0fdf4;
      color: #166534;
    }
    
    .solicitud-body {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
    }
    
    .info-item {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 14px;
      color: #475569;
    }
    
    .info-item mat-icon {
      font-size: 20px;
      color: #f97316;
    }
    
    .solicitud-footer {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
      align-items: center;
      justify-content: space-between;
      padding-top: 20px;
      border-top: 2px solid #f1f5f9;
    }
    
    .precio-info {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 16px;
      color: #1e293b;
    }
    
    .precio-info mat-icon {
      color: #22c55e;
    }
    
    .credenciales {
      display: flex;
      align-items: center;
      gap: 16px;
      background: #f0fdf4;
      padding: 12px 16px;
      border-radius: 12px;
      border: 2px solid #22c55e;
      font-size: 13px;
      color: #166534;
    }
    
    .credenciales mat-icon {
      color: #16a34a;
    }
    
    .credenciales-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    
    .acciones {
      display: flex;
      gap: 12px;
      margin-left: auto;
    }
    
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #94a3b8;
    }
    
    .empty-state mat-icon {
      font-size: 64px;
      margin-bottom: 16px;
    }
  `]
})
export class GestionMatriculasComponent {
  solicitudes: Solicitud[] = [];
  conteoPendientes: number = 0;
  conteoAprobados: number = 0;

  constructor(
    private matriculasService: MatriculasService,
    private authService: AuthService,
    private academiaService: AcademiaService,
    private dialog: MatDialog
  ) {
    this.cargarSolicitudes();
  }

  async cargarSolicitudes(): Promise<void> {
    this.solicitudes = await this.matriculasService.getSolicitudes();
    this.conteoPendientes = (await this.matriculasService.getSolicitudesByEstado('pendiente')).length;
    this.conteoAprobados = (await this.matriculasService.getSolicitudesByEstado('aprobado')).length;
  }

  verDetalle(solicitud: Solicitud): void {
    const dialogRef = this.dialog.open(DetalleSolicitudDialog, {
      width: '600px',
      data: { solicitud }
    });
  }

  async aprobarSolicitud(solicitud: Solicitud): Promise<void> {
    const dialogRef = this.dialog.open(AprobarSolicitudDialog, {
      width: '600px',
      data: { solicitud }
    });

    dialogRef.afterClosed().subscribe(async result => {
      if (result && solicitud.id) {
        await this.matriculasService.updateEstado(solicitud.id, 'aprobado', result.password);
        await this.cargarSolicitudes();
        alert(`✅ Solicitud aprobada. Credenciales enviadas a ${solicitud.email}`);
      }
    });
  }

  async rechazarSolicitud(solicitud: Solicitud): Promise<void> {
    if (confirm('¿Estás seguro de rechazar esta solicitud?')) {
      if (solicitud.id) {
        await this.matriculasService.updateEstado(solicitud.id, 'rechazado');
        await this.cargarSolicitudes();
        alert('❌ Solicitud rechazada');
      }
    }
  }

  copiarCredenciales(solicitud: Solicitud): void {
    const credenciales = `Email: ${solicitud.email}\nContraseña: ${solicitud.password}`;
    navigator.clipboard.writeText(credenciales);
    alert('✅ Credenciales copiadas al portapapeles');
  }

  asignarCursos(solicitud: Solicitud): void {
    const dialogRef = this.dialog.open(AsignarCursosDialog, {
      width: '700px',
      data: { solicitud },
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(async (cursosSeleccionados: number[]) => {
      if (cursosSeleccionados && solicitud.id) {
        // Actualizar la solicitud con los cursos asignados
        await this.matriculasService.updateSolicitud(solicitud.id, {
          cursoId: cursosSeleccionados[0] || solicitud.cursoId,
          cursosMatriculados: cursosSeleccionados
        });
        alert(`✅ Cursos asignados correctamente a ${solicitud.nombre}`);
        await this.cargarSolicitudes();
      }
    });
  }
}

@Component({
  selector: 'detalle-solicitud-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, CommonModule, DatePipe],
  template: `
    <h2 mat-dialog-title>Detalle de Solicitud</h2>
    <mat-dialog-content>
      <div class="detalle-info">
        <p><strong>Estudiante:</strong> {{data.solicitud.nombre}}</p>
        <p><strong>Email:</strong> {{data.solicitud.email}}</p>
        <p><strong>DNI:</strong> {{data.solicitud.dni}}</p>
        <p><strong>Teléfono:</strong> {{data.solicitud.telefono}}</p>
        <p><strong>Curso:</strong> {{data.solicitud.cursoNombre}}</p>
        <p><strong>Precio:</strong> \${{data.solicitud.precio}}</p>
        <p><strong>Fecha:</strong> {{data.solicitud.fecha | date:'dd/MM/yyyy HH:mm'}}</p>
        <p><strong>Estado:</strong> <span [class]="data.solicitud.estado">{{data.solicitud.estado}}</span></p>
        <div *ngIf="data.solicitud.password" class="credenciales-box">
          <h4>Credenciales de Acceso:</h4>
          <p><strong>Email:</strong> {{data.solicitud.email}}</p>
          <p><strong>Contraseña:</strong> {{data.solicitud.password}}</p>
        </div>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cerrar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .detalle-info p { margin: 12px 0; font-size: 15px; }
    .detalle-info strong { color: #1e293b; }
    .pendiente { color: #d97706; font-weight: 700; }
    .aprobado { color: #16a34a; font-weight: 700; }
    .rechazado { color: #dc2626; font-weight: 700; }
    .credenciales-box {
      background: #f0fdf4;
      padding: 16px;
      border-radius: 12px;
      border: 2px solid #22c55e;
      margin-top: 16px;
    }
    .credenciales-box h4 { color: #166534; margin: 0 0 12px; }
  `]
})
export class DetalleSolicitudDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

@Component({
  selector: 'asignar-cursos-dialog',
  standalone: true,
  imports: [
    MatDialogModule, MatButtonModule, MatIconModule, MatCheckboxModule, 
    MatCardModule, CommonModule, FormsModule
  ] as any,
  template: `
    <h2 mat-dialog-title class="dialog-title">
      <mat-icon>school</mat-icon>
      Asignar Cursos a {{data.solicitud.nombre}}
    </h2>

    <mat-dialog-content>
      <div class="curso-actual-info">
        <mat-icon>info</mat-icon>
        <p>Curso solicitado originalmente: <strong>{{data.solicitud.cursoNombre}}</strong></p>
      </div>

      <h3 class="cursos-title">Selecciona los cursos a asignar:</h3>
      
      <div class="cursos-list">
        <mat-card class="curso-item" *ngFor="let curso of cursos" (click)="toggleCurso(curso.id)">
          <mat-checkbox 
            [checked]="cursosSeleccionados.has(curso.id)"
            (change)="toggleCurso(curso.id, $event)">
          </mat-checkbox>
          <div class="curso-info">
            <h4>{{curso.nombre}}</h4>
            <p>{{curso.descripcion}}</p>
            <div class="curso-meta">
              <span class="categoria-badge">{{curso.categoria}}</span>
              <span class="precio">S/ {{curso.precio}}</span>
            </div>
          </div>
        </mat-card>
      </div>

      <div class="resumen-seleccion" *ngIf="cursosSeleccionados.size > 0">
        <mat-icon>check_circle</mat-icon>
        <span>{{cursosSeleccionados.size}} curso(s) seleccionado(s)</span>
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button color="primary" [disabled]="cursosSeleccionados.size === 0" (click)="guardar()">
        <mat-icon>check_circle</mat-icon>
        Asignar Cursos
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
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

    .curso-actual-info {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      background: #eff6ff;
      border-radius: 12px;
      border: 2px solid #dbeafe;
      margin-bottom: 24px;
    }

    .curso-actual-info mat-icon {
      color: #2563eb;
      font-size: 24px;
    }

    .curso-actual-info p {
      margin: 0;
      color: #1e40af;
      font-size: 14px;
    }

    .cursos-title {
      font-size: 16px;
      font-weight: 800;
      color: #1e293b;
      margin: 0 0 16px;
    }

    .cursos-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      max-height: 400px;
      overflow-y: auto;
    }

    .curso-item {
      display: flex;
      align-items: flex-start;
      gap: 16px;
      padding: 16px;
      cursor: pointer;
      transition: all 0.3s;
      border: 2px solid #e2e8f0;
    }

    .curso-item:hover {
      border-color: #f97316;
      background: #fff7ed;
      transform: translateX(4px);
    }

    .curso-item mat-checkbox {
      margin-top: 8px;
    }

    .curso-info {
      flex: 1;
    }

    .curso-info h4 {
      font-size: 16px;
      font-weight: 800;
      color: #1e293b;
      margin: 0 0 8px;
    }

    .curso-info p {
      font-size: 14px;
      color: #64748b;
      margin: 0 0 12px;
      line-height: 1.5;
    }

    .curso-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .categoria-badge {
      background: #dbeafe;
      color: #1d4ed8;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .precio {
      font-size: 18px;
      font-weight: 900;
      color: #dc2626;
    }

    .resumen-seleccion {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 16px;
      background: #f0fdf4;
      border-radius: 12px;
      border: 2px solid #22c55e;
      margin-top: 20px;
      color: #166534;
      font-weight: 700;
    }

    .resumen-seleccion mat-icon {
      color: #16a34a;
    }

    mat-dialog-actions {
      padding: 16px 24px;
      border-top: 1px solid #e2e8f0;
    }
  `]
})
export class AsignarCursosDialog implements OnInit {
  cursos: Curso[] = [];
  cursosSeleccionados = new Set<number>();

  constructor(
    public dialogRef: MatDialogRef<AsignarCursosDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private academiaService: AcademiaService
  ) {}

  ngOnInit(): void {
    this.cursos = this.academiaService.getCursos();
    // Seleccionar el curso original por defecto
    if (this.data.solicitud.cursoId) {
      this.cursosSeleccionados.add(this.data.solicitud.cursoId);
    }
  }

  toggleCurso(cursoId: number, event?: any): void {
    if (event?.checked !== undefined) {
      if (event.checked) {
        this.cursosSeleccionados.add(cursoId);
      } else {
        this.cursosSeleccionados.delete(cursoId);
      }
    } else {
      // Click en la tarjeta
      if (this.cursosSeleccionados.has(cursoId)) {
        this.cursosSeleccionados.delete(cursoId);
      } else {
        this.cursosSeleccionados.add(cursoId);
      }
    }
  }

  guardar(): void {
    this.dialogRef.close(Array.from(this.cursosSeleccionados));
  }
}

@Component({
  selector: 'aprobar-solicitud-dialog',
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, CommonModule],
  template: `
    <h2 mat-dialog-title>
      <mat-icon>check_circle</mat-icon>
      Aprobar Solicitud
    </h2>
    <mat-dialog-content>
      <div class="curso-info">
        <h3>{{data.solicitud.cursoNombre}}</h3>
        <p>Estudiante: {{data.solicitud.nombre}}</p>
        <p>Email: {{data.solicitud.email}}</p>
      </div>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Generar Contraseña Temporal</mat-label>
        <input matInput [(ngModel)]="password" placeholder="Ej: Estudiante2026">
        <mat-icon matPrefix>lock</mat-icon>
        <mat-hint>El estudiante deberá cambiar esta contraseña al primer ingreso</mat-hint>
      </mat-form-field>

      <div class="password-sugerida" *ngIf="!password">
        <mat-icon>lightbulb</mat-icon>
        <p>Sugerencia: <strong>{{passwordSugerida}}</strong></p>
        <button mat-button color="primary" (click)="usarSugerida()">Usar esta contraseña</button>
      </div>

      <div class="info-final">
        <mat-icon>info</mat-icon>
        <p>Al aprobar, el estudiante podrá acceder con:</p>
        <ul>
          <li><strong>Email:</strong> {{data.solicitud.email}}</li>
          <li><strong>Contraseña:</strong> {{password || '[pendiente]'}}</li>
        </ul>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-flat-button color="primary" [disabled]="!password" (click)="aprobar()">
        <mat-icon>check_circle</mat-icon>
        Aprobar y Enviar Credenciales
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width { width: 100%; }
    
    mat-dialog-title {
      display: flex;
      align-items: center;
      gap: 12px;
      color: #1e293b;
    }
    
    mat-dialog-title mat-icon {
      color: #22c55e;
      font-size: 28px;
    }
    
    .curso-info {
      background: #f0fdf4;
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 20px;
      border: 2px solid #22c55e;
    }
    
    .curso-info h3 {
      font-size: 18px;
      font-weight: 800;
      color: #166534;
      margin: 0 0 12px;
    }
    
    .curso-info p {
      font-size: 14px;
      color: #15803d;
      margin: 6px 0;
    }
    
    .password-sugerida {
      background: #fef3c7;
      padding: 16px;
      border-radius: 12px;
      margin: 16px 0;
      border: 2px solid #f59e0b;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .password-sugerida mat-icon {
      color: #d97706;
    }
    
    .password-sugerida p {
      margin: 0;
      color: #92400e;
    }
    
    .info-final {
      background: #eff6ff;
      padding: 16px;
      border-radius: 12px;
      margin-top: 16px;
      border: 2px solid #3b82f6;
    }
    
    .info-final mat-icon {
      color: #2563eb;
    }
    
    .info-final p {
      margin: 8px 0;
      color: #1e40af;
    }
    
    .info-final ul {
      margin: 8px 0;
      padding-left: 20px;
      color: #1e40af;
    }
  `]
})
export class AprobarSolicitudDialog {
  password: string = '';
  passwordSugerida: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    const dni = data.solicitud.dni;
    const year = new Date().getFullYear();
    this.passwordSugerida = `${dni}${year}`;
  }

  usarSugerida(): void {
    this.password = this.passwordSugerida;
  }

  aprobar(): void {
    // El servicio se encargará de registrar al estudiante
  }
}
