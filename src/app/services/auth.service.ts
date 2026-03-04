import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  dni: string;
  telefono: string;
  password: string;
  cursosMatriculados: number[];  // IDs de cursos aprobados
  fechaRegistro: string;
  activo: boolean;
  rol: 'estudiante' | 'admin';  // Sistema de roles
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private estudianteActual: Estudiante | null = null;
  private estudiantesRegistrados: Estudiante[] = [];

  // Admin por defecto
  private adminUser: Estudiante = {
    id: 0,
    nombre: 'Administrador',
    email: 'admin@mirzakhani.com',
    dni: '00000000',
    telefono: '+51 999 999 999',
    password: 'admin2026',
    cursosMatriculados: [],
    fechaRegistro: new Date().toISOString(),
    activo: true,
    rol: 'admin'
  };

  private estudianteSubject = new BehaviorSubject<Estudiante | null>(null);
  estudiante$ = this.estudianteSubject.asObservable();

  constructor() {}

  // Registrar estudiante con credenciales del admin
  registrarEstudiante(solicitudData: any): Estudiante {
    const estudiante: Estudiante = {
      id: this.estudiantesRegistrados.length + 1,
      nombre: solicitudData.nombre,
      email: solicitudData.email,
      dni: solicitudData.dni,
      telefono: solicitudData.telefono,
      password: solicitudData.password || '',
      cursosMatriculados: [solicitudData.cursoId],
      fechaRegistro: new Date().toISOString(),
      activo: true,
      rol: 'estudiante'
    };

    this.estudiantesRegistrados.push(estudiante);
    return estudiante;
  }

  // Login con email y contraseña
  login(email: string, password: string): { success: boolean; message: string; estudiante?: Estudiante } {
    // Verificar admin
    if (email === this.adminUser.email && password === this.adminUser.password) {
      this.estudianteActual = this.adminUser;
      this.estudianteSubject.next(this.adminUser);
      return {
        success: true,
        message: 'Login exitoso',
        estudiante: this.adminUser
      };
    }

    // Verificar estudiantes
    const estudiante = this.estudiantesRegistrados.find(
      e => e.email === email && e.password === password && e.activo
    );

    if (estudiante) {
      this.estudianteActual = estudiante;
      this.estudianteSubject.next(estudiante);
      return {
        success: true,
        message: 'Login exitoso',
        estudiante
      };
    }

    return {
      success: false,
      message: 'Email o contraseña incorrectos'
    };
  }

  // Logout
  logout(): void {
    this.estudianteActual = null;
    this.estudianteSubject.next(null);
  }

  // Obtener estudiante actual
  getEstudianteActual(): Estudiante | null {
    return this.estudianteActual;
  }

  // Verificar si está logueado
  isLoggedIn(): boolean {
    return this.estudianteActual !== null;
  }

  // Verificar si es admin
  isAdmin(): boolean {
    return this.estudianteActual?.rol === 'admin';
  }

  // Verificar si es estudiante
  isEstudiante(): boolean {
    return this.estudianteActual?.rol === 'estudiante';
  }

  // Obtener cursos matriculados del estudiante
  getCursosMatriculados(): number[] {
    return this.estudianteActual?.cursosMatriculados || [];
  }

  // Matricular estudiante en curso
  matricularEnCurso(email: string, cursoId: number): boolean {
    const estudiante = this.estudiantesRegistrados.find(e => e.email === email);
    if (estudiante && !estudiante.cursosMatriculados.includes(cursoId)) {
      estudiante.cursosMatriculados.push(cursoId);
      return true;
    }
    return false;
  }

  // Obtener todos los estudiantes (para admin)
  getAllEstudiantes(): Estudiante[] {
    return this.estudiantesRegistrados.filter(e => e.activo);
  }

  // Obtener estudiante por email
  getEstudiantePorEmail(email: string): Estudiante | undefined {
    return this.estudiantesRegistrados.find(e => e.email === email);
  }

  // Cambiar contraseña
  cambiarPassword(email: string, nuevoPassword: string): boolean {
    const estudiante = this.estudiantesRegistrados.find(e => e.email === email);
    if (estudiante) {
      estudiante.password = nuevoPassword;
      return true;
    }
    return false;
  }

  // Actualizar cursos matriculados
  actualizarCursosMatriculados(email: string, cursoIds: number[]): boolean {
    const estudiante = this.estudiantesRegistrados.find(e => e.email === email);
    if (estudiante) {
      estudiante.cursosMatriculados = cursoIds;
      return true;
    }
    return false;
  }
}
