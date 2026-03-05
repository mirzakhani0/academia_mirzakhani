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
      <!-- HERO SECTION -->
      <section class="hero">
        <div class="hero-bg">
          <div class="hero-gradient"></div>
          <div class="hero-pattern"></div>
        </div>
        <div class="container hero-content">
          <span class="hero-badge">🎓 +1000 ESTUDIANTES CONFÍAN EN NOSOTROS</span>
          <h1 class="hero-title">
            Domina las <span class="text-red">Matemáticas</span> y <span class="text-blue">Física</span>
          </h1>
          <p class="hero-subtitle">
            Clases grabadas, material PDF y ejercicios resueltos por expertos. 
            Acceso de por vida a todos los cursos.
          </p>
          
          <div class="hero-rating">
            <div class="stars">
              <mat-icon *ngFor="let star of [1,2,3,4,5]">star</mat-icon>
            </div>
            <span class="rating-text"><strong>4.9/5</strong> basado en 500+ reseñas</span>
          </div>
          
          <div class="hero-actions">
            <a routerLink="/cursos-public" class="btn btn-yellow btn-large">
              <mat-icon>school</mat-icon>
              <span>Ver Cursos</span>
            </a>
            <a routerLink="/authentication/login" class="btn btn-white btn-large">
              <mat-icon>login</mat-icon>
              <span>Soy Estudiante</span>
            </a>
          </div>
          
          <div class="hero-benefits">
            <div class="benefit">
              <mat-icon>check_circle</mat-icon>
              <span>Acceso de por vida</span>
            </div>
            <div class="benefit">
              <mat-icon>check_circle</mat-icon>
              <span>Certificado incluido</span>
            </div>
            <div class="benefit">
              <mat-icon>check_circle</mat-icon>
              <span>Soporte 24/7</span>
            </div>
            <div class="benefit">
              <mat-icon>check_circle</mat-icon>
              <span>Pago 100% seguro</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ESTADÍSTICAS -->
      <section class="stats-section">
        <div class="container">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon stat-red">
                <mat-icon>people</mat-icon>
              </div>
              <div class="stat-content">
                <h3 class="stat-number">1000+</h3>
                <p class="stat-label">Estudiantes Activos</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon stat-blue">
                <mat-icon>school</mat-icon>
              </div>
              <div class="stat-content">
                <h3 class="stat-number">50+</h3>
                <p class="stat-label">Cursos Disponibles</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon stat-yellow">
                <mat-icon>trending_up</mat-icon>
              </div>
              <div class="stat-content">
                <h3 class="stat-number">95%</h3>
                <p class="stat-label">Tasa de Aprobación</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon stat-red">
                <mat-icon>schedule</mat-icon>
              </div>
              <div class="stat-content">
                <h3 class="stat-number">24/7</h3>
                <p class="stat-label">Soporte Disponible</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CURSOS CON FILTROS -->
      <section class="courses-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title text-red">Nuestros Cursos</h2>
            <p class="section-subtitle">Explora nuestra variedad de cursos disponibles</p>
          </div>
          
          <!-- Filtros -->
          <div class="course-filters">
            <button class="filter-btn" [class.active]="filtroActual === 'todos'" (click)="filtroActual = 'todos'">
              <mat-icon>view_list</mat-icon>
              <span>Todos</span>
            </button>
            <button class="filter-btn" [class.active]="filtroActual === 'Matemáticas'" (click)="filtroActual = 'Matemáticas'">
              <mat-icon>functions</mat-icon>
              <span>Matemáticas</span>
            </button>
            <button class="filter-btn" [class.active]="filtroActual === 'Física'" (click)="filtroActual = 'Física'">
              <mat-icon>rocket_launch</mat-icon>
              <span>Física</span>
            </button>
            <button class="filter-btn" [class.active]="filtroActual === 'Química'" (click)="filtroActual = 'Química'">
              <mat-icon>biotech</mat-icon>
              <span>Química</span>
            </button>
          </div>

          <!-- Cursos Grid -->
          <div class="courses-grid" *ngIf="!loading && cursosFiltrados.length > 0">
            <div class="course-card" *ngFor="let curso of cursosFiltrados">
              <div class="course-header" [style.background]="curso.gradiente">
                <mat-icon>{{curso.icono}}</mat-icon>
                <span class="course-badge">{{curso.categoria}}</span>
              </div>
              <div class="course-body">
                <h3>{{curso.nombre}}</h3>
                <p>{{curso.descripcion}}</p>
                <div class="course-meta">
                  <div class="meta-item">
                    <mat-icon>play_circle</mat-icon>
                    <span>20 clases</span>
                  </div>
                  <div class="meta-item">
                    <mat-icon>description</mat-icon>
                    <span>5 PDFs</span>
                  </div>
                </div>
                <div class="course-rating">
                  <div class="stars-small">
                    <mat-icon *ngFor="let star of [1,2,3,4,5]">star</mat-icon>
                  </div>
                  <span class="rating-count">(120)</span>
                </div>
                <div class="course-footer">
                  <div class="course-price">S/ {{curso.precio}}</div>
                  <a routerLink="/cursos-public" class="btn btn-blue btn-small">
                    <mat-icon>visibility</mat-icon>
                    <span>Ver Más</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div class="empty-state" *ngIf="!loading && cursosFiltrados.length === 0">
            <mat-icon>inventory_2</mat-icon>
            <h3>No hay cursos en esta categoría</h3>
            <p>Prueba con otro filtro</p>
          </div>
          
          <div class="text-center" *ngIf="!loading && cursosFiltrados.length > 0">
            <a routerLink="/cursos-public" class="btn btn-red btn-large">
              <mat-icon>school</mat-icon>
              <span>Ver Todos los Cursos</span>
            </a>
          </div>
        </div>
      </section>

      <!-- POR QUÉ ELEGIRNOS -->
      <section class="features-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title text-blue">¿Por qué estudiar con nosotros?</h2>
            <p class="section-subtitle">Una experiencia de aprendizaje completa</p>
          </div>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon feature-red">
                <mat-icon>video_library</mat-icon>
              </div>
              <h3>Clases en HD</h3>
              <p>Grabadas por expertos con la mejor calidad de video y audio.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon feature-blue">
                <mat-icon>description</mat-icon>
              </div>
              <h3>Material PDF</h3>
              <p>Teoría completa, ejercicios propuestos y 500+ páginas de contenido.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon feature-yellow">
                <mat-icon>schedule</mat-icon>
              </div>
              <h3>Acceso de Por Vida</h3>
              <p>Sin límites de tiempo. Repasa las veces que necesites.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon feature-red">
                <mat-icon>emoji_events</mat-icon>
              </div>
              <h3>Certificado</h3>
              <p>Obtén un certificado de finalización validable.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon feature-blue">
                <mat-icon>chat</mat-icon>
              </div>
              <h3>Soporte 24/7</h3>
              <p>Resolvemos tus dudas por WhatsApp en cualquier momento.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon feature-yellow">
                <mat-icon>security</mat-icon>
              </div>
              <h3>Pago Seguro</h3>
              <p>Yape, BCP. Garantía de satisfacción de 7 días.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- TESTIMONIOS -->
      <section class="testimonials-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title text-red">Lo Que Dicen Nuestros Estudiantes</h2>
            <p class="section-subtitle">Historias de éxito reales</p>
          </div>
          <div class="testimonials-grid">
            <div class="testimonial-card">
              <div class="testimonial-header">
                <div class="testimonial-logo">
                  <mat-icon>person</mat-icon>
                </div>
                <div class="testimonial-info">
                  <h4>Juan Pérez</h4>
                  <p class="testimonial-course">Álgebra Lineal</p>
                </div>
                <div class="testimonial-rating">
                  <mat-icon *ngFor="let star of [1,2,3,4,5]">star</mat-icon>
                </div>
              </div>
              <p class="testimonial-text">
                "Aprobé mi examen de álgebra gracias a las clases. El material PDF es increíble y los ejercicios resueltos me ayudaron mucho."
              </p>
              <p class="testimonial-uni">Universidad Nacional de Ingeniería</p>
            </div>

            <div class="testimonial-card">
              <div class="testimonial-header">
                <div class="testimonial-logo">
                  <mat-icon>person</mat-icon>
                </div>
                <div class="testimonial-info">
                  <h4>María López</h4>
                  <p class="testimonial-course">Física I</p>
                </div>
                <div class="testimonial-rating">
                  <mat-icon *ngFor="let star of [1,2,3,4,5]">star</mat-icon>
                </div>
              </div>
              <p class="testimonial-text">
                "Las clases de física me ayudaron a entender temas que en la U no lograba comprender. El acceso de por vida es una gran ventaja."
              </p>
              <p class="testimonial-uni">PUCP - Ingeniería Civil</p>
            </div>

            <div class="testimonial-card">
              <div class="testimonial-header">
                <div class="testimonial-logo">
                  <mat-icon>person</mat-icon>
                </div>
                <div class="testimonial-info">
                  <h4>Carlos Ruiz</h4>
                  <p class="testimonial-course">Cálculo Diferencial</p>
                </div>
                <div class="testimonial-rating">
                  <mat-icon *ngFor="let star of [1,2,3,4,5]">star</mat-icon>
                </div>
              </div>
              <p class="testimonial-text">
                "Puedo repasar cuando quiera antes de mis exámenes. El soporte por WhatsApp es rápido y siempre resuelven mis dudas."
              </p>
              <p class="testimonial-uni">UNI - Ingeniería Mecánica</p>
            </div>
          </div>
        </div>
      </section>

      <!-- GARANTÍA -->
      <section class="guarantee-section">
        <div class="container">
          <div class="guarantee-card">
            <div class="guarantee-icon">
              <mat-icon>security</mat-icon>
            </div>
            <div class="guarantee-content">
              <h3>Tu compra está 100% protegida</h3>
              <div class="guarantee-badges">
                <div class="badge-item">
                  <mat-icon>lock</mat-icon>
                  <span>Pago Seguro SSL</span>
                </div>
                <div class="badge-item">
                  <mat-icon>email</mat-icon>
                  <span>Email Inmediato</span>
                </div>
                <div class="badge-item">
                  <mat-icon>favorite</mat-icon>
                  <span>Garantía 7 días</span>
                </div>
                <div class="badge-item">
                  <mat-icon>support</mat-icon>
                  <span>Soporte Dedicado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- PREGUNTAS FRECUENTES -->
      <section class="faq-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title text-blue">Preguntas Frecuentes</h2>
            <p class="section-subtitle">Resolvemos tus dudas</p>
          </div>
          <div class="faq-grid">
            <div class="faq-card">
              <h4>¿Cómo accedo a los cursos después de pagar?</h4>
              <p>Después de aprobar tu matrícula, recibirás un email con tus credenciales en menos de 24 horas. Podrás acceder desde cualquier dispositivo.</p>
            </div>
            <div class="faq-card">
              <h4>¿Los cursos tienen certificado?</h4>
              <p>¡Sí! Todos nuestros cursos incluyen un certificado de finalización que puedes validar y compartir en LinkedIn.</p>
            </div>
            <div class="faq-card">
              <h4>¿Puedo pagar con tarjeta de crédito?</h4>
              <p>Aceptamos Yape, BCP y transferencias bancarias. Todos los pagos son seguros y verificados.</p>
            </div>
            <div class="faq-card">
              <h4>¿Qué pasa si no estoy satisfecho?</h4>
              <p>Ofrecemos garantía de satisfacción de 7 días. Si no estás contento, te devolvemos tu dinero sin preguntas.</p>
            </div>
            <div class="faq-card">
              <h4>¿Por cuánto tiempo tengo acceso?</h4>
              <p>¡De por vida! Una vez que compras un curso, puedes acceder a él las veces que quieras, sin límites de tiempo.</p>
            </div>
            <div class="faq-card">
              <h4>¿Hay soporte si tengo dudas?</h4>
              <p>Sí, nuestro soporte está disponible 24/7 por WhatsApp. Respondemos en menos de 1 hora.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA FINAL -->
      <section class="cta-section">
        <div class="container">
          <div class="cta-card">
            <h2>Comienza tu aprendizaje hoy</h2>
            <p>Únete a miles de estudiantes que ya están mejorando sus habilidades</p>
            <div class="cta-actions">
              <a routerLink="/cursos-public" class="btn btn-yellow btn-large">
                <mat-icon>school</mat-icon>
                <span>Ver Cursos Disponibles</span>
              </a>
              <a routerLink="/authentication/login" class="btn btn-white-outline btn-large">
                <mat-icon>login</mat-icon>
                <span>Ya soy Estudiante</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="landing-footer">
        <div class="footer-top">
          <div class="container">
            <div class="footer-cta">
              <h2>¿Listo para empezar?</h2>
              <p>Únete a nuestra comunidad de estudiantes</p>
              <div class="footer-cta-actions">
                <a routerLink="/cursos-public" class="btn btn-yellow btn-large">
                  <mat-icon>school</mat-icon>
                  <span>Ver Cursos</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-main">
          <div class="container">
            <div class="footer-grid">
              <div class="footer-brand">
                <div class="brand-logo">
                  <div class="logo-icon">
                    <mat-icon>school</mat-icon>
                  </div>
                  <span class="logo-text">MIRZAKHANI</span>
                </div>
                <p class="brand-tagline">Educación de calidad al alcance de todos</p>
                <div class="social-links">
                  <a href="https://facebook.com" target="_blank" class="social-link facebook">
                    <mat-icon>facebook</mat-icon>
                  </a>
                  <a href="https://instagram.com" target="_blank" class="social-link instagram">
                    <mat-icon>favorite</mat-icon>
                  </a>
                  <a href="https://youtube.com" target="_blank" class="social-link youtube">
                    <mat-icon>play_circle</mat-icon>
                  </a>
                  <a href="https://wa.me/51965890475" target="_blank" class="social-link whatsapp">
                    <mat-icon>phone</mat-icon>
                  </a>
                </div>
              </div>

              <div class="footer-column">
                <h4>Materias</h4>
                <ul class="footer-list">
                  <li><a routerLink="/cursos-public">Matemáticas</a></li>
                  <li><a routerLink="/cursos-public">Física</a></li>
                  <li><a routerLink="/cursos-public">Química</a></li>
                  <li><a routerLink="/cursos-public">Biología</a></li>
                </ul>
              </div>

              <div class="footer-column">
                <h4>Compañía</h4>
                <ul class="footer-list">
                  <li><a routerLink="/inicio">Inicio</a></li>
                  <li><a routerLink="/cursos-public">Cursos</a></li>
                  <li><a routerLink="/authentication/login">Ingresar</a></li>
                  <li><a href="mailto:contacto@mirzakhani.com">Contacto</a></li>
                </ul>
              </div>

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

        <div class="footer-bottom">
          <div class="container">
            <div class="footer-bottom-content">
              <p class="copyright">© 2026 Academia MIRZAKHANI. Todos los derechos reservados.</p>
              
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
    /* COLORES PRINCIPALES */
    :host {
      --red: #dc3545;
      --blue: #007bff;
      --yellow: #ffc107;
      --white: #ffffff;
      --gray: #6c757d;
      --light: #f8f9fa;
    }

    /* ESTILOS GENERALES */
    .landing-page {
      font-family: 'Plus Jakarta Sans', sans-serif;
      overflow-x: hidden;
      background: var(--white);
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
      margin: 0 0 16px;
    }

    .text-red { color: var(--red); }
    .text-blue { color: var(--blue); }
    .text-yellow { color: var(--yellow); }

    .section-subtitle {
      font-size: 18px;
      color: var(--gray);
      margin: 0;
    }

    /* BOTONES */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 16px 32px;
      border-radius: 50px;
      text-decoration: none;
      font-weight: 700;
      font-size: 16px;
      transition: all 0.3s;
      cursor: pointer;
      border: none;
    }

    .btn mat-icon {
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .btn-yellow {
      background: var(--yellow);
      color: #212529;
      box-shadow: 0 4px 12px rgba(255, 193, 7, 0.3);
    }

    .btn-yellow:hover {
      background: #ffca2c;
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(255, 193, 7, 0.4);
    }

    .btn-blue {
      background: var(--blue);
      color: var(--white);
      box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
    }

    .btn-blue:hover {
      background: #0056b3;
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(0, 123, 255, 0.4);
    }

    .btn-red {
      background: var(--red);
      color: var(--white);
      box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
    }

    .btn-red:hover {
      background: #c82333;
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(220, 53, 69, 0.4);
    }

    .btn-white {
      background: var(--white);
      color: var(--blue);
      border: 2px solid var(--white);
    }

    .btn-white:hover {
      background: rgba(255, 255, 255, 0.9);
      transform: translateY(-3px);
    }

    .btn-white-outline {
      background: transparent;
      color: var(--white);
      border: 3px solid var(--white);
    }

    .btn-white-outline:hover {
      background: var(--white);
      color: var(--blue);
    }

    .btn-large {
      padding: 20px 40px;
      font-size: 18px;
    }

    .btn-small {
      padding: 10px 20px;
      font-size: 14px;
    }

    /* HERO SECTION */
    .hero {
      position: relative;
      padding: 120px 0 140px;
      overflow: hidden;
    }

    .hero-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
    }

    .hero-gradient {
      background: linear-gradient(135deg, var(--red) 0%, var(--blue) 100%);
      width: 100%;
      height: 100%;
    }

    .hero-pattern {
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
      text-align: center;
    }

    .hero-badge {
      display: inline-block;
      background: var(--yellow);
      color: #212529;
      padding: 8px 20px;
      border-radius: 50px;
      font-weight: 700;
      font-size: 14px;
      margin-bottom: 24px;
      border: 2px solid var(--white);
    }

    .hero-title {
      font-size: 64px;
      font-weight: 900;
      color: var(--white);
      margin: 0 0 24px;
      letter-spacing: -2px;
      line-height: 1.1;
    }

    .hero-subtitle {
      font-size: 20px;
      color: var(--white);
      margin: 0 0 48px;
      line-height: 1.6;
    }

    .hero-rating {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-bottom: 48px;
    }

    .stars {
      display: flex;
      gap: 4px;
    }

    .stars mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
      color: var(--yellow);
    }

    .rating-text {
      font-size: 16px;
      color: var(--white);
    }

    .rating-text strong {
      font-weight: 900;
    }

    .hero-actions {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 60px;
    }

    .hero-benefits {
      display: flex;
      justify-content: center;
      gap: 32px;
      flex-wrap: wrap;
    }

    .benefit {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--white);
      font-size: 15px;
      font-weight: 600;
    }

    .benefit mat-icon {
      font-size: 20px;
      color: var(--yellow);
    }

    /* STATS SECTION */
    .stats-section {
      padding: 80px 0;
      background: var(--light);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 32px;
    }

    .stat-card {
      background: var(--white);
      padding: 32px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      gap: 20px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
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
      color: var(--white);
    }

    .stat-red { background: var(--red); }
    .stat-blue { background: var(--blue); }
    .stat-yellow { background: var(--yellow); }

    .stat-number {
      font-size: 32px;
      font-weight: 900;
      color: #212529;
      margin: 0;
    }

    .stat-label {
      font-size: 14px;
      color: var(--gray);
      margin: 0;
    }

    /* COURSES SECTION */
    .courses-section {
      padding: 100px 0;
      background: var(--white);
    }

    .course-filters {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
      margin-bottom: 48px;
    }

    .filter-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background: var(--light);
      border: 2px solid transparent;
      border-radius: 50px;
      color: var(--gray);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .filter-btn mat-icon {
      font-size: 18px;
    }

    .filter-btn:hover {
      background: rgba(0, 123, 255, 0.1);
      border-color: var(--blue);
      color: var(--blue);
    }

    .filter-btn.active {
      background: var(--blue);
      border-color: var(--blue);
      color: var(--white);
    }

    .filter-btn.active mat-icon {
      color: var(--white);
    }

    .courses-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 32px;
      margin-bottom: 48px;
    }

    .course-card {
      background: var(--white);
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
      transition: transform 0.3s, box-shadow 0.3s;
    }

    .course-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
    }

    .course-header {
      height: 180px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .course-header mat-icon {
      font-size: 80px;
      width: 80px;
      height: 80px;
      color: var(--white);
      opacity: 0.9;
    }

    .course-badge {
      position: absolute;
      top: 16px;
      right: 16px;
      background: rgba(0, 0, 0, 0.7);
      color: var(--white);
      padding: 6px 14px;
      border-radius: 50px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .course-body {
      padding: 24px;
    }

    .course-body h3 {
      font-size: 20px;
      font-weight: 800;
      color: #212529;
      margin: 0 0 12px;
    }

    .course-body p {
      color: var(--gray);
      font-size: 14px;
      line-height: 1.6;
      margin: 0 0 20px;
    }

    .course-meta {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 6px;
      color: var(--gray);
      font-size: 13px;
    }

    .meta-item mat-icon {
      font-size: 16px;
      color: var(--blue);
    }

    .course-rating {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
    }

    .stars-small {
      display: flex;
      gap: 2px;
    }

    .stars-small mat-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: var(--yellow);
    }

    .rating-count {
      font-size: 13px;
      color: var(--gray);
    }

    .course-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 20px;
      border-top: 2px solid var(--light);
    }

    .course-price {
      font-size: 28px;
      font-weight: 900;
      color: var(--red);
    }

    /* FEATURES SECTION */
    .features-section {
      padding: 100px 0;
      background: var(--light);
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 32px;
    }

    .feature-card {
      background: var(--white);
      padding: 40px 24px;
      border-radius: 20px;
      text-align: center;
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
      color: var(--white);
    }

    .feature-red { background: var(--red); }
    .feature-blue { background: var(--blue); }
    .feature-yellow { background: var(--yellow); }

    .feature-card h3 {
      font-size: 22px;
      font-weight: 800;
      color: #212529;
      margin: 0 0 12px;
    }

    .feature-card p {
      font-size: 15px;
      color: var(--gray);
      line-height: 1.6;
      margin: 0;
    }

    /* TESTIMONIALS SECTION */
    .testimonials-section {
      padding: 100px 0;
      background: var(--white);
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 32px;
    }

    .testimonial-card {
      background: var(--white);
      padding: 32px;
      border-radius: 20px;
      border: 2px solid var(--light);
      transition: all 0.3s;
    }

    .testimonial-card:hover {
      border-color: var(--blue);
      transform: translateY(-4px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .testimonial-header {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
    }

    .testimonial-logo {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, var(--red) 0%, var(--blue) 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .testimonial-logo mat-icon {
      font-size: 30px;
      color: var(--white);
    }

    .testimonial-info {
      flex: 1;
    }

    .testimonial-info h4 {
      font-size: 18px;
      font-weight: 800;
      color: #212529;
      margin: 0 0 4px;
    }

    .testimonial-course {
      font-size: 14px;
      color: var(--gray);
      margin: 0;
    }

    .testimonial-rating {
      display: flex;
      gap: 4px;
    }

    .testimonial-rating mat-icon {
      font-size: 20px;
      color: var(--yellow);
    }

    .testimonial-text {
      font-size: 15px;
      color: #475569;
      line-height: 1.7;
      margin: 0 0 16px;
      font-style: italic;
    }

    .testimonial-uni {
      font-size: 13px;
      color: var(--blue);
      font-weight: 600;
      margin: 0;
    }

    /* GUARANTEE SECTION */
    .guarantee-section {
      padding: 80px 0;
      background: var(--light);
    }

    .guarantee-card {
      background: var(--white);
      padding: 48px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      gap: 32px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
    }

    .guarantee-icon {
      width: 100px;
      height: 100px;
      background: var(--blue);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .guarantee-icon mat-icon {
      font-size: 50px;
      color: var(--white);
    }

    .guarantee-content h3 {
      font-size: 28px;
      font-weight: 900;
      color: #212529;
      margin: 0 0 24px;
    }

    .guarantee-badges {
      display: flex;
      gap: 32px;
      flex-wrap: wrap;
    }

    .badge-item {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--gray);
      font-size: 15px;
    }

    .badge-item mat-icon {
      color: var(--blue);
      font-size: 20px;
    }

    /* FAQ SECTION */
    .faq-section {
      padding: 100px 0;
      background: var(--white);
    }

    .faq-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 24px;
    }

    .faq-card {
      background: var(--light);
      padding: 32px;
      border-radius: 16px;
      border-left: 4px solid var(--blue);
    }

    .faq-card h4 {
      font-size: 18px;
      font-weight: 800;
      color: #212529;
      margin: 0 0 12px;
    }

    .faq-card p {
      font-size: 15px;
      color: var(--gray);
      line-height: 1.6;
      margin: 0;
    }

    /* CTA SECTION */
    .cta-section {
      padding: 100px 0;
      background: linear-gradient(135deg, var(--blue) 0%, var(--red) 100%);
    }

    .cta-card {
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
    }

    .cta-card h2 {
      font-size: 42px;
      font-weight: 900;
      color: var(--white);
      margin: 0 0 16px;
    }

    .cta-card p {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.95);
      margin: 0 0 40px;
    }

    .cta-actions {
      display: flex;
      gap: 20px;
      justify-content: center;
      flex-wrap: wrap;
    }

    /* FOOTER */
    .landing-footer {
      background: var(--light);
      color: #212529;
    }

    .footer-top {
      background: var(--blue);
      padding: 80px 0;
    }

    .footer-cta {
      text-align: center;
    }

    .footer-cta h2 {
      font-size: 42px;
      font-weight: 900;
      color: var(--white);
      margin: 0 0 16px;
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
    }

    .footer-main {
      padding: 80px 0 60px;
      background: var(--white);
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
      background: var(--red);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-icon mat-icon {
      font-size: 28px;
      color: var(--white);
    }

    .logo-text {
      font-size: 26px;
      font-weight: 900;
      color: var(--blue);
    }

    .brand-tagline {
      font-size: 15px;
      color: var(--gray);
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
      border: 2px solid var(--light);
    }

    .social-link mat-icon {
      font-size: 22px;
      transition: color 0.3s;
    }

    .social-link.facebook { background: #f0f2f5; }
    .social-link.facebook:hover { background: #1877f2; }
    .social-link.facebook:hover mat-icon { color: var(--white); }
    .social-link.facebook mat-icon { color: #1877f2; }

    .social-link.instagram { background: #f0f2f5; }
    .social-link.instagram:hover { background: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }
    .social-link.instagram:hover mat-icon { color: var(--white); }
    .social-link.instagram mat-icon { color: #dc2743; }

    .social-link.youtube { background: #f0f2f5; }
    .social-link.youtube:hover { background: #ff0000; }
    .social-link.youtube:hover mat-icon { color: var(--white); }
    .social-link.youtube mat-icon { color: #ff0000; }

    .social-link.whatsapp { background: #f0f2f5; }
    .social-link.whatsapp:hover { background: #25D366; }
    .social-link.whatsapp:hover mat-icon { color: var(--white); }
    .social-link.whatsapp mat-icon { color: #25D366; }

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
      color: var(--gray);
      text-decoration: none;
      font-size: 15px;
      transition: all 0.3s;
    }

    .footer-list a:hover {
      color: var(--blue);
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
      color: var(--gray);
      font-size: 15px;
    }

    .contact-row mat-icon {
      color: var(--blue);
      font-size: 20px;
    }

    .contact-row a {
      color: var(--gray);
      text-decoration: none;
      transition: color 0.3s;
    }

    .contact-row a:hover {
      color: var(--blue);
    }

    .payment-info {
      padding-top: 24px;
      border-top: 1px solid var(--light);
    }

    .payment-title {
      display: block;
      font-size: 13px;
      color: var(--gray);
      margin-bottom: 12px;
      text-transform: uppercase;
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
    }

    .payment-icon-yape {
      background: linear-gradient(135deg, #742194, #9333ea);
      color: var(--white);
    }

    .payment-icon-bcp {
      background: linear-gradient(135deg, #00A9E0, #0288d1);
      color: var(--white);
    }

    .footer-bottom {
      background: var(--light);
      padding: 40px 0;
      border-top: 1px solid #e9ecef;
    }

    .footer-bottom-content {
      text-align: center;
    }

    .copyright {
      color: var(--gray);
      font-size: 14px;
      margin: 0 0 24px;
    }

    .developer-badge {
      display: inline-block;
      background: var(--white);
      padding: 24px 32px;
      border-radius: 16px;
      border: 2px solid #e9ecef;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .dev-info {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 12px;
    }

    .dev-label {
      font-size: 14px;
      color: var(--gray);
    }

    .dev-name {
      font-size: 18px;
      color: var(--blue);
      font-weight: 900;
    }

    .dev-contact {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: var(--yellow);
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      padding: 8px 16px;
      background: rgba(255, 193, 7, 0.1);
      border-radius: 8px;
      margin-bottom: 12px;
    }

    .dev-contact mat-icon {
      font-size: 18px;
    }

    .dev-tagline {
      font-size: 13px;
      color: var(--gray);
      margin: 0;
      font-style: italic;
    }

    /* RESPONSIVE */
    @media (max-width: 1024px) {
      .footer-grid {
        grid-template-columns: 1fr 1fr;
        gap: 40px;
      }
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 36px;
      }

      .hero-subtitle {
        font-size: 16px;
      }

      .hero-actions,
      .hero-benefits {
        flex-direction: column;
        align-items: center;
      }

      .section-title {
        font-size: 32px;
      }

      .footer-grid {
        grid-template-columns: 1fr;
        gap: 32px;
      }

      .stats-grid,
      .features-grid,
      .testimonials-grid,
      .faq-grid {
        grid-template-columns: 1fr;
      }

      .guarantee-card {
        flex-direction: column;
        text-align: center;
      }

      .guarantee-badges {
        justify-content: center;
      }

      .footer-cta-actions,
      .cta-actions {
        flex-direction: column;
        align-items: center;
      }

      .btn-large {
        width: 100%;
        max-width: 300px;
        justify-content: center;
      }
    }

    /* LOADING & EMPTY STATES */
    .loading-state, .empty-state {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 80px 20px;
      text-align: center;
    }

    .loading-state mat-icon {
      font-size: 48px;
      color: var(--blue);
      animation: spin 1s linear infinite;
    }

    .empty-state mat-icon {
      font-size: 64px;
      color: #cbd5e1;
      margin-bottom: 16px;
    }

    .loading-state p, .empty-state p {
      color: var(--gray);
      margin: 16px 0 0;
      font-size: 16px;
    }

    .empty-state h3 {
      font-size: 22px;
      font-weight: 800;
      color: #212529;
      margin: 0 0 8px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .text-center {
      text-align: center;
    }
  `]
})
export class InicioComponent implements OnInit {
  cursos: any[] = [];
  cursosFiltrados: any[] = [];
  filtroActual: string = 'todos';
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

    this.cursosFiltrados = this.cursos;
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
      'Matemáticas': 'linear-gradient(135deg, #dc3545 0%, #ff4757 100%)',
      'Física': 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
      'Química': 'linear-gradient(135deg, #ffc107 0%, #ffca2c 100%)',
      'Biología': 'linear-gradient(135deg, #28a745 0%, #218838 100%)',
      'Letras': 'linear-gradient(135deg, #6f42c1 0%, #5930a8 100%)'
    };
    return gradientes[categoria] || 'linear-gradient(135deg, #dc3545 0%, #ff4757 100%)';
  }

  ngOnChanges(): void {
    this.aplicarFiltro();
  }

  aplicarFiltro(): void {
    if (this.filtroActual === 'todos') {
      this.cursosFiltrados = this.cursos;
    } else {
      this.cursosFiltrados = this.cursos.filter(curso => curso.categoria === this.filtroActual);
    }
  }
}
