import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AcademiaService } from 'src/app/services/academia.service';

@Component({
  selector: 'app-curso-detalle',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatExpansionModule, CommonModule],
  template: `
    <div class="curso-detalle-container">
      <div class="curso-header">
        <button mat-button (click)="volver()" class="btn-volver">
          <mat-icon>arrow_back</mat-icon> Volver
        </button>
        <h1>{{cursoNombre}}</h1>
        <p>{{cursoDescripcion}}</p>
      </div>

      <div class="temas-container">
        <h2 class="section-title">Contenido del Curso</h2>
        
        <mat-accordion>
          <mat-expansion-panel *ngFor="let tema of temas; let i = index" [expanded]="i === 0">
            <mat-expansion-panel-header>
              <mat-panel-title>
                <mat-icon>folder</mat-icon>
                {{tema.nombre}}
              </mat-panel-title>
              <mat-panel-description>
                {{getContenidosByTema(tema.nombre).length}} contenidos
              </mat-panel-description>
            </mat-expansion-panel-header>

            <div class="contenidos-list">
              <div class="contenido-item" *ngFor="let contenido of getContenidosByTema(tema.nombre)">
                <div class="contenido-icon" [class.pdf]="contenido.tipo === 'pdf'" [class.video]="contenido.tipo === 'video'">
                  <mat-icon>{{contenido.tipo === 'pdf' ? 'description' : 'play_circle'}}</mat-icon>
                </div>
                <div class="contenido-info">
                  <h4>{{contenido.nombre}}</h4>
                  <span class="contenido-tipo">{{contenido.tipo === 'pdf' ? 'PDF' : 'Video'}}</span>
                </div>
                <button mat-raised-button color="primary" (click)="verContenido(contenido)">
                  <mat-icon>visibility</mat-icon>
                  <span>Ver</span>
                </button>
              </div>
            </div>
          </mat-expansion-panel>
        </mat-accordion>
      </div>
    </div>

    <!-- Modal para Video -->
    <div class="video-modal-overlay" *ngIf="videoUrl" (click)="cerrarVideo()">
      <div class="video-modal" (click)="$event.stopPropagation()">
        <button class="btn-cerrar" (click)="cerrarVideo()">
          <mat-icon>close</mat-icon>
        </button>
        <div class="video-container">
          <iframe [src]="videoUrl" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
    </div>

    <!-- Modal para PDF -->
    <div class="pdf-modal-overlay" *ngIf="pdfUrl" (click)="cerrarPDF()">
      <div class="pdf-modal" (click)="$event.stopPropagation()">
        <div class="pdf-header">
          <h3>{{pdfNombre}}</h3>
          <div class="pdf-actions">
            <button mat-stroked-button color="accent" (click)="descargarPDFActual()" class="btn-descargar">
              <mat-icon>download</mat-icon>
              <span>Descargar PDF</span>
            </button>
            <button class="btn-cerrar" (click)="cerrarPDF()">
              <mat-icon>close</mat-icon>
            </button>
          </div>
        </div>
        <div class="pdf-container">
          <iframe [src]="pdfUrl" frameborder="0"></iframe>
        </div>
      </div>
    </div>

    <style>
      .curso-detalle-container { padding: 20px; max-width: 1000px; margin: 0 auto; }
      
      .curso-header {
        margin-bottom: 32px;
        padding-bottom: 24px;
        border-bottom: 2px solid #e2e8f0;
      }
      
      .btn-volver {
        margin-bottom: 16px;
        color: #64748b;
      }
      
      .curso-header h1 {
        font-size: 32px;
        font-weight: 900;
        color: #1e293b;
        margin: 0 0 12px;
      }
      
      .curso-header p {
        color: #64748b;
        font-size: 16px;
        margin: 0;
      }
      
      .section-title {
        font-size: 24px;
        font-weight: 800;
        color: #1e293b;
        margin: 0 0 24px;
      }
      
      .temas-container {
        background: white;
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.08);
      }
      
      mat-expansion-panel {
        margin-bottom: 12px;
        border-radius: 12px !important;
      }
      
      mat-panel-title {
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 700 !important;
        font-size: 16px !important;
      }
      
      mat-panel-title mat-icon {
        color: #f97316;
      }
      
      .contenidos-list {
        padding: 16px 0;
      }
      
      .contenido-item {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px;
        background: #f8fafc;
        border-radius: 12px;
        margin-bottom: 12px;
        transition: background 0.3s;
      }
      
      .contenido-item:hover {
        background: #f1f5f9;
      }
      
      .contenido-item:last-child {
        margin-bottom: 0;
      }
      
      .contenido-icon {
        width: 48px;
        height: 48px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      
      .contenido-icon.pdf {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        box-shadow: 0 6px 16px rgba(220, 38, 38, 0.3);
      }
      
      .contenido-icon.video {
        background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
        box-shadow: 0 6px 16px rgba(249, 115, 22, 0.3);
      }
      
      .contenido-icon mat-icon {
        font-size: 24px;
        width: 24px;
        height: 24px;
        color: white;
      }
      
      .contenido-info {
        flex: 1;
      }
      
      .contenido-info h4 {
        font-size: 15px;
        font-weight: 700;
        color: #1e293b;
        margin: 0 0 4px;
      }
      
      .contenido-tipo {
        font-size: 12px;
        color: #64748b;
        font-weight: 600;
        text-transform: uppercase;
      }
      
      /* Video Modal */
      .video-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
      }
      
      .video-modal {
        position: relative;
        width: 90%;
        max-width: 1000px;
        background: #000;
        border-radius: 16px;
        overflow: hidden;
      }
      
      .btn-cerrar {
        position: absolute;
        top: 16px;
        right: 16px;
        width: 44px;
        height: 44px;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        border: none;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        z-index: 1;
      }
      
      .btn-cerrar mat-icon {
        color: white;
        font-size: 24px;
      }
      
      .video-container {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
      }
      
      .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }

      /* PDF Modal */
      .pdf-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        padding: 20px;
      }

      .pdf-modal {
        position: relative;
        width: 95%;
        max-width: 1200px;
        height: 90vh;
        background: white;
        border-radius: 16px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }

      .pdf-header {
        background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
        color: white;
        padding: 20px 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;
      }

      .pdf-header h3 {
        font-size: 18px;
        font-weight: 800;
        margin: 0;
        flex: 1;
      }

      .pdf-actions {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .btn-descargar {
        font-weight: 700;
      }

      .pdf-header .btn-cerrar {
        background: rgba(255, 255, 255, 0.2);
        color: white;
      }

      .pdf-container {
        flex: 1;
        overflow: hidden;
      }

      .pdf-container iframe {
        width: 100%;
        height: 100%;
        border: none;
      }
    </style>
  `
})
export class CursoDetalleComponent {
  cursoNombre = 'Álgebra Lineal: Dominio Total';
  cursoDescripcion = 'De matrices a espacios vectoriales. Incluye 20 horas de video y resolución de exámenes pasados.';
  temas: any[] = [];
  contenidos: any[] = [];
  videoUrl: string | null = null;
  pdfUrl: string | null = null;
  pdfNombre: string = '';

  constructor(
    private route: ActivatedRoute,
    private academiaService: AcademiaService
  ) {
    const cursoId = parseInt(this.route.snapshot.paramMap.get('id') || '1');

    // Obtenemos los contenidos del curso y extraemos los temas únicos
    const contenidosDelCurso = this.academiaService.getContenidosByCurso(cursoId);

    // Extraer temas únicos de los contenidos
    const temasUnicos = [...new Set(contenidosDelCurso.map(c => c.tema))];

    // Crear estructura de temas
    this.temas = temasUnicos.map((tema, index) => ({
      id: index + 1,
      nombre: tema,
      orden: index + 1
    }));

    this.contenidos = contenidosDelCurso;
  }

  getContenidosByTema(tema: string): any[] {
    return this.contenidos.filter(c => c.tema === tema);
  }

  verContenido(contenido: any): void {
    if (contenido.tipo === 'video' && contenido.url) {
      this.videoUrl = this.getYoutubeEmbedUrl(contenido.url);
    } else if (contenido.tipo === 'pdf') {
      this.pdfUrl = contenido.url;
      this.pdfNombre = contenido.nombre;
    }
  }

  getYoutubeEmbedUrl(url: string): string {
    // Convertir URL normal de YouTube a embed
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop();
    return `https://www.youtube.com/embed/${videoId}`;
  }

  descargarPDF(contenido: any): void {
    if (contenido.tipo === 'pdf') {
      // Simular descarga
      window.open(contenido.url, '_blank');
    }
  }

  descargarPDFActual(): void {
    if (this.pdfUrl) {
      window.open(this.pdfUrl, '_blank');
    }
  }

  cerrarVideo(): void {
    this.videoUrl = null;
  }

  cerrarPDF(): void {
    this.pdfUrl = null;
    this.pdfNombre = '';
  }

  volver(): void {
    window.history.back();
  }
}
