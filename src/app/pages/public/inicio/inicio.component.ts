import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatButtonModule, MatCardModule, CommonModule],
  template: `
    <div class="landing-page">
      <!-- Hero Section -->
      <section class="hero-section">
        <div class="hero-content">
          <span class="hero-badge">🎓 Educación de Excelencia</span>
          <h1 class="hero-title">Academia <span class="text-gradient">MIRZAKHANI</span></h1>
          <p class="hero-subtitle">
            Potencia tu aprendizaje con cursos diseñados por expertos. 
            Accede a clases grabadas, material PDF y ejercicios resueltos.
          </p>
          <div class="hero-actions">
            <a routerLink="/cursos-public" class="btn-primary">
              <mat-icon>school</mat-icon>
              <span>Ver Cursos Disponibles</span>
            </a>
            <a routerLink="/authentication/login" class="btn-secondary">
              <mat-icon>login</mat-icon>
              <span>Soy Estudiante</span>
            </a>
          </div>
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">50+</span>
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

      <!-- Features Section -->
      <section class="features-section">
        <div class="container">
          <h2 class="section-title">¿Por qué elegirnos?</h2>
          <p class="section-subtitle">
            Ofrecemos una experiencia de aprendizaje completa y personalizada
          </p>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">
                <mat-icon>video_library</mat-icon>
              </div>
              <h3>Clases Grabadas</h3>
              <p>Accede a clases en video de alta calidad cuando y donde quieras.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <mat-icon>description</mat-icon>
              </div>
              <h3>Material PDF</h3>
              <p>Teoría completa, ejercicios propuestos y resueltos en formato PDF.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <mat-icon>schedule</mat-icon>
              </div>
              <h3>Acceso Vitalicio</h3>
              <p>Una vez adquirido, el curso es tuyo para siempre.</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">
                <mat-icon>emoji_events</mat-icon>
              </div>
              <h3>Certificado</h3>
              <p>Obtén un certificado al completar cada curso.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Cómo Funciona -->
      <section class="how-it-works-section">
        <div class="container">
          <h2 class="section-title">¿Cómo Funciona?</h2>
          <p class="section-subtitle">
            Tres simples pasos para comenzar tu aprendizaje
          </p>
          <div class="steps-grid">
            <div class="step-card">
              <div class="step-number">1</div>
              <div class="step-icon">
                <mat-icon>shopping_cart</mat-icon>
              </div>
              <h3>Solicita tu Inscripción</h3>
              <p>Elige el curso que deseas estudiar y completa el formulario de inscripción.</p>
            </div>
            <div class="step-card">
              <div class="step-number">2</div>
              <div class="step-icon">
                <mat-icon>payment</mat-icon>
              </div>
              <h3>Realiza tu Pago</h3>
              <p>Yape o transfiere al BCP. Nuestro administrador verificará tu pago.</p>
            </div>
            <div class="step-card">
              <div class="step-number">3</div>
              <div class="step-icon">
                <mat-icon>school</mat-icon>
              </div>
              <h3>Recibe tu Acceso</h3>
              <p>Te enviaremos tus credenciales y podrás acceder inmediatamente a tu curso.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Referencias / Testimonios -->
      <section class="testimonials-section">
        <div class="container">
          <h2 class="section-title">Lo Que Dicen Nuestros Estudiantes</h2>
          <p class="section-subtitle">
            Historias de éxito de estudiantes que confiaron en nosotros
          </p>
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
          <div class="footer-info">
            <h3>Academia MIRZAKHANI</h3>
            <p>Educación de calidad al alcance de todos</p>
          </div>
          <div class="footer-contact">
            <h4>Contacto</h4>
            <p>📱 WhatsApp: +51 965 890 475</p>
            <p>📧 Email: contacto@mirzakhani.com</p>
          </div>
          <div class="footer-payment">
            <h4>Métodos de Pago</h4>
            <p>📱 Yape</p>
            <p>🏦 BCP</p>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2026 Academia MIRZAKHANI. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>

    <style>
      /* Estilos generales */
      .landing-page {
        font-family: 'Plus Jakarta Sans', sans-serif;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
      }

      .section-title {
        font-size: 42px;
        font-weight: 900;
        text-align: center;
        color: #1e293b;
        margin: 0 0 16px;
      }

      .section-subtitle {
        font-size: 18px;
        text-align: center;
        color: #64748b;
        margin: 0 0 60px;
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
        padding: 100px 20px 120px;
        text-align: center;
        position: relative;
        overflow: hidden;
      }

      .hero-section::before {
        content: '';
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

      /* Features Section */
      .features-section {
        padding: 100px 20px;
        background: white;
      }

      .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 32px;
      }

      .feature-card {
        text-align: center;
        padding: 40px 24px;
        border-radius: 20px;
        background: linear-gradient(135deg, #fef3c7 0%, #ffedd5 100%);
        transition: transform 0.3s, box-shadow 0.3s;
        border: 2px solid rgba(249, 115, 22, 0.1);
      }

      .feature-card:hover {
        transform: translateY(-8px);
        box-shadow: 0 20px 40px rgba(249, 115, 22, 0.15);
      }

      .feature-icon {
        width: 80px;
        height: 80px;
        margin: 0 auto 24px;
        background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 12px 24px rgba(220, 38, 38, 0.3);
      }

      .feature-icon mat-icon {
        font-size: 40px;
        width: 40px;
        height: 40px;
        color: white;
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

      /* How It Works Section */
      .how-it-works-section {
        padding: 100px 20px;
        background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
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
        width: 50px;
        height: 50px;
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
        background: white;
      }

      .testimonials-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 32px;
      }

      .testimonial-card {
        background: #f8fafc;
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
        width: 20px;
        height: 20px;
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
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 40px;
        margin-bottom: 40px;
      }

      .footer-info h3 {
        font-size: 24px;
        font-weight: 900;
        margin: 0 0 12px;
        background: linear-gradient(135deg, #f97316 0%, #dc2626 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .footer-info p {
        color: rgba(255, 255, 255, 0.7);
        margin: 0;
      }

      .footer-contact h4,
      .footer-payment h4 {
        font-size: 18px;
        font-weight: 800;
        margin: 0 0 16px;
        color: white;
      }

      .footer-contact p,
      .footer-payment p {
        color: rgba(255, 255, 255, 0.7);
        margin: 8px 0;
        font-size: 15px;
      }

      .footer-bottom {
        max-width: 1200px;
        margin: 0 auto;
        padding-top: 30px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        text-align: center;
      }

      .footer-bottom p {
        color: rgba(255, 255, 255, 0.5);
        margin: 0;
        font-size: 14px;
      }

      /* Responsive */
      @media (max-width: 768px) {
        .hero-title {
          font-size: 36px;
        }

        .hero-subtitle {
          font-size: 16px;
        }

        .hero-stats {
          flex-direction: column;
          gap: 24px;
          padding: 24px;
        }

        .stat-divider {
          width: 100px;
          height: 1px;
        }

        .section-title {
          font-size: 32px;
        }

        .hero-actions,
        .cta-actions {
          flex-direction: column;
          align-items: center;
        }

        .btn-primary, .btn-secondary, .btn-large {
          width: 100%;
          max-width: 300px;
          justify-content: center;
        }
      }
    </style>
  `
})
export class InicioComponent {

}
