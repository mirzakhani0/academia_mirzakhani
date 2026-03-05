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
          <span class="hero-badge">🎓 ÚNETE A +1000 ESTUDIANTES</span>
          <h1 class="hero-title">Domina las <span class="text-gradient">Matemáticas y Física</span> con la Academia MIRZAKHANI</h1>
          <p class="hero-subtitle">
            Potencia tu aprendizaje con cursos diseñados por expertos.
            Accede a clases grabadas, material PDF y ejercicios resueltos.
          </p>
          
          <div class="hero-rating">
            <div class="stars">
              <mat-icon>star</mat-icon>
              <mat-icon>star</mat-icon>
              <mat-icon>star</mat-icon>
              <mat-icon>star</mat-icon>
              <mat-icon>star</mat-icon>
            </div>
            <span class="rating-text"><strong>4.9/5</strong> basado en 500+ reseñas</span>
          </div>
          
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
          
          <div class="hero-benefits">
            <div class="benefit-item">
              <mat-icon>check_circle</mat-icon>
              <span>Acceso de por vida</span>
            </div>
            <div class="benefit-item">
              <mat-icon>check_circle</mat-icon>
              <span>Certificado</span>
            </div>
            <div class="benefit-item">
              <mat-icon>check_circle</mat-icon>
              <span>Soporte 24/7</span>
            </div>
            <div class="benefit-item">
              <mat-icon>check_circle</mat-icon>
              <span>Pago seguro</span>
            </div>
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
        <!-- Top Section -->
        <div class="footer-top">
          <div class="container">
            <div class="footer-cta">
              <h2>Comienza tu aprendizaje hoy</h2>
              <p>Únete a miles de estudiantes que ya están mejorando sus habilidades</p>
              <div class="footer-cta-actions">
                <a routerLink="/cursos-public" class="btn-cta-primary">
                  <mat-icon>school</mat-icon>
                  <span>Ver Cursos</span>
                </a>
                <a routerLink="/authentication/login" class="btn-cta-secondary">
                  <mat-icon>login</mat-icon>
                  <span>Soy Estudiante</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Footer -->
        <div class="footer-main">
          <div class="container">
            <div class="footer-grid">
              <!-- Columna 1: Brand -->
              <div class="footer-brand">
                <div class="brand-logo">
                  <div class="logo-icon">
                    <mat-icon>school</mat-icon>
                  </div>
                  <span class="logo-text">MIRZAKHANI</span>
                </div>
                <p class="brand-tagline">Educación de calidad al alcance de todos</p>
                <div class="social-links">
                  <a href="https://facebook.com" target="_blank" class="social-link facebook" title="Facebook">
                    <mat-icon>facebook</mat-icon>
                  </a>
                  <a href="https://instagram.com" target="_blank" class="social-link instagram" title="Instagram">
                    <mat-icon>favorite</mat-icon>
                  </a>
                  <a href="https://youtube.com" target="_blank" class="social-link youtube" title="YouTube">
                    <mat-icon>play_circle</mat-icon>
                  </a>
                  <a href="https://wa.me/51965890475" target="_blank" class="social-link whatsapp" title="WhatsApp">
                    <mat-icon>phone</mat-icon>
                  </a>
                </div>
              </div>

              <!-- Columna 2: Cursos -->
              <div class="footer-column">
                <h4>Materias</h4>
                <ul class="footer-list">
                  <li><a routerLink="/cursos-public">Matemáticas</a></li>
                  <li><a routerLink="/cursos-public">Física</a></li>
                  <li><a routerLink="/cursos-public">Química</a></li>
                  <li><a routerLink="/cursos-public">Biología</a></li>
                  <li><a routerLink="/cursos-public">Letras</a></li>
                </ul>
              </div>

              <!-- Columna 3: Compañía -->
              <div class="footer-column">
                <h4>Compañía</h4>
                <ul class="footer-list">
                  <li><a routerLink="/inicio">Inicio</a></li>
                  <li><a routerLink="/cursos-public">Cursos</a></li>
                  <li><a routerLink="/authentication/login">Ingresar</a></li>
                  <li><a href="mailto:contacto@mirzakhani.com">Contacto</a></li>
                </ul>
              </div>

              <!-- Columna 4: Contacto -->
              <div class="footer-column">
                <h4>Contáctanos</h4>
                <div class="contact-info">
                  <div class="contact-row">
                    <mat-icon>phone</mat-icon>
                    <span>+51 965 890 475</span>
                  </div>
                  <div class="contact-row">
                    <mat-icon>email</mat-icon>
                    <a href="mailto:contacto@mirzakhani.com">contacto@mirzakhani.com</a>
                  </div>
                  <div class="contact-row">
                    <mat-icon>location_on</mat-icon>
                    <span>Perú</span>
                  </div>
                </div>
                <div class="payment-info">
                  <span class="payment-title">Aceptamos:</span>
                  <div class="payment-icons">
                    <span class="payment-icon-yape">Yape</span>
                    <span class="payment-icon-bcp">BCP</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bottom Bar -->
        <div class="footer-bottom">
          <div class="container">
            <div class="footer-bottom-content">
              <p class="copyright">
                © 2026 Academia MIRZAKHANI. Todos los derechos reservados.
              </p>
              
              <!-- Developer Credits -->
              <div class="developer-badge">
                <div class="dev-info">
                  <span class="dev-label">Desarrollado por</span>
                  <strong class="dev-name">CARLOS</strong>
                </div>
                <a href="mailto:llanovilca79@gmail.com" class="dev-contact">
                  <mat-icon>email</mat-icon>
                  <span>llanovilca79@gmail.com</span>
                </a>
                <p class="dev-tagline">¿Quieres un proyecto similar?</p>
              </div>
            </div>
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

    /* Footer - Estilo Khan Academy Profesional */
    .landing-footer {
      background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%);
      color: #212529;
      border-top: 1px solid #e9ecef;
    }

    .footer-top {
      background: linear-gradient(135deg, #0056b3 0%, #007bff 50%, #0099ff 100%);
      padding: 80px 0;
    }

    .footer-cta {
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
    }

    .footer-cta h2 {
      font-size: 42px;
      font-weight: 900;
      color: white;
      margin: 0 0 16px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .footer-cta p {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.95);
      margin: 0 0 40px;
    }

    .footer-cta-actions {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn-cta-primary {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 16px 32px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 700;
      font-size: 16px;
      transition: all 0.3s;
      background: #ffc107;
      color: #212529;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .btn-cta-primary:hover {
      background: #ffca2c;
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(255, 193, 7, 0.4);
    }

    .btn-cta-primary mat-icon {
      color: #212529;
    }

    .btn-cta-secondary {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 16px 32px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 700;
      font-size: 16px;
      transition: all 0.3s;
      background: white;
      color: #007bff;
      border: 2px solid white;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .btn-cta-secondary:hover {
      background: rgba(255, 255, 255, 0.9);
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(255, 255, 255, 0.3);
    }

    .btn-cta-secondary mat-icon {
      color: #007bff;
    }

    .footer-main {
      padding: 80px 0 60px;
      background: white;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: 1.8fr 1fr 1fr 1.2fr;
      gap: 60px;
    }

    .brand-logo {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
    }

    .logo-icon {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #dc3545 0%, #ff4757 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
    }

    .logo-icon mat-icon {
      font-size: 28px;
      color: white;
    }

    .logo-text {
      font-size: 26px;
      font-weight: 900;
      background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      letter-spacing: -0.5px;
    }

    .brand-tagline {
      font-size: 15px;
      color: #6c757d;
      line-height: 1.8;
      margin: 0 0 24px;
    }

    .social-links {
      display: flex;
      gap: 12px;
    }

    .social-link {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
      border: 2px solid #e9ecef;
    }

    .social-link mat-icon {
      font-size: 22px;
      transition: color 0.3s;
    }

    .social-link.facebook {
      background: #f0f2f5;
    }

    .social-link.facebook:hover {
      background: #1877f2;
      border-color: #1877f2;
    }

    .social-link.facebook mat-icon {
      color: #1877f2;
    }

    .social-link.facebook:hover mat-icon {
      color: white;
    }

    .social-link.instagram {
      background: #f0f2f5;
    }

    .social-link.instagram:hover {
      background: linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
      border-color: #dc2743;
    }

    .social-link.instagram mat-icon {
      color: #dc2743;
    }

    .social-link.instagram:hover mat-icon {
      color: white;
    }

    .social-link.youtube {
      background: #f0f2f5;
    }

    .social-link.youtube:hover {
      background: #ff0000;
      border-color: #ff0000;
    }

    .social-link.youtube mat-icon {
      color: #ff0000;
    }

    .social-link.youtube:hover mat-icon {
      color: white;
    }

    .social-link.whatsapp {
      background: #f0f2f5;
    }

    .social-link.whatsapp:hover {
      background: #25D366;
      border-color: #25D366;
    }

    .social-link.whatsapp mat-icon {
      color: #25D366;
    }

    .social-link.whatsapp:hover mat-icon {
      color: white;
    }

    .footer-column h4 {
      font-size: 15px;
      font-weight: 800;
      color: #212529;
      margin: 0 0 24px;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }

    .footer-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .footer-list li {
      margin-bottom: 14px;
    }

    .footer-list a {
      color: #6c757d;
      text-decoration: none;
      font-size: 15px;
      transition: all 0.3s;
      display: inline-block;
    }

    .footer-list a:hover {
      color: #007bff;
      transform: translateX(5px);
    }

    .contact-info {
      margin-bottom: 24px;
    }

    .contact-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
      color: #6c757d;
      font-size: 15px;
    }

    .contact-row mat-icon {
      color: #007bff;
      font-size: 20px;
    }

    .contact-row a {
      color: #6c757d;
      text-decoration: none;
      transition: color 0.3s;
    }

    .contact-row a:hover {
      color: #007bff;
    }

    .payment-info {
      padding-top: 24px;
      border-top: 1px solid #e9ecef;
    }

    .payment-title {
      display: block;
      font-size: 13px;
      color: #6c757d;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .payment-icons {
      display: flex;
      gap: 8px;
    }

    .payment-icon-yape,
    .payment-icon-bcp {
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .payment-icon-yape {
      background: linear-gradient(135deg, #742194 0%, #9333ea 100%);
      color: white;
    }

    .payment-icon-bcp {
      background: linear-gradient(135deg, #00A9E0 0%, #0288d1 100%);
      color: white;
    }

    .footer-bottom {
      background: #f8f9fa;
      padding: 40px 0;
      border-top: 1px solid #e9ecef;
    }

    .footer-bottom-content {
      text-align: center;
    }

    .copyright {
      color: #6c757d;
      font-size: 14px;
      margin: 0 0 24px;
    }

    .developer-badge {
      display: inline-block;
      background: white;
      padding: 24px 32px;
      border-radius: 16px;
      border: 2px solid #e9ecef;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      transition: all 0.3s;
    }

    .developer-badge:hover {
      border-color: #007bff;
      box-shadow: 0 8px 20px rgba(0, 123, 255, 0.15);
      transform: translateY(-2px);
    }

    .dev-info {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }

    .dev-label {
      font-size: 14px;
      color: #6c757d;
    }

    .dev-name {
      font-size: 18px;
      background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 900;
    }

    .dev-contact {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: #ffc107;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      padding: 8px 16px;
      background: rgba(255, 193, 7, 0.1);
      border-radius: 8px;
      transition: all 0.3s;
      margin-bottom: 12px;
    }

    .dev-contact mat-icon {
      font-size: 18px;
    }

    .dev-contact:hover {
      background: rgba(255, 193, 7, 0.2);
      color: #ffca2c;
    }

    .dev-tagline {
      font-size: 13px;
      color: #6c757d;
      margin: 0;
      font-style: italic;
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
