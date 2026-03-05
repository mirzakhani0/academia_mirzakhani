import { Component, OnInit, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBadgeModule } from '@angular/material/badge';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatriculasService } from 'src/app/services/matriculas.service';
import { AcademiaService, Curso } from 'src/app/services/academia.service';
import { CarritoService, CursoCarrito } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-cursos-public',
  standalone: true,
  imports: [
    MatIconModule, MatButtonModule, MatDialogModule,
    MatFormFieldModule, MatInputModule, MatCheckboxModule, 
    FormsModule, CommonModule, MatBadgeModule, MatToolbarModule
  ],
  template: `
    <div class="cursos-public-container">
      <!-- Header con Carrito -->
      <div class="header-carrito" *ngIf="carritoService.getCantidad() > 0">
        <div class="carrito-info">
          <mat-icon>shopping_cart</mat-icon>
          <span>{{carritoService.getCantidad()}} curso(s) en el carrito</span>
          <span class="carrito-total">Total: S/ {{carritoService.getTotal().toFixed(2)}}</span>
          <span class="carrito-descuento" *ngIf="carritoService.getDescuento() > 0">
            🎉 ¡{{carritoService.getDescuentoPorcentaje()}}% de descuento!
          </span>
        </div>
        <div class="carrito-acciones">
          <button mat-stroked-button color="warn" (click)="vaciarCarrito()">
            <mat-icon>delete</mat-icon>
            Vaciar
          </button>
          <button mat-raised-button color="primary" (click)="openCarritoDialog()">
            <mat-icon>whatsapp</mat-icon>
            Solicitar por WhatsApp
          </button>
        </div>
      </div>

      <!-- Hero Section -->
      <div class="hero-section">
        <h1>Nuestros Cursos</h1>
        <p>Explora nuestro catálogo de cursos disponibles</p>
        <div class="promo-banner" *ngIf="carritoService.getCantidad() === 0">
          <mat-icon>local_offer</mat-icon>
          <span>🎉 ¡Llévate 2 cursos con 10% de descuento y 3+ cursos con 15% de descuento!</span>
        </div>
      </div>

      <!-- Loading State -->
      <div class="loading-state" *ngIf="loading">
        <mat-icon class="loading-icon">sync</mat-icon>
        <p>Cargando cursos...</p>
      </div>

      <div class="cursos-grid" *ngIf="!loading">
        <div class="curso-card" *ngFor="let curso of cursos">
          <div class="curso-header" [style.background]="curso.gradiente">
            <mat-icon>{{curso.icono}}</mat-icon>
            <span class="curso-badge">{{curso.tipo}}</span>
            <button class="btn-agregar-carrito" 
                    mat-mini-fab 
                    color="primary"
                    [matBadge]="isInCarrito(curso.id) ? '✓' : null"
                    (click)="toggleCarrito(curso)"
                    title="{{isInCarrito(curso.id) ? 'Quitar del carrito' : 'Agregar al carrito'}}">
              <mat-icon>{{isInCarrito(curso.id) ? 'check' : 'add_shopping_cart'}}</mat-icon>
            </button>
          </div>
          <div class="curso-body">
            <span class="curso-categoria">{{curso.categoria}}</span>
            <h3>{{curso.titulo}}</h3>
            <p>{{curso.descripcion}}</p>
            <div class="curso-footer">
              <div class="precio-section">
                <span class="curso-precio">S/ {{curso.precio}}</span>
              </div>
              <button mat-raised-button color="primary" (click)="openSolicitud(curso)">
                <mat-icon>school</mat-icon>
                <span>Inscripción Rápida</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div class="empty-state" *ngIf="!loading && cursos.length === 0">
        <mat-icon>inventory_2</mat-icon>
        <p>No hay cursos disponibles en este momento</p>
      </div>
    </div>

    <style>
      .cursos-public-container { min-height: 100vh; background: #f8fafc; }

      /* Header Carrito */
      .header-carrito {
        position: sticky;
        top: 0;
        z-index: 100;
        background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        padding: 16px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        border-bottom: 2px solid #22c55e;
      }

      .carrito-info {
        display: flex;
        align-items: center;
        gap: 16px;
        flex-wrap: wrap;
      }

      .carrito-info mat-icon {
        font-size: 28px;
        color: #16a34a;
      }

      .carrito-info > span {
        font-size: 15px;
        font-weight: 600;
        color: #166534;
      }

      .carrito-total {
        font-size: 18px;
        font-weight: 900;
        color: #15803d;
      }

      .carrito-descuento {
        background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
        color: white;
        padding: 6px 16px;
        border-radius: 20px;
        font-weight: 800;
        font-size: 13px;
        animation: pulse 2s infinite;
      }

      @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }

      .carrito-acciones {
        display: flex;
        gap: 12px;
      }

      /* Promo Banner */
      .promo-banner {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        padding: 12px 24px;
        border-radius: 50px;
        margin-top: 24px;
        border: 2px solid rgba(255, 255, 255, 0.3);
      }

      .promo-banner mat-icon {
        font-size: 24px;
        color: #fbbf24;
      }

      .promo-banner span {
        font-size: 15px;
        font-weight: 700;
        color: white;
      }

      /* Hero Section */
      .hero-section { 
        background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); 
        padding: 60px 20px; 
        text-align: center; 
        color: white; 
      }

      .hero-section h1 { 
        font-size: 42px; 
        font-weight: 900; 
        margin: 0 0 12px; 
      }

      .hero-section p { 
        font-size: 18px; 
        opacity: 0.9; 
        margin: 0; 
      }

      /* Loading & Empty States */
      .loading-state, .empty-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 80px 20px;
        text-align: center;
      }

      .loading-icon {
        font-size: 48px;
        color: #f97316;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      .loading-state p, .empty-state p {
        color: #64748b;
        margin: 16px 0 0;
        font-size: 16px;
      }

      .empty-state mat-icon {
        font-size: 64px;
        color: #cbd5e1;
        margin-bottom: 16px;
      }

      /* Cursos Grid */
      .cursos-grid { 
        display: grid; 
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); 
        gap: 24px; 
        max-width: 1200px; 
        margin: -40px auto 40px; 
        padding: 0 20px; 
      }

      .curso-card { 
        background: white; 
        border-radius: 20px; 
        overflow: hidden; 
        box-shadow: 0 10px 40px rgba(0,0,0,0.08); 
        transition: transform 0.3s, box-shadow 0.3s; 
      }

      .curso-card:hover { 
        transform: translateY(-8px); 
        box-shadow: 0 20px 60px rgba(0,0,0,0.12); 
      }

      .curso-header { 
        height: 160px; 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        position: relative; 
      }

      .curso-header mat-icon { 
        font-size: 70px; 
        width: 70px; 
        height: 70px; 
        color: white; 
        opacity: 0.9; 
      }

      .curso-badge { 
        position: absolute; 
        top: 12px; 
        right: 12px; 
        background: rgba(0,0,0,0.7); 
        color: white; 
        padding: 5px 12px; 
        border-radius: 50px; 
        font-size: 10px; 
        font-weight: 700; 
      }

      /* Botón Agregar al Carrito */
      .btn-agregar-carrito {
        position: absolute;
        top: 12px;
        left: 12px;
        background: white !important;
        color: #f97316 !important;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        transition: all 0.3s;
      }

      .btn-agregar-carrito:hover {
        transform: scale(1.1);
      }

      .curso-body { 
        padding: 24px; 
      }

      .curso-categoria { 
        background: #eff6ff; 
        color: #3b82f6; 
        padding: 5px 12px; 
        border-radius: 50px; 
        font-size: 11px; 
        font-weight: 700; 
        text-transform: uppercase; 
      }

      .curso-body h3 { 
        font-size: 20px; 
        font-weight: 800; 
        color: #1e293b; 
        margin: 0 0 12px; 
      }

      .curso-body p { 
        color: #64748b; 
        font-size: 14px; 
        line-height: 1.6; 
        margin: 0 0 20px; 
      }

      .curso-footer { 
        display: flex; 
        justify-content: space-between; 
        align-items: center; 
        padding-top: 20px; 
        border-top: 2px solid #f1f5f9; 
      }

      .curso-precio { 
        font-size: 28px; 
        font-weight: 900; 
        color: #dc2626; 
      }

      button { 
        font-weight: 700; 
      }

      /* Responsive */
      @media (max-width: 768px) {
        .header-carrito {
          flex-direction: column;
          gap: 16px;
          padding: 16px;
        }

        .carrito-info {
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .carrito-acciones {
          width: 100%;
          justify-content: center;
        }

        .hero-section h1 {
          font-size: 32px;
        }

        .cursos-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  `
})
export class CursosPublicComponent implements OnInit {
  cursos: any[] = [];
  loading = true;

  constructor(
    private dialog: MatDialog,
    private matriculasService: MatriculasService,
    private academiaService: AcademiaService,
    public carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos(): void {
    const cursosData = this.academiaService.getCursos();
    
    this.cursos = cursosData.map(curso => ({
      id: curso.id,
      titulo: curso.nombre,
      descripcion: curso.descripcion,
      precio: curso.precio,
      categoria: curso.categoria,
      gradiente: this.getGradientePorCategoria(curso.categoria),
      icono: this.getIconoPorCategoria(curso.categoria),
      tipo: 'CLASE GRABADA'
    }));

    this.loading = false;
  }

  getIconoPorCategoria(categoria: string): string {
    const iconos: { [key: string]: string } = {
      'Matemáticas': 'functions',
      'Física': 'rocket_launch',
      'Química': 'biotech',
      'Biología': 'science',
      'Letras': 'menu_book'
    };
    return iconos[categoria] || 'school';
  }

  getGradientePorCategoria(categoria: string): string {
    const gradientes: { [key: string]: string } = {
      'Matemáticas': 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
      'Física': 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      'Química': 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      'Biología': 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)',
      'Letras': 'linear-gradient(135deg, #a855f7 0%, #9333ea 100%)'
    };
    return gradientes[categoria] || 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)';
  }

  isInCarrito(cursoId: number): boolean {
    return this.carritoService.getCursos().find(c => c.id === cursoId) !== undefined;
  }

  toggleCarrito(curso: any): void {
    const cursoCarrito: CursoCarrito = {
      id: curso.id,
      nombre: curso.titulo,
      precio: curso.precio,
      categoria: curso.categoria,
      gradiente: curso.gradiente,
      icono: curso.icono
    };

    if (this.isInCarrito(curso.id)) {
      this.carritoService.removerCurso(curso.id);
    } else {
      this.carritoService.agregarCurso(cursoCarrito);
    }
  }

  vaciarCarrito(): void {
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
      this.carritoService.vaciarCarrito();
    }
  }

  openCarritoDialog(): void {
    const dialogRef = this.dialog.open(CarritoDialog, {
      width: '600px',
      data: {
        total: this.carritoService.getTotal(),
        mensaje: this.carritoService.getMensajeWhatsApp()
      }
    });
  }

  openSolicitud(curso: any): void {
    const dialogRef = this.dialog.open(SolicitudInscripcionDialog, {
      width: '600px',
      data: { curso }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        result.cursoNombre = curso.titulo;
        result.precio = curso.precio;
        this.matriculasService.addSolicitud(result);
        alert('✅ Solicitud enviada con éxito. El administrador revisará tu pago.');
      }
    });
  }
}

// Diálogo del Carrito
@Component({
  selector: 'carrito-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule, CommonModule],
  template: `
    <h2 mat-dialog-title>
      <mat-icon>shopping_cart</mat-icon>
      Tu Carrito
    </h2>
    <mat-dialog-content>
      <p>Se abrirá WhatsApp con tu pedido listo para enviar.</p>
      <div class="whatsapp-info">
        <mat-icon>chat</mat-icon>
        <span>Serás redirigido a WhatsApp para enviar tu solicitud</span>
      </div>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancelar</button>
      <a [href]="'https://wa.me/51965890475?text=' + data.mensaje" 
         target="_blank"
         mat-raised-button 
         color="success">
        <mat-icon>whatsapp</mat-icon>
        Abrir WhatsApp (+51 965 890 475)
      </a>
    </mat-dialog-actions>
  `,
  styles: [`
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

    .whatsapp-info {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      background: #f0fdf4;
      border-radius: 12px;
      border: 2px solid #22c55e;
      margin-top: 16px;
    }

    .whatsapp-info mat-icon {
      color: #16a34a;
      font-size: 32px;
    }

    .whatsapp-info span {
      color: #166534;
      font-size: 14px;
    }

    a[mat-raised-button] {
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
  `]
})
export class CarritoDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

// Diálogo de Solicitud (existente)
@Component({
  selector: 'solicitud-inscripcion-dialog',
  standalone: true,
  imports: [
    MatDialogModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, 
    FormsModule, MatButtonModule, MatIconModule
  ],
  template: `
    <h2 mat-dialog-title class="dialog-title">
      <mat-icon>assignment</mat-icon>
      Solicitud de Inscripción
    </h2>
    <mat-dialog-content>
      <div class="curso-info">
        <h3>{{data.curso.titulo}}</h3>
        <p class="curso-precio">Precio: S/ {{data.curso.precio}}</p>
      </div>
      <div class="pago-info">
        <h4>📱 Realiza tu pago por Yape o BCP</h4>
        <div class="pago-detalles">
          <p><strong>Yape:</strong> 926 454 594</p>
          <p><strong>BCP:</strong> 191-XXXXXXXX-0-XX</p>
          <p><strong>Titular:</strong> JOSE LLAN*</p>
        </div>
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
          Acepto los términos y condiciones
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
