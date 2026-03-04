import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getApps, initializeApp } from 'firebase/app';

interface UsuarioPerfil {
  nombre: string;
  email: string;
  dni: string;
  telefono: string;
  rol: string;
  fechaRegistro: string;
  cursosMatriculados: number;
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatCardModule, CommonModule],
  template: `
    <div class="perfil-container">
      <div class="perfil-header">
        <h1>Mi Perfil</h1>
        <p>Información de tu cuenta</p>
      </div>

      <!-- Loading State -->
      <div class="loading-state" *ngIf="loading">
        <mat-icon class="loading-icon">sync</mat-icon>
        <p>Cargando datos del perfil...</p>
      </div>

      <!-- Perfil Content -->
      <div class="perfil-content" *ngIf="!loading && usuario">
        <div class="perfil-card">
          <!-- Avatar Section -->
          <div class="avatar-section">
            <div class="avatar">
              <mat-icon>person</mat-icon>
            </div>
            <div class="avatar-info">
              <h2>{{usuario.nombre}}</h2>
              <span class="rol-badge" [class.admin]="usuario.rol === 'admin'">
                {{usuario.rol === 'admin' ? 'Administrador' : 'Estudiante'}}
              </span>
            </div>
          </div>

          <!-- Info Section -->
          <div class="info-section">
            <h3>Información Personal</h3>
            
            <div class="info-grid">
              <div class="info-item">
                <div class="info-icon">
                  <mat-icon>badge</mat-icon>
                </div>
                <div class="info-content">
                  <span class="info-label">DNI</span>
                  <span class="info-value">{{usuario.dni || 'No especificado'}}</span>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <mat-icon>email</mat-icon>
                </div>
                <div class="info-content">
                  <span class="info-label">Correo Electrónico</span>
                  <span class="info-value">{{usuario.email}}</span>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <mat-icon>phone</mat-icon>
                </div>
                <div class="info-content">
                  <span class="info-label">Teléfono</span>
                  <span class="info-value">{{usuario.telefono || 'No especificado'}}</span>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <mat-icon>calendar_today</mat-icon>
                </div>
                <div class="info-content">
                  <span class="info-label">Fecha de Registro</span>
                  <span class="info-value">{{usuario.fechaRegistro | date:'dd/MM/yyyy'}}</span>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <mat-icon>school</mat-icon>
                </div>
                <div class="info-content">
                  <span class="info-label">Cursos Matriculados</span>
                  <span class="info-value">{{usuario.cursosMatriculados}} cursos</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Nota informativa -->
          <div class="info-note">
            <mat-icon>info</mat-icon>
            <p>Para actualizar tus datos, contacta al administrador del sistema.</p>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div class="error-state" *ngIf="!loading && !usuario && errorMessage">
        <mat-icon>error_outline</mat-icon>
        <p>{{errorMessage}}</p>
      </div>
    </div>

    <style>
      .perfil-container {
        padding: 24px;
        background: #f8fafc;
        min-height: 100vh;
      }

      .perfil-header {
        margin-bottom: 32px;
      }

      .perfil-header h1 {
        font-size: 32px;
        font-weight: 900;
        color: #1e293b;
        margin: 0 0 8px;
      }

      .perfil-header p {
        font-size: 15px;
        color: #64748b;
        margin: 0;
      }

      /* Loading State */
      .loading-state, .error-state {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 80px 20px;
        background: white;
        border-radius: 16px;
        text-align: center;
      }

      .loading-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
        color: #f97316;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }

      .loading-state p, .error-state p {
        color: #64748b;
        margin: 16px 0 0;
        font-size: 15px;
      }

      .error-state mat-icon {
        font-size: 48px;
        width: 48px;
        height: 48px;
        color: #ef4444;
        margin-bottom: 16px;
      }

      /* Perfil Card */
      .perfil-card {
        background: white;
        border-radius: 20px;
        padding: 40px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
      }

      /* Avatar Section */
      .avatar-section {
        display: flex;
        align-items: center;
        gap: 24px;
        padding-bottom: 32px;
        border-bottom: 2px solid #f1f5f9;
        margin-bottom: 32px;
      }

      .avatar {
        width: 100px;
        height: 100px;
        background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
      }

      .avatar mat-icon {
        font-size: 50px;
        width: 50px;
        height: 50px;
        color: white;
      }

      .avatar-info h2 {
        font-size: 24px;
        font-weight: 900;
        color: #1e293b;
        margin: 0 0 8px;
      }

      .rol-badge {
        display: inline-block;
        background: #dbeafe;
        color: #1d4ed8;
        padding: 6px 16px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .rol-badge.admin {
        background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
        color: white;
      }

      /* Info Section */
      .info-section h3 {
        font-size: 18px;
        font-weight: 800;
        color: #1e293b;
        margin: 0 0 20px;
      }

      .info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 16px;
      }

      .info-item {
        display: flex;
        align-items: flex-start;
        gap: 16px;
        padding: 20px;
        background: #f8fafc;
        border-radius: 12px;
        border: 2px solid #e2e8f0;
        transition: all 0.3s;
      }

      .info-item:hover {
        border-color: #f97316;
        background: #fff7ed;
      }

      .info-icon {
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
      }

      .info-icon mat-icon {
        font-size: 24px;
        width: 24px;
        height: 24px;
        color: white;
      }

      .info-content {
        flex: 1;
      }

      .info-label {
        display: block;
        font-size: 12px;
        font-weight: 600;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 6px;
      }

      .info-value {
        display: block;
        font-size: 15px;
        font-weight: 700;
        color: #1e293b;
      }

      /* Info Note */
      .info-note {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 20px;
        background: #eff6ff;
        border-radius: 12px;
        border: 2px solid #dbeafe;
        margin-top: 24px;
      }

      .info-note mat-icon {
        font-size: 24px;
        width: 24px;
        height: 24px;
        color: #2563eb;
        flex-shrink: 0;
      }

      .info-note p {
        font-size: 14px;
        color: #1e40af;
        margin: 0;
        line-height: 1.6;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .perfil-container {
          padding: 16px;
        }

        .perfil-header h1 {
          font-size: 24px;
        }

        .perfil-card {
          padding: 24px;
        }

        .avatar-section {
          flex-direction: column;
          text-align: center;
        }

        .avatar {
          width: 80px;
          height: 80px;
        }

        .avatar mat-icon {
          font-size: 40px;
        }

        .avatar-info h2 {
          font-size: 20px;
        }

        .info-grid {
          grid-template-columns: 1fr;
        }

        .info-item {
          padding: 16px;
        }
      }
    </style>
  `
})
export class PerfilComponent implements OnInit {
  loading = true;
  usuario: UsuarioPerfil | null = null;
  errorMessage: string = '';

  async ngOnInit(): Promise<void> {
    await this.cargarPerfil();
  }

  private async cargarPerfil(): Promise<void> {
    try {
      // Importar Firebase
      const { environment } = await import('../../../../environments/environment');
      
      // Inicializar Firebase si no está inicializado
      if (!getApps().length) {
        initializeApp(environment.firebase);
      }

      const auth = getAuth();
      const firestore = getFirestore();

      // Escuchar cambios en autenticación
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Obtener datos del usuario desde Firestore
          const userDocRef = doc(firestore, 'usuarios', user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const data = userDoc.data();
            this.usuario = {
              nombre: data['nombre'] || user.displayName || 'Usuario',
              email: data['email'] || user.email || '',
              dni: data['dni'] || '',
              telefono: data['telefono'] || '',
              rol: data['rol'] || 'estudiante',
              fechaRegistro: data['fechaRegistro'] || new Date().toISOString(),
              cursosMatriculados: (data['cursosMatriculados'] || []).length
            };
          } else {
            // Usuario no encontrado en Firestore, usar datos básicos
            this.usuario = {
              nombre: user.displayName || 'Usuario',
              email: user.email || '',
              dni: '',
              telefono: '',
              rol: 'estudiante',
              fechaRegistro: new Date().toISOString(),
              cursosMatriculados: 0
            };
          }
        } else {
          this.errorMessage = 'No has iniciado sesión. Por favor, inicia sesión para ver tu perfil.';
        }

        this.loading = false;
      });
    } catch (error: any) {
      console.error('Error cargando perfil:', error);
      this.errorMessage = 'Error al cargar los datos del perfil. Intente nuevamente.';
      this.loading = false;
    }
  }
}
