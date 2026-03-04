import { Injectable } from '@angular/core';
import { getFirestore, collection, doc, getDocs, setDoc, updateDoc, deleteDoc, query, where, orderBy } from 'firebase/firestore';
import { AuthService } from './auth.service';

export interface Solicitud {
  id?: string;
  nombre: string;
  email: string;
  dni: string;
  telefono: string;
  cursoId: number;
  cursoNombre: string;
  precio: number;
  fecha: string;
  estado: 'pendiente' | 'aprobado' | 'rechazado';
  password?: string;
  fechaAprobacion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MatriculasService {
  private firestore!: ReturnType<typeof getFirestore>;
  private authService = new AuthService();

  constructor() {
    this.firestore = getFirestore();
  }

  // Obtener todas las solicitudes
  async getSolicitudes(): Promise<Solicitud[]> {
    const q = query(collection(this.firestore, 'solicitudes'), orderBy('fecha', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    } as Solicitud));
  }

  // Obtener solicitudes por estado
  async getSolicitudesByEstado(estado: string): Promise<Solicitud[]> {
    const q = query(collection(this.firestore, 'solicitudes'), where('estado', '==', estado));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    } as Solicitud));
  }

  // Agregar nueva solicitud
  async addSolicitud(solicitud: Solicitud): Promise<void> {
    const id = doc(collection(this.firestore, 'solicitudes')).id;
    const solicitudRef = doc(this.firestore, 'solicitudes', id);
    await setDoc(solicitudRef, {
      ...solicitud,
      id,
      estado: 'pendiente',
      fecha: new Date().toISOString()
    });
  }

  // Actualizar estado de solicitud
  async updateEstado(id: string, estado: 'pendiente' | 'aprobado' | 'rechazado', password?: string): Promise<void> {
    const updateData: any = {
      estado,
      fechaAprobacion: estado === 'aprobado' ? new Date().toISOString() : null
    };

    if (password) {
      updateData.password = password;
    }

    const solicitudRef = doc(this.firestore, 'solicitudes', id);
    await updateDoc(solicitudRef, updateData);

    // Si es aprobado, registrar estudiante en Firebase Auth
    if (estado === 'aprobado' && password) {
      const solicitudDoc = await getDocs(query(collection(this.firestore, 'solicitudes'), where('id', '==', id)));
      if (!solicitudDoc.empty) {
        const solicitudData = solicitudDoc.docs[0].data() as Solicitud;
        
        await this.authService.registrarEstudiante({
          ...solicitudData,
          password
        });
      }
    }
  }

  // Eliminar solicitud
  async deleteSolicitud(id: string): Promise<void> {
    const solicitudRef = doc(this.firestore, 'solicitudes', id);
    await deleteDoc(solicitudRef);
  }

  // Actualizar solicitud (para asignar cursos)
  async updateSolicitud(id: string, updateData: any): Promise<void> {
    const solicitudRef = doc(this.firestore, 'solicitudes', id);
    await updateDoc(solicitudRef, updateData);
  }

  // Obtener solicitudes aprobadas
  async getSolicitudesAprobadas(): Promise<Solicitud[]> {
    const q = query(collection(this.firestore, 'solicitudes'), where('estado', '==', 'aprobado'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id
    } as Solicitud));
  }

  // Obtener estudiante por email
  async getEstudianteByEmail(email: string): Promise<Solicitud | undefined> {
    const q = query(
      collection(this.firestore, 'solicitudes'),
      where('email', '==', email),
      where('estado', '==', 'aprobado')
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      return {
        ...doc.data(),
        id: doc.id
      } as Solicitud;
    }
    return undefined;
  }
}
