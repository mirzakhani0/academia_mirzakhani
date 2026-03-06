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
          <div class="hero-pattern"></div>
        </div>
        <div class="container hero-content">
          <span class="hero-badge">🎓 ESPECIALISTAS EN MEDICINA E INGENIERÍA CIVIL</span>
          <h1 class="hero-title">
            Tu Camino a la <span class="text-gradient">Medicina Humana</span> e <span class="text-gradient-blue">Ingeniería Civil</span> Comienza Aquí
          </h1>
          <p class="hero-subtitle">
            Preparación preuniversitaria y universitaria desde nivel básico hasta avanzado. 
            Clases grabadas, material PDF, ejercicios resueltos y simulacros de examen de admisión.
          </p>
          
          <div class="hero-rating">
            <div class="stars">
              <mat-icon *ngFor="let star of [1,2,3,4,5]">star</mat-icon>
            </div>
            <span class="rating-text"><strong>4.9/5</strong> basado en 500+ estudiantes aprobados</span>
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
              <span>Desde básico hasta avanzado</span>
            </div>
            <div class="benefit">
              <mat-icon>check_circle</mat-icon>
              <span>Simulacros de admisión</span>
            </div>
            <div class="benefit">
              <mat-icon>check_circle</mat-icon>
              <span>Profesores expertos</span>
            </div>
            <div class="benefit">
              <mat-icon>check_circle</mat-icon>
              <span>Garantía de ingreso</span>
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
              <div class="stat-icon stat-green">
                <mat-icon>trending_up</mat-icon>
              </div>
              <div class="stat-content">
                <h3 class="stat-number">92%</h3>
                <p class="stat-label">Ingresan a la Universidad</p>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon stat-red">
                <mat-icon>emoji_events</mat-icon>
              </div>
              <div class="stat-content">
                <h3 class="stat-number">15+</h3>
                <p class="stat-label">Años de Experiencia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- NIVELES DE ESTUDIO -->
      <section class="levels-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title text-red">Elige tu Nivel</h2>
            <p class="section-subtitle">Dos programas especializados para tu éxito académico</p>
          </div>
          
          <div class="levels-grid">
            <!-- Nivel Universitario -->
            <div class="level-card level-universitario">
              <div class="level-header">
                <div class="level-icon">
                  <mat-icon>graduation_cap</mat-icon>
                </div>
                <h3>Nivel Universitario</h3>
                <p class="level-subtitle">Carreras especializadas</p>
              </div>
              <div class="level-careers">
                <div class="career-item medicina">
                  <div class="career-icon">
                    <mat-icon>favorite</mat-icon>
                  </div>
                  <div class="career-info">
                    <h4>Medicina Humana</h4>
                    <p>Cursos especializados para estudiantes de medicina</p>
                    <ul class="career-courses">
                      <li><mat-icon>check</mat-icon>Anatomía Humana</li>
                      <li><mat-icon>check</mat-icon>Biología Celular</li>
                      <li><mat-icon>check</mat-icon>Química Orgánica</li>
                      <li><mat-icon>check</mat-icon>Fisiología</li>
                    </ul>
                  </div>
                </div>
                <div class="career-item ingenieria">
                  <div class="career-icon">
                    <mat-icon>engineering</mat-icon>
                  </div>
                  <div class="career-info">
                    <h4>Ingeniería Civil</h4>
                    <p>Cursos especializados para ingenieros civiles</p>
                    <ul class="career-courses">
                      <li><mat-icon>check</mat-icon>Cálculo Avanzado</li>
                      <li><mat-icon>check</mat-icon>Física Mecánica</li>
                      <li><mat-icon>check</mat-icon>Álgebra Lineal</li>
                      <li><mat-icon>check</mat-icon>Estática</li>
                    </ul>
                  </div>
                </div>
              </div>
              <a routerLink="/cursos-public" class="btn btn-blue btn-large">
                <span>Ver Cursos Universitarios</span>
              </a>
            </div>

            <!-- Nivel Preuniversitario -->
            <div class="level-card level-pre">
              <div class="level-header">
                <div class="level-icon">
                  <mat-icon>menu_book</mat-icon>
                </div>
                <h3>Nivel Preuniversitario</h3>
                <p class="level-subtitle">Preparación integral para el examen de admisión</p>
              </div>
              <div class="pre-subjects">
                <div class="subject-group">
                  <h4>🔬 Ciencias</h4>
                  <div class="subject-tags">
                    <span class="subject-tag">Biología</span>
                    <span class="subject-tag">Anatomía</span>
                    <span class="subject-tag">Física</span>
                    <span class="subject-tag">Química</span>
                    <span class="subject-tag">Psicología</span>
                  </div>
                </div>
                <div class="subject-group">
                  <h4>📚 Humanidades</h4>
                  <div class="subject-tags">
                    <span class="subject-tag">Filosofía</span>
                    <span class="subject-tag">Geografía</span>
                    <span class="subject-tag">Historia</span>
                    <span class="subject-tag">Educación Cívica</span>
                    <span class="subject-tag">Economía</span>
                    <span class="subject-tag">Comunicación</span>
                    <span class="subject-tag">Literatura</span>
                    <span class="subject-tag">Inglés</span>
                  </div>
                </div>
                <div class="subject-group">
                  <h4>📐 Matemáticas</h4>
                  <div class="subject-tags">
                    <span class="subject-tag">Aritmética</span>
                    <span class="subject-tag">Álgebra</span>
                    <span class="subject-tag">Geometría</span>
                    <span class="subject-tag">Trigonometría</span>
                    <span class="subject-tag">Razonamiento Verbal</span>
                    <span class="subject-tag">Razonamiento Matemático</span>
                  </div>
                </div>
              </div>
              <a routerLink="/cursos-public" class="btn btn-green btn-large">
                <span>Ver Cursos Preuniversitarios</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <!-- CURSOS DESTACADOS -->
      <section class="courses-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title text-blue">Cursos Más Populares</h2>
            <p class="section-subtitle">Los favoritos de nuestros estudiantes</p>
          </div>
          
          <div class="courses-grid">
            <div class="course-card">
              <div class="course-header course-medicina">
                <mat-icon>biotech</mat-icon>
                <span class="course-badge">Medicina</span>
              </div>
              <div class="course-body">
                <h3>Anatomía Humana Completa</h3>
                <p>Sistemas, aparatos y estructuras del cuerpo humano. Ideal para postulantes a medicina.</p>
                <div class="course-meta">
                  <div class="meta-item">
                    <mat-icon>play_circle</mat-icon>
                    <span>30 clases</span>
                  </div>
                  <div class="meta-item">
                    <mat-icon>description</mat-icon>
                    <span>12 PDFs</span>
                  </div>
                </div>
                <div class="course-level">
                  <span class="level-badge level-basico">Básico</span>
                  <span class="level-badge level-intermedio">Intermedio</span>
                  <span class="level-badge level-avanzado">Avanzado</span>
                </div>
                <div class="course-footer">
                  <div class="course-price">S/ 55</div>
                  <a routerLink="/cursos-public" class="btn btn-blue btn-small">
                    <mat-icon>visibility</mat-icon>
                    <span>Ver Más</span>
                  </a>
                </div>
              </div>
            </div>

            <div class="course-card">
              <div class="course-header course-ingenieria">
                <mat-icon>functions</mat-icon>
                <span class="course-badge">Ingeniería</span>
              </div>
              <div class="course-body">
                <h3>Cálculo Diferencial e Integral</h3>
                <p>Límites, derivadas, integrales y aplicaciones. Esencial para ingeniería civil.</p>
                <div class="course-meta">
                  <div class="meta-item">
                    <mat-icon>play_circle</mat-icon>
                    <span>35 clases</span>
                  </div>
                  <div class="meta-item">
                    <mat-icon>description</mat-icon>
                    <span>15 PDFs</span>
                  </div>
                </div>
                <div class="course-level">
                  <span class="level-badge level-basico">Básico</span>
                  <span class="level-badge level-intermedio">Intermedio</span>
                  <span class="level-badge level-avanzado">Avanzado</span>
                </div>
                <div class="course-footer">
                  <div class="course-price">S/ 60</div>
                  <a routerLink="/cursos-public" class="btn btn-blue btn-small">
                    <mat-icon>visibility</mat-icon>
                    <span>Ver Más</span>
                  </a>
                </div>
              </div>
            </div>

            <div class="course-card">
              <div class="course-header course-pre">
                <mat-icon>quiz</mat-icon>
                <span class="course-badge">Preuniversitario</span>
              </div>
              <div class="course-body">
                <h3>Razonamiento Matemático Intensivo</h3>
                <p>Problemas tipo examen de admisión. Técnicas y trucos resolutivos.</p>
                <div class="course-meta">
                  <div class="meta-item">
                    <mat-icon>play_circle</mat-icon>
                    <span>25 clases</span>
                  </div>
                  <div class="meta-item">
                    <mat-icon>description</mat-icon>
                    <span>20 PDFs</span>
                  </div>
                </div>
                <div class="course-level">
                  <span class="level-badge level-basico">Básico</span>
                  <span class="level-badge level-avanzado">Avanzado</span>
                </div>
                <div class="course-footer">
                  <div class="course-price">S/ 40</div>
                  <a routerLink="/cursos-public" class="btn btn-blue btn-small">
                    <mat-icon>visibility</mat-icon>
                    <span>Ver Más</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div class="text-center">
            <a routerLink="/cursos-public" class="btn btn-red btn-large">
              <mat-icon>school</mat-icon>
              <span>Ver Todos los Cursos</span>
            </a>
          </div>
        </div>
      </section>

      <!-- METODOLOGÍA -->
      <section class="methodology-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title text-red">Nuestra Metodología</h2>
            <p class="section-subtitle">Así garantizamos tu ingreso a la universidad</p>
          </div>
          
          <div class="methodology-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h3>Evaluación Inicial</h3>
                <p>Identificamos tu nivel actual y las áreas que necesitas reforzar.</p>
              </div>
            </div>
            <div class="step-connector"></div>
            
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h3>Plan Personalizado</h3>
                <p>Diseñamos una ruta de aprendizaje desde lo básico hasta lo avanzado.</p>
              </div>
            </div>
            <div class="step-connector"></div>
            
            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h3>Clases y Práctica</h3>
                <p>Accede a clases grabadas, material PDF y ejercicios resueltos.</p>
              </div>
            </div>
            <div class="step-connector"></div>
            
            <div class="step">
              <div class="step-number">4</div>
              <div class="step-content">
                <h3>Simulacros</h3>
                <p>Evaluaciones tipo examen de admisión para medir tu progreso.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- TESTIMONIOS -->
      <section class="testimonials-section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title text-blue">Historias de Éxito</h2>
            <p class="section-subtitle">Estudiantes que lograron ingresar a la universidad</p>
          </div>
          
          <div class="testimonials-grid">
            <div class="testimonial-card">
              <div class="testimonial-header">
                <div class="testimonial-logo medicina">
                  <mat-icon>favorite</mat-icon>
                </div>
                <div class="testimonial-info">
                  <h4>María González</h4>
                  <p class="testimonial-uni">Ingresó a Medicina Humana - UNMSM</p>
                </div>
              </div>
              <p class="testimonial-text">
                "Empecé desde cero en biología y anatomía. Los cursos van desde lo básico hasta lo avanzado. ¡Logré ingresar a mi primera opción!"
              </p>
              <div class="testimonial-courses">
                <span class="course-tag">Anatomía</span>
                <span class="course-tag">Biología</span>
              </div>
            </div>

            <div class="testimonial-card">
              <div class="testimonial-header">
                <div class="testimonial-logo ingenieria">
                  <mat-icon>engineering</mat-icon>
                </div>
                <div class="testimonial-info">
                  <h4>Carlos Ramírez</h4>
                  <p class="testimonial-uni">Ingresó a Ingeniería Civil - PUCP</p>
                </div>
              </div>
              <p class="testimonial-text">
                "El curso de cálculo es increíble. Explican desde lo más básico hasta problemas complejos. Los simulacros me ayudaron mucho."
              </p>
              <div class="testimonial-courses">
                <span class="course-tag">Cálculo</span>
                <span class="course-tag">Álgebra</span>
              </div>
            </div>

            <div class="testimonial-card">
              <div class="testimonial-header">
                <div class="testimonial-logo pre">
                  <mat-icon>menu_book</mat-icon>
                </div>
                <div class="testimonial-info">
                  <h4>Ana Torres</h4>
                  <p class="testimonial-uni">Ingresó a Medicina - UNI</p>
                </div>
              </div>
              <p class="testimonial-text">
                "El preuniversitario me dio las bases que necesitaba. Los profesores explican súper bien y el material es completo."
              </p>
              <div class="testimonial-courses">
                <span class="course-tag">Química</span>
                <span class="course-tag">Física</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- GARANTÍA -->
      <section class="guarantee-section">
        <div class="container">
          <div class="guarantee-card">
            <div class="guarantee-icon">
              <mat-icon>verified</mat-icon>
            </div>
            <div class="guarantee-content">
              <h3>Garantía de Satisfacción</h3>
              <p>Si no estás satisfecho con tu primer curso, te devolvemos tu dinero en los primeros 7 días. Sin preguntas.</p>
              <div class="guarantee-badges">
                <div class="badge-item">
                  <mat-icon>security</mat-icon>
                  <span>Pago 100% Seguro</span>
                </div>
                <div class="badge-item">
                  <mat-icon>access_time</mat-icon>
                  <span>Acceso Inmediato</span>
                </div>
                <div class="badge-item">
                  <mat-icon>support_agent</mat-icon>
                  <span>Soporte 24/7</span>
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
            <h2 class="section-title text-red">Preguntas Frecuentes</h2>
            <p class="section-subtitle">Resolvemos tus dudas sobre la preparación</p>
          </div>
          <div class="faq-grid">
            <div class="faq-card">
              <h4>¿Los cursos son desde nivel básico?</h4>
              <p>¡Sí! Todos nuestros cursos están diseñados para llevarte desde el nivel más básico hasta el nivel avanzado necesario para ingresar a la universidad.</p>
            </div>
            <div class="faq-card">
              <h4>¿Qué incluye cada curso?</h4>
              <p>Cada curso incluye clases grabadas en HD, material PDF descargable, ejercicios resueltos, ejercicios propuestos y acceso a simulacros.</p>
            </div>
            <div class="faq-card">
              <h4>¿Cuánto tiempo tengo acceso?</h4>
              <p>Tienes acceso de por vida. Puedes repasar las clases las veces que necesites, incluso después de ingresar a la universidad.</p>
            </div>
            <div class="faq-card">
              <h4>¿Los cursos son específicos para mi universidad?</h4>
              <p>Nuestros cursos cubren el contenido necesario para todas las universidades del país. Incluye ejercicios tipo ADMISIÓN, UNI, PUCP, etc.</p>
            </div>
            <div class="faq-card">
              <h4>¿Puedo pagar en cuotas?</h4>
              <p>Aceptamos Yape, BCP y transferencias bancarias. Cada curso es un pago único sin mensualidades.</p>
            </div>
            <div class="faq-card">
              <h4>¿Hay soporte si tengo dudas?</h4>
              <p>Sí, nuestro equipo de profesores está disponible por WhatsApp para resolver tus dudas de cada curso.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="landing-footer">
        <div class="footer-top">
          <div class="container">
            <div class="footer-cta">
              <h2>¿Listo para empezar tu preparación?</h2>
              <p>Únete a los más de 1000 estudiantes que ya están preparándose para ingresar a Medicina o Ingeniería Civil</p>
              <div class="footer-cta-actions">
                <a routerLink="/cursos-public" class="btn btn-yellow btn-large">
                  <mat-icon>school</mat-icon>
                  <span>Ver Cursos Disponibles</span>
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
                <p class="brand-tagline">Especialistas en Medicina Humana e Ingeniería Civil</p>
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
                <h4>Medicina Humana</h4>
                <ul class="footer-list">
                  <li><a routerLink="/cursos-public">Anatomía</a></li>
                  <li><a routerLink="/cursos-public">Biología Celular</a></li>
                  <li><a routerLink="/cursos-public">Química Orgánica</a></li>
                  <li><a routerLink="/cursos-public">Fisiología</a></li>
                </ul>
              </div>

              <div class="footer-column">
                <h4>Ingeniería Civil</h4>
                <ul class="footer-list">
                  <li><a routerLink="/cursos-public">Cálculo</a></li>
                  <li><a routerLink="/cursos-public">Álgebra</a></li>
                  <li><a routerLink="/cursos-public">Física</a></li>
                  <li><a routerLink="/cursos-public">Estática</a></li>
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
                  <span class="payment-title">Métodos de pago:</span>
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
              <p class="developer-credit">Desarrollado por <strong class="dev-name">CARLOS</strong> - <a href="mailto:llanovilca79@gmail.com" class="dev-email">llanovilca79@gmail.com</a></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    /* COLORES PRINCIPALES */
    :host {
      --red: #dc2626;
      --blue: #2563eb;
      --yellow: #fbbf24;
      --green: #059669;
      --white: #ffffff;
      --gray: #6b7280;
      --light: #f3f4f6;
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
    .text-green { color: var(--green); }

    .text-gradient {
      background: linear-gradient(135deg, var(--red) 0%, #ef4444 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .text-gradient-blue {
      background: linear-gradient(135deg, var(--blue) 0%, #3b82f6 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

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
      font-size: 22px;
      width: 22px;
      height: 22px;
    }

    .btn-yellow {
      background: var(--yellow);
      color: #1f2937;
      box-shadow: 0 4px 12px rgba(251, 191, 36, 0.3);
    }

    .btn-yellow:hover {
      background: #f59e0b;
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(251, 191, 36, 0.4);
    }

    .btn-blue {
      background: var(--blue);
      color: var(--white);
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    }

    .btn-blue:hover {
      background: #1d4ed8;
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(37, 99, 235, 0.4);
    }

    .btn-red {
      background: var(--red);
      color: var(--white);
      box-shadow: 0 4px 12px rgba(220, 38, 38, 0.3);
    }

    .btn-red:hover {
      background: #b91c1c;
      transform: translateY(-3px);
      box-shadow: 0 8px 20px rgba(220, 38, 38, 0.4);
    }

    .btn-green {
      background: var(--green);
      color: var(--white);
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
      background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
    }

    .hero-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
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
      color: #1f2937;
      padding: 8px 20px;
      border-radius: 50px;
      font-weight: 700;
      font-size: 14px;
      margin-bottom: 24px;
      border: 2px solid var(--white);
    }

    .hero-title {
      font-size: 56px;
      font-weight: 900;
      color: var(--white);
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
      font-size: 28px;
      width: 28px;
      height: 28px;
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
      font-size: 24px;
      width: 24px;
      height: 24px;
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
      width: 64px;
      height: 64px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .stat-icon mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: var(--white);
    }

    .stat-red { background: var(--red); }
    .stat-blue { background: var(--blue); }
    .stat-green { background: var(--green); }

    .stat-number {
      font-size: 32px;
      font-weight: 900;
      color: #1f2937;
      margin: 0;
    }

    .stat-label {
      font-size: 14px;
      color: var(--gray);
      margin: 0;
    }

    /* LEVELS SECTION */
    .levels-section {
      padding: 100px 0;
      background: var(--white);
    }

    .levels-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
      gap: 40px;
    }

    .level-card {
      background: var(--white);
      padding: 40px 32px;
      border-radius: 20px;
      border: 2px solid var(--light);
      transition: all 0.3s;
    }

    .level-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
    }

    .level-universitario:hover {
      border-color: var(--blue);
    }

    .level-pre:hover {
      border-color: var(--green);
    }

    .level-header {
      text-align: center;
      margin-bottom: 32px;
    }

    .level-icon {
      width: 80px;
      height: 80px;
      margin: 0 auto 16px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .level-icon mat-icon {
      font-size: 40px;
      width: 40px;
      height: 40px;
      color: var(--white);
    }

    .level-universitario .level-icon {
      background: linear-gradient(135deg, var(--blue) 0%, #3b82f6 100%);
    }

    .level-pre .level-icon {
      background: linear-gradient(135deg, var(--green) 0%, #10b981 100%);
    }

    .level-header h3 {
      font-size: 28px;
      font-weight: 900;
      color: #1f2937;
      margin: 0 0 8px;
    }

    .level-subtitle {
      font-size: 15px;
      color: var(--gray);
      margin: 0;
    }

    .level-careers {
      margin-bottom: 32px;
    }

    .career-item {
      display: flex;
      gap: 16px;
      padding: 20px;
      background: var(--light);
      border-radius: 16px;
      margin-bottom: 16px;
      border-left: 4px solid var(--blue);
    }

    .career-item.ingenieria {
      border-left-color: var(--blue);
    }

    .career-item.medicina {
      border-left-color: var(--red);
    }

    .career-icon {
      width: 56px;
      height: 56px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .career-icon mat-icon {
      font-size: 28px;
      color: var(--white);
    }

    .medicina .career-icon {
      background: linear-gradient(135deg, var(--red) 0%, #ef4444 100%);
    }

    .ingenieria .career-icon {
      background: linear-gradient(135deg, var(--blue) 0%, #3b82f6 100%);
    }

    .career-info h4 {
      font-size: 20px;
      font-weight: 800;
      color: #1f2937;
      margin: 0 0 8px;
    }

    .career-info p {
      font-size: 14px;
      color: var(--gray);
      margin: 0 0 16px;
    }

    .career-courses {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .career-courses li {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      color: #374151;
      margin-bottom: 6px;
    }

    .career-courses li mat-icon {
      color: var(--green);
      font-size: 18px;
    }

    .pre-subjects {
      margin-bottom: 32px;
    }

    .subject-group {
      margin-bottom: 24px;
    }

    .subject-group h4 {
      font-size: 16px;
      font-weight: 800;
      color: #1f2937;
      margin: 0 0 12px;
    }

    .subject-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .subject-tag {
      padding: 6px 14px;
      background: var(--light);
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      color: #374151;
    }

    /* COURSES SECTION */
    .courses-section {
      padding: 100px 0;
      background: var(--light);
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
      font-size: 72px;
      width: 72px;
      height: 72px;
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

    .course-medicina {
      background: linear-gradient(135deg, var(--red) 0%, #ef4444 100%);
    }

    .course-ingenieria {
      background: linear-gradient(135deg, var(--blue) 0%, #3b82f6 100%);
    }

    .course-pre {
      background: linear-gradient(135deg, var(--green) 0%, #10b981 100%);
    }

    .course-body {
      padding: 24px;
    }

    .course-body h3 {
      font-size: 20px;
      font-weight: 800;
      color: #1f2937;
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
      font-size: 18px;
      width: 18px;
      height: 18px;
      color: var(--blue);
    }

    .course-level {
      display: flex;
      gap: 8px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }

    .level-badge {
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
    }

    .level-basico {
      background: #dbeafe;
      color: #1d4ed8;
    }

    .level-intermedio {
      background: #fef3c7;
      color: #d97706;
    }

    .level-avanzado {
      background: #dcfce7;
      color: #059669;
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

    /* METHODOLOGY SECTION */
    .methodology-section {
      padding: 100px 0;
      background: var(--white);
    }

    .methodology-steps {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 24px;
    }

    .step {
      flex: 1;
      min-width: 200px;
      text-align: center;
    }

    .step-number {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, var(--red) 0%, #ef4444 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 16px;
      font-size: 28px;
      font-weight: 900;
      color: var(--white);
    }

    .step-content h3 {
      font-size: 18px;
      font-weight: 800;
      color: #1f2937;
      margin: 0 0 8px;
    }

    .step-content p {
      font-size: 14px;
      color: var(--gray);
      margin: 0;
    }

    .step-connector {
      width: 60px;
      height: 2px;
      background: linear-gradient(90deg, var(--red) 0%, var(--blue) 100%);
      display: none;
    }

    @media (min-width: 768px) {
      .step-connector {
        display: block;
      }
    }

    /* TESTIMONIALS SECTION */
    .testimonials-section {
      padding: 100px 0;
      background: var(--light);
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
      width: 64px;
      height: 64px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .testimonial-logo mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: var(--white);
    }

    .testimonial-logo.medicina {
      background: linear-gradient(135deg, var(--red) 0%, #ef4444 100%);
    }

    .testimonial-logo.ingenieria {
      background: linear-gradient(135deg, var(--blue) 0%, #3b82f6 100%);
    }

    .testimonial-logo.pre {
      background: linear-gradient(135deg, var(--green) 0%, #10b981 100%);
    }

    .testimonial-info {
      flex: 1;
    }

    .testimonial-info h4 {
      font-size: 18px;
      font-weight: 800;
      color: #1f2937;
      margin: 0 0 4px;
    }

    .testimonial-uni {
      font-size: 13px;
      color: var(--blue);
      font-weight: 600;
      margin: 0;
    }

    .testimonial-text {
      font-size: 15px;
      color: #374151;
      line-height: 1.7;
      margin: 0 0 16px;
      font-style: italic;
    }

    .testimonial-courses {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .course-tag {
      padding: 4px 12px;
      background: var(--light);
      border-radius: 20px;
      font-size: 12px;
      color: #374151;
      font-weight: 600;
    }

    /* GUARANTEE SECTION */
    .guarantee-section {
      padding: 80px 0;
      background: var(--white);
    }

    .guarantee-card {
      background: linear-gradient(135deg, var(--blue) 0%, #3b82f6 100%);
      padding: 48px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      gap: 32px;
      box-shadow: 0 20px 60px rgba(37, 99, 235, 0.2);
    }

    .guarantee-icon {
      width: 100px;
      height: 100px;
      background: var(--white);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .guarantee-icon mat-icon {
      font-size: 56px;
      width: 56px;
      height: 56px;
      color: var(--blue);
    }

    .guarantee-content {
      flex: 1;
    }

    .guarantee-content h3 {
      font-size: 32px;
      font-weight: 900;
      color: var(--white);
      margin: 0 0 16px;
    }

    .guarantee-content p {
      font-size: 16px;
      color: rgba(255, 255, 255, 0.95);
      margin: 0 0 32px;
      line-height: 1.6;
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
      color: var(--white);
      font-size: 15px;
      font-weight: 600;
    }

    .badge-item mat-icon {
      color: var(--yellow);
      font-size: 26px;
      width: 26px;
      height: 26px;
    }

    /* FAQ SECTION */
    .faq-section {
      padding: 100px 0;
      background: var(--light);
    }

    .faq-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 24px;
    }

    .faq-card {
      background: var(--white);
      padding: 32px;
      border-radius: 16px;
      border-left: 4px solid var(--blue);
    }

    .faq-card h4 {
      font-size: 18px;
      font-weight: 800;
      color: #1f2937;
      margin: 0 0 12px;
    }

    .faq-card p {
      font-size: 15px;
      color: var(--gray);
      line-height: 1.6;
      margin: 0;
    }

    /* FOOTER */
    .landing-footer {
      background: var(--white);
      color: #1f2937;
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
      width: 56px;
      height: 56px;
      background: var(--red);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .logo-icon mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
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
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
      border: 2px solid var(--light);
    }

    .social-link mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
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
      color: #1f2937;
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
      font-size: 22px;
      width: 22px;
      height: 22px;
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
      border-top: 1px solid #e5e7eb;
    }

    .footer-bottom-content {
      text-align: center;
    }

    .copyright {
      color: var(--gray);
      font-size: 14px;
      margin: 0 0 12px;
    }

    .developer-credit {
      color: var(--gray);
      font-size: 13px;
      margin: 0;
    }

    .dev-name {
      color: var(--blue);
      font-weight: 900;
    }

    .dev-email {
      color: var(--yellow);
      text-decoration: none;
      font-weight: 600;
    }

    .dev-email:hover {
      text-decoration: underline;
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

      .levels-grid {
        grid-template-columns: 1fr;
      }

      .stats-grid,
      .courses-grid,
      .testimonials-grid,
      .faq-grid {
        grid-template-columns: 1fr;
      }

      .methodology-steps {
        flex-direction: column;
      }

      .step-connector {
        display: none;
      }

      .guarantee-card {
        flex-direction: column;
        text-align: center;
      }

      .guarantee-badges {
        justify-content: center;
      }

      .footer-cta-actions {
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
      color: #9ca3af;
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
      color: #1f2937;
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
    if (categoria.includes('Medicina') || categoria.includes('Anatomía') || categoria.includes('Biología')) {
      return 'biotech';
    } else if (categoria.includes('Ingeniería') || categoria.includes('Cálculo') || categoria.includes('Matemáticas')) {
      return 'functions';
    }
    return 'school';
  }

  getGradientePorCategoria(categoria: string): string {
    if (categoria.includes('Medicina') || categoria.includes('Anatomía') || categoria.includes('Biología')) {
      return 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)';
    } else if (categoria.includes('Ingeniería') || categoria.includes('Cálculo') || categoria.includes('Matemáticas')) {
      return 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)';
    }
    return 'linear-gradient(135deg, #059669 0%, #10b981 100%)';
  }
}
