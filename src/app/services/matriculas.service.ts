import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth.service';

export interface Solicitud {
  id: number;
  nombre: string;
  email: string;
  dni: string;
  telefono: string;
  cursoId: number;
  cursoNombre: string;
  precio: number;
  fecha: string;
  estado: 'pendiente' | 'aprobado' | 'rechazado';
  password?: string;  // Contraseña generada por admin
  fechaAprobacion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MatriculasService {
  private solicitudes: Solicitud[] = [
    // Datos de ejemplo
    {
      id: 1,
      nombre: 'Juan Pérez García',
      email: 'juan@email.com',
      dni: '12345678',
      telefono: '+51 999 999 999',
      cursoId: 1,
      cursoNombre: 'Álgebra Lineal: Dominio Total',
      precio: 45,
      fecha: new Date().toISOString(),
      estado: 'pendiente'
    },
    {
      id: 2,
      nombre: 'María López Rodríguez',
      email: 'maria@email.com',
      dni: '87654321',
      telefono: '+51 888 888 888',
      cursoId: 3,
      cursoNombre: 'Física I: Mecánica y Estática',
      precio: 39,
      fecha: new Date().toISOString(),
      estado: 'pendiente'
    }
  ];

  private solicitudesSubject = new BehaviorSubject<Solicitud[]>(this.solicitudes);
  solicitudes$ = this.solicitudesSubject.asObservable();

  constructor(private authService: AuthService) {}

  getSolicitudes(): Solicitud[] {
    return this.solicitudes;
  }

  getSolicitudesByEstado(estado: string): Solicitud[] {
    return this.solicitudes.filter(s => s.estado === estado);
  }

  addSolicitud(solicitud: Solicitud): void {
    solicitud.id = this.solicitudes.length > 0 ? Math.max(...this.solicitudes.map(s => s.id)) + 1 : 1;
    solicitud.estado = 'pendiente';
    this.solicitudes.push(solicitud);
    this.solicitudesSubject.next([...this.solicitudes]);
  }

  updateEstado(id: number, estado: 'pendiente' | 'aprobado' | 'rechazado', password?: string): void {
    const index = this.solicitudes.findIndex(s => s.id === id);
    if (index !== -1) {
      this.solicitudes[index].estado = estado;
      if (estado === 'aprobado' && password) {
        this.solicitudes[index].password = password;
        this.solicitudes[index].fechaAprobacion = new Date().toISOString();

        // Registrar estudiante en el sistema de autenticación
        this.authService.registrarEstudiante({
          ...this.solicitudes[index],
          password: password
        });
      }
      this.solicitudesSubject.next([...this.solicitudes]);
    }
  }

  deleteSolicitud(id: number): void {
    this.solicitudes = this.solicitudes.filter(s => s.id !== id);
    this.solicitudesSubject.next([...this.solicitudes]);
  }

  getSolicitudesAprobadas(): Solicitud[] {
    return this.solicitudes.filter(s => s.estado === 'aprobado');
  }

  getEstudianteByEmail(email: string): Solicitud | undefined {
    return this.solicitudes.find(s => s.email === email && s.estado === 'aprobado');
  }
}
