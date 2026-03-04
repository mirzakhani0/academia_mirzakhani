import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Curso {
  id?: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  activo: boolean;
  createdAt?: string;
}

export interface Solicitud {
  id?: string;
  nombre: string;
  email: string;
  dni: string;
  telefono: string;
  cursoId: string;
  cursoNombre: string;
  precio: number;
  estado: 'pendiente' | 'aprobado' | 'rechazado';
  password?: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private firestore: AngularFirestore) {}

  // ===== CURSOS =====
  getCursos(): Observable<Curso[]> {
    return this.firestore.collection<Curso>('cursos', ref => ref.where('activo', '==', true)).valueChanges();
  }

  getCurso(id: string): Observable<Curso | undefined> {
    return this.firestore.collection<Curso>('cursos').doc(id).valueChanges();
  }

  createCurso(curso: Curso): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection('cursos').doc(id).set({
      ...curso,
      id,
      createdAt: new Date().toISOString()
    });
  }

  updateCurso(id: string, curso: Partial<Curso>): Promise<void> {
    return this.firestore.collection('cursos').doc(id).update(curso);
  }

  deleteCurso(id: string): Promise<void> {
    return this.firestore.collection('cursos').doc(id).delete();
  }

  // ===== SOLICITUDES =====
  getSolicitudes(): Observable<Solicitud[]> {
    return this.firestore.collection<Solicitud>('solicitudes', ref => ref.orderBy('fecha', 'desc')).valueChanges();
  }

  createSolicitud(solicitud: Solicitud): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection('solicitudes').doc(id).set({
      ...solicitud,
      id,
      fecha: new Date().toISOString()
    });
  }

  updateSolicitud(id: string, solicitud: Partial<Solicitud>): Promise<void> {
    return this.firestore.collection('solicitudes').doc(id).update(solicitud);
  }

  // ===== USUARIOS =====
  getUsuarios(): Observable<any[]> {
    return this.firestore.collection('usuarios').valueChanges();
  }

  getUsuarioPorEmail(email: string): Observable<any> {
    return this.firestore.collection('usuarios', ref => ref.where('email', '==', email)).valueChanges();
  }

  createUsuario(usuario: any): Promise<void> {
    const id = this.firestore.createId();
    return this.firestore.collection('usuarios').doc(id).set({
      ...usuario,
      id,
      createdAt: new Date().toISOString()
    });
  }

  updateUsuario(id: string, usuario: any): Promise<void> {
    return this.firestore.collection('usuarios').doc(id).update(usuario);
  }
}
