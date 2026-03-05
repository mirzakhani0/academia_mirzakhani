import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CursoCarrito {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  gradiente: string;
  icono: string;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private cursosSubject = new BehaviorSubject<CursoCarrito[]>([]);
  cursos$ = this.cursosSubject.asObservable();

  agregarCurso(curso: CursoCarrito): void {
    const current = this.cursosSubject.value;
    // Verificar si ya está en el carrito
    if (!current.find(c => c.id === curso.id)) {
      current.push(curso);
      this.cursosSubject.next(current);
    }
  }

  removerCurso(cursoId: number): void {
    const current = this.cursosSubject.value;
    const updated = current.filter(c => c.id !== cursoId);
    this.cursosSubject.next(updated);
  }

  vaciarCarrito(): void {
    this.cursosSubject.next([]);
  }

  getCursos(): CursoCarrito[] {
    return this.cursosSubject.value;
  }

  getCantidad(): number {
    return this.cursosSubject.value.length;
  }

  getSubtotal(): number {
    const cursos = this.cursosSubject.value;
    return cursos.reduce((sum, c) => sum + c.precio, 0);
  }

  getDescuento(): number {
    const cantidad = this.getCantidad();
    if (cantidad >= 3) {
      return 0.15; // 15% descuento para 3+ cursos
    } else if (cantidad >= 2) {
      return 0.10; // 10% descuento para 2 cursos
    }
    return 0; // Sin descuento para 1 curso
  }

  getDescuentoPorcentaje(): number {
    return this.getDescuento() * 100;
  }

  getTotal(): number {
    const subtotal = this.getSubtotal();
    const descuento = subtotal * this.getDescuento();
    return subtotal - descuento;
  }

  getMensajeWhatsApp(): string {
    const cursos = this.cursosSubject.value;
    const subtotal = this.getSubtotal();
    const descuento = this.getDescuento();
    const total = this.getTotal();

    let mensaje = '*🎓 SOLICITUD DE INSCRIPCIÓN - Academia MIRZAKHANI* 🎓\n\n';
    
    if (cursos.length === 1) {
      mensaje += `📚 *Curso seleccionado:*\n${cursos[0].nombre}\n\n`;
    } else {
      mensaje += `📚 *Cursos seleccionados:*\n`;
      cursos.forEach((curso, index) => {
        mensaje += `${index + 1}. ${curso.nombre}\n`;
      });
      mensaje += `\n`;
    }

    mensaje += `💰 *Monto total:* S/ ${total.toFixed(2)}\n`;

    if (descuento > 0) {
      mensaje += `🎉 *¡Descuento aplicado:* ${this.getDescuentoPorcentaje()}%\n\n`;
    } else {
      mensaje += `\n`;
    }

    mensaje += `*📱 Métodos de Pago:*\n\n`;
    mensaje += `*Yape/Plin:* 926 454 594 (JOSE LLAN*)\n\n`;
    mensaje += `*BCP:* 191-XXXXXXXX-0-XX\n\n`;
    mensaje += `*📝 Nota:* Adjuntaré la captura del pago por este medio para recibir mis accesos de inmediato.\n\n`;
    mensaje += `*📲 WhatsApp de soporte:* +51 965 890 475`;

    return encodeURIComponent(mensaje);
  }
}
