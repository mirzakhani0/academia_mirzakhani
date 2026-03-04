import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  template: `
    <div class="biblioteca-container">
      <!-- Header -->
      <div class="biblioteca-header">
        <div class="header-content">
          <span class="header-badge">📚 Tu Espacio de Aprendizaje</span>
          <h1 class="header-title">Mi <span class="text-gradient">Biblioteca</span></h1>
          <p class="header-subtitle">Accede a todo tu contenido adquirido y continúa donde lo dejaste</p>
        </div>
      </div>

      <div class="biblioteca-content">
        <div class="main-section">
          <!-- Reproductor de Video -->
          <div class="video-card">
            <div class="video-header">
              <div class="video-info">
                <mat-icon class="video-icon">play_circle</mat-icon>
                <div>
                  <h3 class="video-title">Clase 1: Introducción Avanzada</h3>
                  <p class="video-subtitle">Introducción a los conceptos fundamentales</p>
                </div>
              </div>
              <div class="video-actions">
                <button class="btn-icon" matTooltip="Añadir a favoritos">
                  <mat-icon>favorite_border</mat-icon>
                </button>
                <button class="btn-icon" matTooltip="Compartir">
                  <mat-icon>share</mat-icon>
                </button>
                <button class="btn-icon" matTooltip="Descargar">
                  <mat-icon>download</mat-icon>
                </button>
              </div>
            </div>

            <div class="video-player">
              <div class="video-placeholder">
                <div class="play-button">
                  <mat-icon>play_arrow</mat-icon>
                </div>
                <p class="placeholder-text">Haz clic para reproducir la clase</p>
                <span class="placeholder-subtext">Duración: 45 minutos</span>
              </div>
              <div class="video-progress">
                <div class="progress-bar">
                  <div class="progress-fill" style="width: 35%"></div>
                </div>
                <div class="progress-info">
                  <span>15:45</span>
                  <span>45:00</span>
                </div>
              </div>
            </div>

            <div class="video-description">
              <p>En esta lección cubrimos los conceptos base para dominar la materia. Aprende las técnicas fundamentales y prepárate para los ejercicios prácticos.</p>
            </div>
          </div>

          <!-- Pestañas de Contenido -->
          <div class="content-tabs">
            <div class="tabs-header">
              <button class="tab active">
                <mat-icon>description</mat-icon>
                Descripción
              </button>
              <button class="tab">
                <mat-icon>article</mat-icon>
                Recursos
              </button>
              <button class="tab">
                <mat-icon>chat_bubble</mat-icon>
                Comentarios
              </button>
            </div>
          </div>
        </div>

        <!-- Sidebar - Documentos -->
        <div class="sidebar-section">
          <div class="sidebar-card">
            <div class="sidebar-header">
              <mat-icon class="sidebar-icon">folder</mat-icon>
              <h3 class="sidebar-title">Documentación Adjunta</h3>
            </div>

            <div class="documents-list">
              <div class="document-item">
                <div class="document-icon pdf">
                  <mat-icon>picture_as_pdf</mat-icon>
                </div>
                <div class="document-info">
                  <h4 class="document-name">Guía de Ejercicios.pdf</h4>
                  <span class="document-size">4.2 MB • PDF</span>
                </div>
                <button class="btn-download" (click)="descargar()">
                  <mat-icon>download</mat-icon>
                </button>
              </div>

              <div class="document-item">
                <div class="document-icon pdf">
                  <mat-icon>picture_as_pdf</mat-icon>
                </div>
                <div class="document-info">
                  <h4 class="document-name">Apuntes Teóricos.pdf</h4>
                  <span class="document-size">1.8 MB • PDF</span>
                </div>
                <button class="btn-download" (click)="descargar()">
                  <mat-icon>download</mat-icon>
                </button>
              </div>

              <div class="document-item">
                <div class="document-icon doc">
                  <mat-icon>description</mat-icon>
                </div>
                <div class="document-info">
                  <h4 class="document-name">Ejercicios Resueltos.docx</h4>
                  <span class="document-size">2.1 MB • Word</span>
                </div>
                <button class="btn-download" (click)="descargar()">
                  <mat-icon>download</mat-icon>
                </button>
              </div>

              <div class="document-item">
                <div class="document-icon xls">
                  <mat-icon>table_chart</mat-icon>
                </div>
                <div class="document-info">
                  <h4 class="document-name">Fórmulas y Tablas.xlsx</h4>
                  <span class="document-size">856 KB • Excel</span>
                </div>
                <button class="btn-download" (click)="descargar()">
                  <mat-icon>download</mat-icon>
                </button>
              </div>
            </div>

            <div class="sidebar-footer">
              <div class="storage-info">
                <div class="storage-header">
                  <mat-icon>cloud</mat-icon>
                  <span>Almacenamiento en la nube</span>
                </div>
                <div class="storage-bar">
                  <div class="storage-fill" style="width: 45%"></div>
                </div>
                <span class="storage-text">4.5 GB de 10 GB usados</span>
              </div>
            </div>
          </div>

          <!-- Próximas Clases -->
          <div class="sidebar-card upcoming-card">
            <div class="sidebar-header">
              <mat-icon class="sidebar-icon">event</mat-icon>
              <h3 class="sidebar-title">Próximas Clases</h3>
            </div>

            <div class="upcoming-list">
              <div class="upcoming-item">
                <div class="upcoming-date">
                  <span class="day">15</span>
                  <span class="month">MAR</span>
                </div>
                <div class="upcoming-info">
                  <h4>Clase 2: Desarrollo Intermedio</h4>
                  <span class="time">🕐 18:00 - 19:30</span>
                </div>
              </div>

              <div class="upcoming-item">
                <div class="upcoming-date">
                  <span class="day">22</span>
                  <span class="month">MAR</span>
                </div>
                <div class="upcoming-info">
                  <h4>Clase 3: Práctica Avanzada</h4>
                  <span class="time">🕐 18:00 - 19:30</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <style>
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');

      :host {
        --primary-gradient: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
        --card-shadow: 0 10px 40px rgba(220, 38, 38, 0.12);
        --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }

      .biblioteca-container {
        min-height: 100vh;
        background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
        font-family: 'Plus Jakarta Sans', sans-serif;
        padding: 0;
        overflow-x: hidden;
      }

      .biblioteca-header {
        background: var(--primary-gradient);
        padding: 50px 20px 80px;
        text-align: center;
        position: relative;
        overflow: hidden;
      }

      .biblioteca-header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        opacity: 0.3;
      }

      .header-content {
        position: relative;
        z-index: 1;
        max-width: 700px;
        margin: 0 auto;
      }

      .header-badge {
        display: inline-block;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        padding: 8px 20px;
        border-radius: 50px;
        color: white;
        font-weight: 600;
        font-size: 14px;
        margin-bottom: 16px;
        border: 1px solid rgba(255, 255, 255, 0.3);
      }

      .header-title {
        font-size: 42px;
        font-weight: 900;
        color: white;
        margin: 0 0 12px 0;
        letter-spacing: -1px;
      }

      .text-gradient {
        background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .header-subtitle {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.9);
        margin: 0;
        font-weight: 400;
      }

      .biblioteca-content {
        display: grid;
        grid-template-columns: 1fr 380px;
        gap: 24px;
        max-width: 1400px;
        margin: -60px auto 40px;
        padding: 0 20px;
        position: relative;
        z-index: 2;
      }

      .main-section {
        display: flex;
        flex-direction: column;
        gap: 20px;
        min-width: 0;
      }

      .sidebar-section {
        display: flex;
        flex-direction: column;
        gap: 24px;
        min-width: 0;
      }

      /* Espacio adicional después del header para evitar espacio blanco */
      .biblioteca-header::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 0;
        right: 0;
        height: 1px;
        background: transparent;
      }

      .video-card {
        background: white;
        border-radius: 24px;
        overflow: hidden;
        box-shadow: var(--card-shadow);
        border: 1px solid #f1f5f9;
      }

      .video-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        padding: 24px 28px;
        border-bottom: 1px solid #f1f5f9;
      }

      .video-info {
        display: flex;
        gap: 16px;
        align-items: center;
      }

      .video-icon {
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 28px;
        box-shadow: 0 8px 20px rgba(220, 38, 38, 0.3);
      }

      .video-title {
        font-size: 20px;
        font-weight: 800;
        color: #1e293b;
        margin: 0 0 4px 0;
      }

      .video-subtitle {
        font-size: 14px;
        color: #64748b;
        margin: 0;
      }

      .video-actions {
        display: flex;
        gap: 8px;
      }

      .btn-icon {
        width: 40px;
        height: 40px;
        background: #f1f5f9;
        border: none;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: var(--transition-smooth);
      }

      .btn-icon:hover {
        background: #e2e8f0;
        transform: scale(1.05);
      }

      .btn-icon mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
        color: #64748b;
      }

      .video-player {
        padding: 0;
      }

      .video-placeholder {
        height: 450px;
        background: linear-gradient(135deg, #1a1c23 0%, #2d3748 100%);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        cursor: pointer;
        transition: var(--transition-smooth);
      }

      .video-placeholder:hover {
        opacity: 0.95;
      }

      .play-button {
        width: 90px;
        height: 90px;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(10px);
        border: 3px solid rgba(255, 255, 255, 0.4);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        transition: var(--transition-smooth);
        flex-shrink: 0;
      }

      .video-placeholder:hover .play-button {
        transform: scale(1.1);
        background: rgba(255, 255, 255, 0.3);
      }

      .play-button mat-icon {
        font-size: 42px;
        width: 42px;
        height: 42px;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .placeholder-text {
        color: white;
        font-size: 18px;
        font-weight: 600;
        margin: 0 0 8px 0;
      }

      .placeholder-subtext {
        color: rgba(255, 255, 255, 0.7);
        font-size: 14px;
      }

      .video-progress {
        padding: 20px 28px;
        background: #f8fafc;
        border-top: 1px solid #e2e8f0;
      }

      .progress-bar {
        height: 6px;
        background: #e2e8f0;
        border-radius: 10px;
        overflow: hidden;
        margin-bottom: 12px;
      }

      .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #f97316 0%, #dc2626 100%);
        border-radius: 10px;
        transition: width 0.3s ease;
      }

      .progress-info {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
        color: #64748b;
        font-weight: 600;
      }

      .video-description {
        padding: 24px 28px;
      }

      .video-description p {
        margin: 0;
        font-size: 15px;
        color: #475569;
        line-height: 1.7;
      }

      .content-tabs {
        background: white;
        border-radius: 24px;
        overflow: hidden;
        box-shadow: var(--card-shadow);
        border: 1px solid #f1f5f9;
      }

      .tabs-header {
        display: flex;
        border-bottom: 1px solid #e2e8f0;
      }

      .tab {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        padding: 16px 12px;
        background: white;
        border: none;
        border-bottom: 3px solid transparent;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 13px;
        font-weight: 600;
        color: #64748b;
        cursor: pointer;
        transition: var(--transition-smooth);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        min-width: 0;
      }

      .tab mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
        flex-shrink: 0;
      }

      .tab:hover {
        background: #f8fafc;
        color: #667eea;
      }

      .tab.active {
        color: #dc2626;
        border-bottom-color: #dc2626;
        background: #fef2f2;
      }

      /* Sidebar */
      .sidebar-section {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .sidebar-card {
        background: white;
        border-radius: 24px;
        overflow: hidden;
        box-shadow: var(--card-shadow);
        border: 1px solid #f1f5f9;
      }

      .sidebar-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 24px 24px 20px;
        border-bottom: 1px solid #f1f5f9;
      }

      .sidebar-icon {
        width: 40px;
        height: 40px;
        background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 22px;
        box-shadow: 0 6px 16px rgba(220, 38, 38, 0.3);
      }

      .sidebar-title {
        font-size: 16px;
        font-weight: 800;
        color: #1e293b;
        margin: 0;
      }

      .documents-list {
        padding: 16px;
      }

      .document-item {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 14px;
        border-radius: 14px;
        transition: var(--transition-smooth);
        cursor: pointer;
      }

      .document-item:hover {
        background: #f8fafc;
      }

      .document-icon {
        width: 44px;
        height: 44px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .document-icon.pdf {
        background: #fef2f2;
        color: #ef4444;
      }

      .document-icon.doc {
        background: #eff6ff;
        color: #3b82f6;
      }

      .document-icon.xls {
        background: #f0fdf4;
        color: #22c55e;
      }

      .document-icon mat-icon {
        font-size: 24px;
        width: 24px;
        height: 24px;
      }

      .document-info {
        flex: 1;
        min-width: 0;
      }

      .document-name {
        font-size: 14px;
        font-weight: 700;
        color: #1e293b;
        margin: 0 0 4px 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .document-size {
        font-size: 12px;
        color: #94a3b8;
        font-weight: 600;
      }

      .btn-download {
        width: 40px;
        height: 40px;
        background: #f1f5f9;
        border: none;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: var(--transition-smooth);
        flex-shrink: 0;
      }

      .btn-download:hover {
        background: var(--primary-gradient);
        transform: scale(1.05);
      }

      .btn-download mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
        color: #64748b;
      }

      .btn-download:hover mat-icon {
        color: white;
      }

      .sidebar-footer {
        padding: 20px 24px;
        border-top: 1px solid #f1f5f9;
        background: #f8fafc;
      }

      .storage-info {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .storage-header {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 13px;
        font-weight: 700;
        color: #475569;
        text-transform: uppercase;
      }

      .storage-header mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
        color: #f97316;
      }

      .storage-bar {
        height: 8px;
        background: #e2e8f0;
        border-radius: 10px;
        overflow: hidden;
      }

      .storage-fill {
        height: 100%;
        background: linear-gradient(90deg, #f97316 0%, #dc2626 100%);
        border-radius: 10px;
      }

      .storage-text {
        font-size: 12px;
        color: #94a3b8;
        font-weight: 600;
      }

      .upcoming-card {
        background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
        border-color: #fed7aa;
      }

      .upcoming-card .sidebar-icon {
        background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
      }

      .upcoming-list {
        padding: 16px;
      }

      .upcoming-item {
        display: flex;
        gap: 14px;
        padding: 14px;
        background: white;
        border-radius: 14px;
        margin-bottom: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
      }

      .upcoming-item:last-child {
        margin-bottom: 0;
      }

      .upcoming-date {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
        border-radius: 12px;
        padding: 10px 14px;
        min-width: 60px;
      }

      .upcoming-date .day {
        font-size: 20px;
        font-weight: 900;
        color: white;
        line-height: 1;
      }

      .upcoming-date .month {
        font-size: 10px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.9);
        text-transform: uppercase;
        margin-top: 2px;
      }

      .upcoming-info {
        flex: 1;
      }

      .upcoming-info h4 {
        font-size: 14px;
        font-weight: 700;
        color: #1e293b;
        margin: 0 0 6px 0;
      }

      .upcoming-info .time {
        font-size: 12px;
        color: #64748b;
        font-weight: 600;
      }

      /* Responsive */
      @media (max-width: 1024px) {
        .biblioteca-content {
          grid-template-columns: 1fr;
          gap: 24px;
        }

        .sidebar-section {
          flex-direction: row;
          flex-wrap: wrap;
          gap: 20px;
        }

        .sidebar-card {
          flex: 1;
          min-width: 280px;
          margin-bottom: 0;
        }
      }

      @media (max-width: 768px) {
        .biblioteca-header {
          padding: 40px 16px 70px;
        }

        .header-title {
          font-size: 28px;
        }

        .header-subtitle {
          font-size: 14px;
        }

        .biblioteca-content {
          margin-top: -60px;
          padding: 0 16px;
        }

        .video-placeholder {
          height: 220px;
        }

        .video-card {
          margin-bottom: 20px;
        }

        .video-header {
          padding: 20px;
          flex-direction: column;
          gap: 16px;
        }

        .video-info {
          width: 100%;
        }

        .video-icon {
          width: 40px;
          height: 40px;
          font-size: 24px;
        }

        .video-title {
          font-size: 17px;
        }

        .video-subtitle {
          font-size: 13px;
        }

        .video-actions {
          width: 100%;
          justify-content: center;
        }

        .btn-icon {
          width: 40px;
          height: 40px;
        }

        .btn-icon mat-icon {
          font-size: 20px;
        }

        .video-description {
          padding: 20px;
        }

        .video-description p {
          font-size: 14px;
        }

        .content-tabs {
          margin-top: 20px;
        }

        .tab {
          padding: 12px 8px;
          font-size: 11px;
          gap: 4px;
        }

        .tab mat-icon {
          font-size: 16px;
          width: 16px;
          height: 16px;
        }

        .sidebar-section {
          flex-direction: column;
        }

        .sidebar-card {
          min-width: 100%;
          margin-bottom: 20px;
        }

        .sidebar-card:last-child {
          margin-bottom: 0;
        }

        .documents-list {
          padding: 12px;
        }

        .document-item {
          padding: 12px;
        }

        .document-icon {
          width: 40px;
          height: 40px;
        }

        .document-icon mat-icon {
          font-size: 22px;
        }

        .document-name {
          font-size: 13px;
        }

        .document-size {
          font-size: 11px;
        }

        .btn-download {
          width: 38px;
          height: 38px;
        }

        .btn-download mat-icon {
          font-size: 18px;
        }

        .sidebar-header {
          padding: 20px;
        }

        .sidebar-title {
          font-size: 15px;
        }

        .upcoming-item {
          padding: 12px;
        }

        .upcoming-date {
          min-width: 50px;
          padding: 8px 10px;
        }

        .upcoming-date .day {
          font-size: 18px;
        }

        .upcoming-date .month {
          font-size: 9px;
        }

        .upcoming-info h4 {
          font-size: 13px;
        }

        .upcoming-info .time {
          font-size: 11px;
        }
      }

      @media (max-width: 480px) {
        .biblioteca-header {
          padding: 32px 16px 60px;
        }

        .header-title {
          font-size: 24px;
        }

        .header-badge {
          font-size: 11px;
          padding: 5px 12px;
        }

        .header-subtitle {
          font-size: 13px;
        }

        .biblioteca-content {
          margin-top: -50px;
          padding: 0 12px;
        }

        .video-placeholder {
          height: 180px;
        }

        .play-button {
          width: 60px;
          height: 60px;
          border: 2px solid rgba(255, 255, 255, 0.4);
        }

        .play-button mat-icon {
          font-size: 28px;
          width: 28px;
          height: 28px;
        }

        .placeholder-text {
          font-size: 14px;
          padding: 0 20px;
        }

        .placeholder-subtext {
          font-size: 12px;
        }

        .video-progress {
          padding: 16px;
        }

        .video-description {
          padding: 16px;
        }

        .video-description p {
          font-size: 13px;
        }

        .video-title {
          font-size: 15px;
        }

        .video-subtitle {
          font-size: 12px;
        }

        .video-icon {
          width: 36px;
          height: 36px;
          font-size: 20px;
        }

        .document-item {
          gap: 10px;
        }

        .document-icon {
          width: 36px;
          height: 36px;
        }

        .document-icon mat-icon {
          font-size: 20px;
        }

        .document-info {
          min-width: 0;
        }

        .document-name {
          font-size: 12px;
        }

        .document-size {
          font-size: 10px;
        }

        .btn-download {
          width: 34px;
          height: 34px;
        }

        .btn-download mat-icon {
          font-size: 16px;
        }

        .sidebar-header {
          padding: 16px;
        }

        .sidebar-title {
          font-size: 14px;
        }

        .sidebar-icon {
          width: 36px;
          height: 36px;
          font-size: 20px;
        }

        .storage-info {
          padding: 16px;
        }

        .upcoming-list {
          padding: 12px;
        }

        .upcoming-item {
          padding: 10px;
          gap: 10px;
        }

        .upcoming-date {
          min-width: 45px;
        }

        .upcoming-date .day {
          font-size: 16px;
        }

        .upcoming-date .month {
          font-size: 8px;
        }

        .upcoming-info h4 {
          font-size: 12px;
        }

        .upcoming-info .time {
          font-size: 10px;
        }

        .tab {
          padding: 10px 6px;
          font-size: 10px;
          gap: 3px;
        }

        .tab mat-icon {
          font-size: 14px;
          width: 14px;
          height: 14px;
        }
      }
    </style>
  `,
  styles: []
})
export class BibliotecaComponent {
  descargar() {
    alert('¡Descarga iniciada! El archivo se está guardando en tu equipo.');
  }
}
