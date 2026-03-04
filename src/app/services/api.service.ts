import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:3000';

export interface Curso {
  id?: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  activo: boolean;
  icono?: string;
  gradiente?: string;
  tipo?: string;
}

export interface Usuario {
  id?: string;
  nombre: string;
  email: string;
  dni: string;
  rol: 'admin' | 'estudiante';
  password: string;
  activo: boolean;
  cursosMatriculados?: number[];
}

export interface Solicitud {
  id?: string;
  nombre: string;
  email: string;
  dni: string;
  telefono: string;
  cursoId: number;
  cursoNombre: string;
  precio: number;
  estado: 'pendiente' | 'aprobado' | 'rechazado';
  password?: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // ===== CURSOS =====
  getCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${API_URL}/cursos`);
  }

  getCurso(id: number): Observable<Curso> {
    return this.http.get<Curso>(`${API_URL}/cursos/${id}`);
  }

  createCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(`${API_URL}/cursos`, curso);
  }

  updateCurso(id: number, curso: Partial<Curso>): Observable<Curso> {
    return this.http.patch<Curso>(`${API_URL}/cursos/${id}`, curso);
  }

  deleteCurso(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/cursos/${id}`);
  }

  // ===== USUARIOS =====
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${API_URL}/usuarios`);
  }

  getUsuarioByEmail(email: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${API_URL}/usuarios?email=${email}`);
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${API_URL}/usuarios`, usuario);
  }

  updateUsuario(id: string, usuario: Partial<Usuario>): Observable<Usuario> {
    return this.http.patch<Usuario>(`${API_URL}/usuarios/${id}`, usuario);
  }

  // ===== SOLICITUDES =====
  getSolicitudes(): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(`${API_URL}/solicitudes`);
  }

  createSolicitud(solicitud: Solicitud): Observable<Solicitud> {
    return this.http.post<Solicitud>(`${API_URL}/solicitudes`, solicitud);
  }

  updateSolicitud(id: string, solicitud: Partial<Solicitud>): Observable<Solicitud> {
    return this.http.patch<Solicitud>(`${API_URL}/solicitudes/${id}`, solicitud);
  }

  // ===== LOGIN SIMPLE =====
  login(email: string, password: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${API_URL}/usuarios?email=${email}&password=${password}`);
  }
}
