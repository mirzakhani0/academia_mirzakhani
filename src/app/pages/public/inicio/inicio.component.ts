import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AcademiaService } from 'src/app/services/academia.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatButtonModule, MatCardModule, CommonModule],
  template: `
    <div class="landing-page">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-bg-overlay"></div>
        <div class="hero-content">
          <span class="hero-badge">🎓 Educación de Excelencia</span>
          <h1 class="hero-title">Academia <span class="text-gradient">MIRZAKHANI</span></h1>
          <p class="hero-subtitle">
            Potencia tu aprendizaje con cursos diseñados por expertos.
            Accede a clases grabadas, material PDF y ejercicios resueltos.
          </p>
          <div class="hero-actions">
            <a routerLink="/cursos-public" class="btn-primary btn-large">
              <mat-icon>school</mat-icon>
              <span>Ver Cursos Disponibles</span>
            </a>
            <a routerLink="/authentication/login" class="btn-secondary btn-large">
              <mat-icon>login</mat-icon>
              <span>Soy Estudiante</span>
            </a>
          </div>
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">{{cursos.length}}+</span>
              <span class="stat-label">Cursos</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">1000+</span>
              <span class="stat-label">Estudiantes</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">∞</span>
              <span class="stat-label">Acceso Vitalicio</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Cursos Destacados Section -->
      <section class="cursos-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Nuestros Cursos</h2>
            <p class="section-subtitle">Explora nuestra variedad de cursos disponibles</p>
          </div>

          <!-- Loading State -->
          <div class="loading-state" *ngIf="loading">
            <mat-icon class="loading-icon">sync</mat-icon>
            <p>Cargando cursos...</p>
          </div>

          <!-- Cursos Grid -->
          <div class="cursos-grid" *ngIf="!loading && cursos.length > 0">
            <div class="curso-card" *ngFor="let curso of cursos">
              <div class="curso-header" [style.background]="curso.gradiente">
                <mat-icon>{{curso.icono}}</mat-icon>
                <span class="curso-badge">{{curso.categoria}}</span>
              </div>
              <div class="curso-body">
                <h3>{{curso.nombre}}</h3>
                <p>{{curso.descripcion}}</p>
                <div class="curso-footer">
                  <div class="curso-precio">S/ {{curso.precio}}</div>
                  <a routerLink="/cursos-public" class="btn-ver">
                    <mat-icon>visibility</mat-icon>
                    <span>Ver Más</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div class="empty-state" *ngIf="!loading && cursos.length === 0">
            <mat-icon>inventory_2</mat-icon>
            <h3>No hay cursos disponibles</h3>
            <p>Pronto tendremos nuevos cursos para ti</p>
            <a routerLink="/cursos-public" class="btn-primary">
              <mat-icon>school</mat-icon>
              <span>Ver Todos los Cursos</span>
            </a>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">¿Por qué elegirnos?</h2>
            <p class="section-subtitle">Una experiencia de aprendizaje completa</p>
          </div>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon bg-orange">
                <mat-icon>video_library</mat-icon>
              </div>
              <h3>Clases Grabadas</h3>
              <p>Accede a clases en video de alta calidad cuando y donde quieras.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon bg-blue">
                <mat-icon>description</mat-icon>
              </div>
              <h3>Material PDF</h3>
              <p>Teoría completa, ejercicios propuestos y resueltos.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon bg-green">
                <mat-icon>schedule</mat-icon>
              </div>
              <h3>Acceso Vitalicio</h3>
              <p>Una vez adquirido, el curso es tuyo para siempre.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon bg-purple">
                <mat-icon>emoji_events</mat-icon>
              </div>
              <h3>Certificado</h3>
              <p>Obtén un certificado al completar cada curso.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Cómo Funciona -->
      <section class="steps-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">¿Cómo Funciona?</h2>
            <p class="section-subtitle">Tres simples pasos para comenzar</p>
          </div>
          <div class="steps-grid">
            <div class="step-card">
              <div class="step-number">1</div>
              <div class="step-icon">
                <mat-icon>shopping_cart</mat-icon>
              </div>
              <h3>Solicita tu Inscripción</h3>
              <p>Elige el curso y completa el formulario de inscripción.</p>
            </div>
            <div class="step-card">
              <div class="step-number">2</div>
              <div class="step-icon">
                <mat-icon>payment</mat-icon>
              </div>
              <h3>Realiza tu Pago</h3>
              <p>Yape o transfiere al BCP. Verificaremos tu pago.</p>
            </div>
            <div class="step-card">
              <div class="step-number">3</div>
              <div class="step-icon">
                <mat-icon>school</mat-icon>
              </div>
              <h3>Recibe tu Acceso</h3>
              <p>Te enviaremos tus credenciales y podrás acceder.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonios -->
      <section class="testimonials-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">Lo Que Dicen Nuestros Estudiantes</h2>
            <p class="section-subtitle">Historias de éxito reales</p>
          </div>
          <div class="testimonials-grid">
            <div class="testimonial-card">
              <div class="testimonial-header">
                <div class="testimonial-avatar">JP</div>
                <div class="testimonial-info">
                  <h4>Juan Pérez</h4>
                  <p class="testimonial-course">Álgebra Lineal</p>
                </div>
                <div class="testimonial-rating">
                  <mat-icon>star</mat-icon>
                  <mat-icon>star</mat-icon>
                  <mat-icon>star</mat-icon>
                  <mat-icon>star</mat-icon>
                  <mat-icon>star</mat-icon>
                </div>
              </div>
              <p class="testimonial-text">
                "Excelente curso. Las explicaciones son muy claras y el material PDF es completo.
                Pude aprobar mi examen universitario gracias a Academia MIRZAKHANI."
              </p>
            </div>

            <div class="testimonial-card">
              <div class="testimonial-header">
                <div class="testimonial-avatar">ML</div>
                <div class="testimonial-info">
                  <h4>María López</h4>
                  <p class="testimonial-course">Física I</p>
                </div>
                <div class="testimonial-rating">
                  <mat-icon>star</mat-icon>
                  <mat-icon>star</mat-icon>
                  <mat-icon>star</mat-icon>
                  <mat-icon>star</mat-icon>
                  <mat-icon>star</mat-icon>
                </div>
              </div>
              <p class="testimonial-text">
                "Los videos son de excelente calidad y puedo verlos las veces que necesite.
                El acceso vitalicio es una gran ventaja. ¡Totalmente recomendado!"
              </p>
            </div>

            <div class="testimonial-card">
              <div class="testimonial-header">
                <div class="testimonial-avatar">CR</div>
                <div class="testimonial-info">
                  <h4>Carlos Ruiz</h4>
                  <p class="testimonial-course">Cálculo Diferencial</p>
                </div>
                <div class="testimonial-rating">
                  <mat-icon>star</mat-icon>
                  <mat-icon>star</mat-icon>
                  <mat-icon>star</mat-icon>
                  <mat-icon>star</mat-icon>
                  <mat-icon>star</mat-icon>
                </div>
              </div>
              <p class="testimonial-text">
                "El material PDF con ejercicios resueltos es increíble.
                Pude practicar mucho y entender temas que en la universidad no lograba comprender."
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>Comienza tu aprendizaje hoy</h2>
          <p>Únete a miles de estudiantes que ya están mejorando sus habilidades</p>
          <div class="cta-actions">
            <a routerLink="/cursos-public" class="btn-large btn-primary">
              <mat-icon>school</mat-icon>
              <span>Ver Cursos Disponibles</span>
            </a>
            <a routerLink="/authentication/login" class="btn-large btn-outline">
              <mat-icon>login</mat-icon>
              <span>Ya soy Estudiante</span>
            </a>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="landing-footer">
        <div class="footer-content">
          <div class="footer-column footer-about">
            <h3>Academia MIRZAKHANI</h3>
            <p class="footer-tagline">Educación de calidad al alcance de todos</p>
            <div class="footer-social">
              <a href="#" class="social-icon" title="Facebook">
                <mat-icon>facebook</mat-icon>
              </a>
              <a href="#" class="social-icon" title="Instagram">
                <mat-icon>favorite</mat-icon>
              </a>
              <a href="#" class="social-icon" title="YouTube">
                <mat-icon>play_circle</mat-icon>
              </a>
              <a href="https://wa.me/51965890475" class="social-icon" title="WhatsApp">
                <mat-icon>phone</mat-icon>
              </a>
            </div>
          </div>

          <div class="footer-column footer-contact">
            <h4>📞 Contacto</h4>
            <p><mat-icon>phone</mat-icon><span>+51 965 890 475</span></p>
            <p><mat-icon>email</mat-icon><a href="mailto:contacto@mirzakhani.com">contacto@mirzakhani.com</a></p>
            <p><mat-icon>location_on</mat-icon><span>Perú</span></p>
          </div>

          <div class="footer-column footer-payment">
            <h4>💳 Métodos de Pago</h4>
            <div class="payment-methods">
              <div class="payment-item">
                <mat-icon class="payment-icon yape">wallet</mat-icon>
                <span>Yape</span>
              </div>
              <div class="payment-item">
                <mat-icon class="payment-icon bcp">account_balance</mat-icon>
                <span>BCP</span>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <div class="footer-bottom-content">
            <p class="copyright">
              © 2026 Academia MIRZAKHANI. Todos los derechos reservados.
            </p>

            <!-- Developer Credits -->
            <div class="developer-credits">
              <p class="credits-title">
                💻 Desarrollado por <strong>CARLOS</strong>
              </p>
              <p class="credits-contact">
                📧 ¿Quieres un proyecto similar?
                <a href="mailto:llanovilca79@gmail.com" class="credits-email">
                  llanovilca79@gmail.com
                </a>
              </p>
            </div>

            <p class="footer-legal">
              DERECHOS RESERVADOS @MIRZAKHANI - 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    /* Estilos generales */
    .landing-page {
      font-family: 'Plus Jakarta Sans', sans-serif;
      overflow-x: hidden;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .section-header {
      text-align: center;
      margin-bottom: 60px;
    }

    .section-title {
      font-size: 42px;
      font-weight: 900;
      color: #1e293b;
      margin: 0 0 16px;
    }

    .section-subtitle {
      font-size: 18px;
      color: #64748b;
      margin: 0;
    }

    .text-gradient {
      background: linear-gradient(135deg, #fcd34d 0%, #fbbf24 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
    }

    /* Hero Section */
    .hero-section {
      background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
      padding: 120px 20px 140px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .hero-bg-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      opacity: 0.3;
    }

    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 900px;
      margin: 0 auto;
    }

    .hero-badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.2);
      backdrop-filter: blur(10px);
      padding: 8px 20px;
      border-radius: 50px;
      color: white;
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 24px;
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .hero-title {
      font-size: 64px;
      font-weight: 900;
      color: white;
      margin: 0 0 24px;
      letter-spacing: -2px;
      line-height: 1.1;
    }

    .hero-subtitle {
      font-size: 20px;
      color: rgba(255, 255, 255, 0.95);
      margin: 0 0 48px;
      line-height: 1.6;
    }

    .hero-actions {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 60px;
    }

    .btn-primary, .btn-secondary, .btn-large {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 16px 32px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 700;
      font-size: 16px;
      transition: all 0.3s;
    }

    .btn-primary {
      background: white;
      color: #dc2626;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }

    .btn-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.15);
      color: white;
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255, 255, 255, 0.3);
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.25);
      transform: translateY(-3px);
    }

    .btn-large {
      padding: 20px 40px;
      font-size: 18px;
    }

    .btn-outline {
      background: transparent;
      color: white;
      border: 3px solid white;
    }

    .btn-outline:hover {
      background: white;
      color: #dc2626;
    }

    .hero-stats {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 50px;
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(20px);
      padding: 32px 48px;
      border-radius: 24px;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .stat-number {
      font-size: 40px;
      font-weight: 900;
      color: white;
    }

    .stat-label {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.85);
      margin-top: 6px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .stat-divider {
      width: 1px;
      height: 50px;
      background: rgba(255, 255, 255, 0.3);
    }

    /* Cursos Section */
    .cursos-section {
      padding: 100px 20px;
      background: white;
    }

    .cursos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 32px;
    }

    .curso-card {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .curso-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
    }

    .curso-header {
      height: 180px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .curso-header mat-icon {
      font-size: 80px;
      width: 80px;
      height: 80px;
      color: white;
      opacity: 0.9;
    }

    .curso-badge {
      position: absolute;
      top: 16px;
      right: 16px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 6px 14px;
      border-radius: 50px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .curso-body {
      padding: 24px;
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

    .btn-ver {
      display: flex;
      align-items: center;
      gap: 8px;
      background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
      color: white;
      padding: 10px 20px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 700;
      font-size: 14px;
      transition: all 0.3s;
    }

    .btn-ver:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
    }

    .btn-ver mat-icon {
      font-size: 18px;
    }

    /* Loading & Empty States */
    .loading-state, .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 20px;
      text-align: center;
      background: #f8fafc;
      border-radius: 16px;
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

    .empty-state h3 {
      font-size: 22px;
      font-weight: 800;
      color: #1e293b;
      margin: 0 0 8px;
    }

    .empty-state .btn-primary {
      margin-top: 24px;
    }

    /* Features Section */
    .features-section {
      padding: 100px 20px;
      background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 32px;
    }

    .feature-card {
      text-align: center;
      padding: 40px 24px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .feature-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
    }

    .feature-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 24px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .feature-icon mat-icon {
      font-size: 40px;
      color: white;
    }

    .feature-icon.bg-orange {
      background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
      box-shadow: 0 12px 24px rgba(220, 38, 38, 0.3);
    }

    .feature-icon.bg-blue {
      background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
      box-shadow: 0 12px 24px rgba(59, 130, 246, 0.3);
    }

    .feature-icon.bg-green {
      background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
      box-shadow: 0 12px 24px rgba(34, 197, 94, 0.3);
    }

    .feature-icon.bg-purple {
      background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
      box-shadow: 0 12px 24px rgba(168, 85, 247, 0.3);
    }

    .feature-card h3 {
      font-size: 22px;
      font-weight: 800;
      color: #1e293b;
      margin: 0 0 12px;
    }

    .feature-card p {
      font-size: 15px;
      color: #64748b;
      line-height: 1.6;
      margin: 0;
    }

    /* Steps Section */
    .steps-section {
      padding: 100px 20px;
      background: white;
    }

    .steps-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 40px;
    }

    .step-card {
      text-align: center;
      padding: 40px 24px;
      background: white;
      border-radius: 20px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
      position: relative;
    }

    .step-number {
      position: absolute;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 24px;
      font-weight: 900;
      box-shadow: 0 8px 20px rgba(220, 38, 38, 0.3);
    }

    .step-icon {
      width: 100px;
      height: 100px;
      margin: 20px auto;
      background: linear-gradient(135deg, #fef3c7 0%, #ffedd5 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .step-icon mat-icon {
      font-size: 50px;
      color: #f97316;
    }

    .step-card h3 {
      font-size: 22px;
      font-weight: 800;
      color: #1e293b;
      margin: 0 0 12px;
    }

    .step-card p {
      font-size: 15px;
      color: #64748b;
      line-height: 1.6;
      margin: 0;
    }

    /* Testimonials Section */
    .testimonials-section {
      padding: 100px 20px;
      background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 32px;
    }

    .testimonial-card {
      background: white;
      padding: 32px;
      border-radius: 20px;
      border: 2px solid #e2e8f0;
      transition: all 0.3s;
    }

    .testimonial-card:hover {
      border-color: #f97316;
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .testimonial-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
    }

    .testimonial-avatar {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 20px;
      font-weight: 800;
    }

    .testimonial-info {
      flex: 1;
    }

    .testimonial-info h4 {
      font-size: 18px;
      font-weight: 800;
      color: #1e293b;
      margin: 0 0 4px;
    }

    .testimonial-course {
      font-size: 14px;
      color: #64748b;
      margin: 0;
    }

    .testimonial-rating {
      display: flex;
      gap: 4px;
    }

    .testimonial-rating mat-icon {
      font-size: 20px;
      color: #fbbf24;
    }

    .testimonial-text {
      font-size: 15px;
      color: #475569;
      line-height: 1.7;
      margin: 0;
      font-style: italic;
    }

    /* CTA Section */
    .cta-section {
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      padding: 100px 20px;
      text-align: center;
    }

    .cta-content {
      max-width: 700px;
      margin: 0 auto;
    }

    .cta-content h2 {
      font-size: 42px;
      font-weight: 900;
      color: white;
      margin: 0 0 16px;
    }

    .cta-content p {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.8);
      margin: 0 0 40px;
    }

    .cta-actions {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
    }

    /* Footer */
    .landing-footer {
      background: #0f172a;
      color: white;
      padding: 60px 20px 30px;
    }

    .footer-content {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 48px;
      margin-bottom: 40px;
    }

    .footer-column h3, .footer-column h4 {
      font-size: 20px;
      font-weight: 900;
      margin: 0 0 16px;
    }

    .footer-column h3 {
      background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .footer-tagline {
      color: rgba(255, 255, 255, 0.7);
      margin: 0 0 20px;
    }

    .footer-social {
      display: flex;
      gap: 12px;
    }

    .social-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(249, 115, 22, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
      border: 2px solid rgba(249, 115, 22, 0.3);
    }

    .social-icon mat-icon {
      font-size: 20px;
      color: #f97316;
    }

    .social-icon:hover {
      background: #f97316;
      border-color: #f97316;
      transform: translateY(-3px);
    }

    .social-icon:hover mat-icon {
      color: white;
    }

    .footer-contact p, .footer-payment p {
      display: flex;
      align-items: center;
      gap: 12px;
      color: rgba(255, 255, 255, 0.7);
      margin: 12px 0;
      font-size: 15px;
    }

    .footer-contact mat-icon {
      color: #f97316;
      font-size: 18px;
    }

    .footer-contact a {
      color: rgba(255, 255, 255, 0.7);
      text-decoration: none;
      transition: color 0.3s;
    }

    .footer-contact a:hover {
      color: #f97316;
    }

    .payment-methods {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .payment-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .payment-item span {
      color: rgba(255, 255, 255, 0.9);
      font-size: 15px;
      font-weight: 600;
    }

    .payment-icon {
      font-size: 24px;
    }

    .payment-icon.yape {
      color: #742194;
    }

    .payment-icon.bcp {
      color: #00A9E0;
    }

    .footer-bottom {
      max-width: 1200px;
      margin: 0 auto;
      padding-top: 30px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }

    .footer-bottom-content {
      text-align: center;
    }

    .copyright {
      color: rgba(255, 255, 255, 0.5);
      font-size: 14px;
      margin: 0 0 20px;
    }

    .developer-credits {
      background: rgba(249, 115, 22, 0.05);
      padding: 20px;
      border-radius: 12px;
      border: 1px solid rgba(249, 115, 22, 0.2);
      margin: 20px 0;
    }

    .credits-title {
      font-size: 15px;
      color: rgba(255, 255, 255, 0.8);
      margin: 0 0 8px;
    }

    .credits-title strong {
      color: #f97316;
      font-weight: 800;
    }

    .credits-contact {
      font-size: 13px;
      color: rgba(255, 255, 255, 0.6);
      margin: 0;
    }

    .credits-email {
      color: #fbbf24;
      text-decoration: none;
      font-weight: 600;
    }

    .credits-email:hover {
      color: #f97316;
      text-decoration: underline;
    }

    .footer-legal {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.4);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 20px;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .hero-title {
        font-size: 36px;
      }

      .hero-subtitle {
        font-size: 16px;
      }

      .hero-actions {
        flex-direction: column;
        align-items: center;
      }

      .btn-primary, .btn-secondary, .btn-large {
        width: 100%;
        max-width: 300px;
        justify-content: center;
      }

      .hero-stats {
        flex-direction: column;
        gap: 24px;
        padding: 24px;
      }

      .stat-divider {
        width: 40px;
        height: 1px;
      }

      .section-title {
        font-size: 32px;
      }

      .cursos-grid, .features-grid, .testimonials-grid, .steps-grid {
        grid-template-columns: 1fr;
      }

      .footer-content {
        grid-template-columns: 1fr;
        gap: 32px;
      }
    }
  `]
})
export class InicioComponent implements OnInit {
  cursos: any[] = [];
  loading = true;

  constructor(
    private academiaService: AcademiaService
  ) {}

  ngOnInit(): void {
    this.cargarCursos();
  }

  cargarCursos(): void {
    const cursosData = this.academiaService.getCursos();

    this.cursos = cursosData.map(curso => ({
      id: curso.id,
      nombre: curso.nombre,
      descripcion: curso.descripcion,
      precio: curso.precio,
      categoria: curso.categoria,
      gradiente: this.getGradientePorCategoria(curso.categoria),
      icono: this.getIconoPorCategoria(curso.categoria)
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
}
