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

    let mensaje = '🎓 *SOLICITUD DE INSCRIPCIÓN - Academia MIRZAKHANI* 🎓\n\n';
    mensaje += '📚 *Cursos seleccionados:*\n';

    cursos.forEach((curso, index) => {
      mensaje += `${index + 1}. ${curso.nombre} - S/ ${curso.precio}\n`;
    });

    mensaje += `\n💰 *Subtotal:* S/ ${subtotal.toFixed(2)}`;

    if (descuento > 0) {
      mensaje += `\n🎉 *Descuento:* ${this.getDescuentoPorcentaje()}% - S/ ${(subtotal * descuento).toFixed(2)}`;
    }

    mensaje += `\n✅ *TOTAL A PAGAR:* S/ ${total.toFixed(2)}`;
    mensaje += `\n\n📱 *Métodos de Pago:*\n- Yape: 926 454 594\n- BCP: 191-XXXXXXXX-0-XX`;
    mensaje += `\n\n📝 *Nota:* Una vez realizado el pago, enviaré el comprobante para recibir mis credenciales de acceso.`;
    mensaje += `\n\n📲 *WhatsApp:* +51 965 890 475`;

    return encodeURIComponent(mensaje);
  }
}
