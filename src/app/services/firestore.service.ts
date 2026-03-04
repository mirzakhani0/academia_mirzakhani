import { Injectable } from '@angular/core';
import { getFirestore, collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc, query, orderBy, where } from 'firebase/firestore';

export interface Curso {
  id?: string;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  activo: boolean;
  imagen?: string;
  createdAt?: string;
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
export class FirestoreService {
  private firestore!: ReturnType<typeof getFirestore>;

  constructor() {
    this.firestore = getFirestore();
  }

  // ===== CURSOS =====
  async getCursos(): Promise<Curso[]> {
    const q = query(collection(this.firestore, 'cursos'), where('activo', '==', true));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    } as Curso));
  }

  async getCurso(id: string): Promise<Curso | undefined> {
    const docRef = doc(this.firestore, 'cursos', id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return {
        ...docSnap.data(),
        id: docSnap.id
      } as Curso;
    }
    return undefined;
  }

  async createCurso(curso: Curso): Promise<string> {
    const id = doc(collection(this.firestore, 'cursos')).id;
    const cursoRef = doc(this.firestore, 'cursos', id);
    await setDoc(cursoRef, {
      ...curso,
      id,
      createdAt: new Date().toISOString()
    });
    return id;
  }

  async updateCurso(id: string, curso: Partial<Curso>): Promise<void> {
    const docRef = doc(this.firestore, 'cursos', id);
    await updateDoc(docRef, curso);
  }

  async deleteCurso(id: string): Promise<void> {
    const docRef = doc(this.firestore, 'cursos', id);
    await deleteDoc(docRef);
  }

  // ===== SOLICITUDES =====
  async getSolicitudes(): Promise<Solicitud[]> {
    const q = query(collection(this.firestore, 'solicitudes'), orderBy('fecha', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    } as Solicitud));
  }

  async createSolicitud(solicitud: Solicitud): Promise<string> {
    const id = doc(collection(this.firestore, 'solicitudes')).id;
    const solicitudRef = doc(this.firestore, 'solicitudes', id);
    await setDoc(solicitudRef, {
      ...solicitud,
      id,
      fecha: new Date().toISOString()
    });
    return id;
  }

  async updateSolicitud(id: string, solicitud: Partial<Solicitud>): Promise<void> {
    const docRef = doc(this.firestore, 'solicitudes', id);
    await updateDoc(docRef, solicitud);
  }

  // ===== USUARIOS =====
  async getUsuarios(): Promise<any[]> {
    const querySnapshot = await getDocs(collection(this.firestore, 'usuarios'));
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    }));
  }

  async getUsuarioPorEmail(email: string): Promise<any> {
    const q = query(collection(this.firestore, 'usuarios'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return {
        ...doc.data(),
        id: doc.id
      };
    }
    return null;
  }

  async createUsuario(usuario: any): Promise<string> {
    const id = doc(collection(this.firestore, 'usuarios')).id;
    const usuarioRef = doc(this.firestore, 'usuarios', id);
    await setDoc(usuarioRef, {
      ...usuario,
      id,
      createdAt: new Date().toISOString()
    });
    return id;
  }

  async updateUsuario(id: string, usuario: any): Promise<void> {
    const docRef = doc(this.firestore, 'usuarios', id);
    await updateDoc(docRef, usuario);
  }
}
