import { Component, Inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatriculasService } from 'src/app/services/matriculas.service';

@Component({
  selector: 'app-cursos-public',
  standalone: true,
  imports: [
    RouterLink, MatIconModule, MatButtonModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatCheckboxModule, FormsModule, CommonModule
  ],
  template: `
    <div class="cursos-public-container">
      <!-- Hero Section -->
      <div class="hero-section">
        <h1>Nuestros Cursos</h1>
        <p>Explora nuestro catálogo de cursos disponibles</p>
      </div>
      
      <div class="cursos-grid">
        <div class="curso-card" *ngFor="let curso of cursos">
          <div class="curso-header" [style.background]="curso.gradiente">
            <mat-icon>{{curso.icono}}</mat-icon>
            <span class="curso-badge">{{curso.tipo}}</span>
          </div>
          <div class="curso-body">
            <span class="curso-categoria">{{curso.categoria}}</span>
            <h3>{{curso.titulo}}</h3>
            <p>{{curso.descripcion}}</p>
            <div class="curso-footer">
              <span class="curso-precio">\${{curso.precio}}</span>
              <button mat-raised-button color="primary" (click)="openSolicitud(curso)">
                <mat-icon>school</mat-icon>
                <span>Solicitar Inscripción</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style>
      .cursos-public-container { min-height: 100vh; background: #f8fafc; }
      .hero-section { background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); padding: 60px 20px; text-align: center; color: white; }
      .hero-section h1 { font-size: 42px; font-weight: 900; margin: 0 0 12px; }
      .hero-section p { font-size: 18px; opacity: 0.9; margin: 0; }
      .cursos-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; max-width: 1200px; margin: -40px auto 40px; padding: 0 20px; }
      .curso-card { background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.08); transition: transform 0.3s; }
      .curso-card:hover { transform: translateY(-8px); }
      .curso-header { height: 160px; display: flex; align-items: center; justify-content: center; position: relative; }
      .curso-header mat-icon { font-size: 70px; width: 70px; height: 70px; color: white; opacity: 0.9; }
      .curso-badge { position: absolute; top: 12px; right: 12px; background: rgba(0,0,0,0.7); color: white; padding: 5px 12px; border-radius: 50px; font-size: 10px; font-weight: 700; }
      .curso-body { padding: 24px; }
      .curso-categoria { background: #eff6ff; color: #3b82f6; padding: 5px 12px; border-radius: 50px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
      .curso-body h3 { font-size: 20px; font-weight: 800; color: #1e293b; margin: 0 0 12px; }
      .curso-body p { color: #64748b; font-size: 14px; line-height: 1.6; margin: 0 0 20px; }
      .curso-footer { display: flex; justify-content: space-between; align-items: center; padding-top: 20px; border-top: 2px solid #f1f5f9; }
      .curso-precio { font-size: 28px; font-weight: 900; color: #dc2626; }
      button { font-weight: 700; }
    </style>
  `
})
export class CursosPublicComponent {
  cursos = [
    { id: 1, titulo: 'Álgebra Lineal: Dominio Total', descripcion: 'De matrices a espacios vectoriales. Incluye 20 horas de video.', precio: 45, gradiente: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)', icono: 'functions', tipo: 'CLASE GRABADA', categoria: 'Matemáticas' },
    { id: 2, titulo: 'Pack: Cálculo Diferencial', descripcion: 'La guía definitiva en PDF con 200 ejercicios resueltos.', precio: 25, gradiente: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)', icono: 'description', tipo: 'MATERIAL PDF', categoria: 'Matemáticas' },
    { id: 3, titulo: 'Física I: Mecánica y Estática', descripcion: 'Domina los diagramas de cuerpo libre y las leyes de Newton.', precio: 39, gradiente: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', icono: 'rocket_launch', tipo: 'CLASE GRABADA', categoria: 'Física' },
  ];

  constructor(private dialog: MatDialog, private matriculasService: MatriculasService) {}

  openSolicitud(curso: any): void {
    const dialogRef = this.dialog.open(SolicitudInscripcionDialog, {
      width: '600px',
      data: { curso }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Agregar curso nombre a la solicitud
        result.cursoNombre = curso.titulo;
        result.precio = curso.precio;

        // Guardar en el servicio
        this.matriculasService.addSolicitud(result);

        console.log('Solicitud enviada:', result);
        alert('✅ Solicitud enviada con éxito. El administrador revisará tu pago y te enviará tus credenciales de acceso a tu correo.');
      }
    });
  }
}

@Component({
  selector: 'solicitud-inscripcion-dialog',
  standalone: true,
  imports: [
    MatDialogModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, FormsModule, MatButtonModule, MatIconModule
  ],
  template: `
    <h2 mat-dialog-title class="dialog-title">
      <mat-icon>assignment</mat-icon>
      Solicitud de Inscripción
    </h2>
    
    <mat-dialog-content>
      <div class="curso-info">
        <h3>{{data.curso.titulo}}</h3>
        <p class="curso-precio">Precio: \${{data.curso.precio}}</p>
      </div>

      <div class="pago-info">
        <h4>📱 Realiza tu pago por Yape o BCP</h4>
        <div class="pago-detalles">
          <p><strong>Yape:</strong> 926 454 594</p>
          <p><strong>BCP:</strong> 191-XXXXXXXX-0-XX</p>
          <p><strong>Titular:</strong> JOSE LLAN*</p>
        </div>
        <p class="pago-hint">Una vez realizado el pago, completa tus datos para enviar la solicitud.</p>
      </div>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Nombre Completo</mat-label>
        <input matInput [(ngModel)]="solicitudData.nombre" placeholder="Ej: Juan Pérez García">
        <mat-icon matPrefix>person</mat-icon>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Correo Electrónico</mat-label>
        <input matInput [(ngModel)]="solicitudData.email" type="email" placeholder="tu@correo.com">
        <mat-icon matPrefix>email</mat-icon>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>DNI</mat-label>
        <input matInput [(ngModel)]="solicitudData.dni" placeholder="8 dígitos" maxlength="8">
        <mat-icon matPrefix>badge</mat-icon>
      </mat-form-field>

      <mat-form-field appearance="outline" class="full-width">
        <mat-label>Teléfono / WhatsApp</mat-label>
        <input matInput [(ngModel)]="solicitudData.telefono" placeholder="+51 999 999 999">
        <mat-icon matPrefix>phone</mat-icon>
      </mat-form-field>

      <div class="captcha-simulado">
        <mat-checkbox [(ngModel)]="solicitudData.terminos">
          Acepto los términos y condiciones, y autorizo el procesamiento de mis datos
        </mat-checkbox>
      </div>
    </mat-dialog-content>
    
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <button mat-raised-button color="primary" [disabled]="!isValidForm()" (click)="enviarSolicitud()">
        <mat-icon>send</mat-icon>
        Enviar Solicitud
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    .full-width { width: 100%; margin-bottom: 16px; }
    
    .dialog-title {
      display: flex;
      align-items: center;
      gap: 12px;
      color: #1e293b;
    }
    
    .dialog-title mat-icon {
      color: #f97316;
      font-size: 28px;
    }
    
    .curso-info {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 20px;
      border: 2px solid #f59e0b;
    }
    
    .curso-info h3 {
      font-size: 18px;
      font-weight: 800;
      color: #92400e;
      margin: 0 0 8px;
    }
    
    .curso-precio {
      font-size: 24px;
      font-weight: 900;
      color: #dc2626;
      margin: 0;
    }
    
    .pago-info {
      background: #f0fdf4;
      padding: 20px;
      border-radius: 12px;
      margin-bottom: 20px;
      border: 2px solid #22c55e;
    }
    
    .pago-info h4 {
      font-size: 16px;
      font-weight: 800;
      color: #166534;
      margin: 0 0 12px;
    }
    
    .pago-detalles p {
      font-size: 14px;
      color: #15803d;
      margin: 8px 0;
    }
    
    .pago-hint {
      font-size: 13px;
      color: #64748b;
      margin: 12px 0 0;
      font-style: italic;
    }
    
    mat-form-field mat-icon {
      color: #f97316;
    }
    
    .captcha-simulado {
      margin-top: 16px;
      padding: 16px;
      background: #f8fafc;
      border-radius: 8px;
    }
  `]
})
export class SolicitudInscripcionDialog {
  solicitudData: any = {
    nombre: '',
    email: '',
    dni: '',
    telefono: '',
    terminos: false,
    cursoId: null,
    fecha: new Date().toISOString()
  };

  constructor(
    public dialogRef: MatDialogRef<SolicitudInscripcionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.solicitudData.cursoId = data.curso.id;
  }

  isValidForm(): boolean {
    return this.solicitudData.nombre && 
           this.solicitudData.email && 
           this.solicitudData.dni && 
           this.solicitudData.dni.length === 8 &&
           this.solicitudData.telefono &&
           this.solicitudData.terminos;
  }

  enviarSolicitud(): void {
    this.dialogRef.close(this.solicitudData);
  }
}
