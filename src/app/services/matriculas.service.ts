import { Injectable } from '@angular/core';
import { getFirestore, collection, doc, getDocs, setDoc, updateDoc, query } from 'firebase/firestore';

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
  private firestore: any = null;

  constructor() {
    this.inicializarFirestore();
  }

  private async inicializarFirestore() {
    try {
      const { getApps, initializeApp } = await import('firebase/app');
      const { environment } = await import('../../environments/environment');
      
      if (!getApps().length) {
        initializeApp(environment.firebase);
      }
      
      this.firestore = getFirestore();
    } catch (error) {
      console.error('Error inicializando MatriculasService:', error);
    }
  }

  async getSolicitudes(): Promise<Solicitud[]> {
    try {
      if (!this.firestore) await this.inicializarFirestore();
      const querySnapshot = await getDocs(collection(this.firestore, 'solicitudes'));
      const solicitudes: Solicitud[] = [];
      querySnapshot.forEach((doc: any) => {
        solicitudes.push({ ...doc.data(), id: doc.id } as Solicitud);
      });
      return solicitudes.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    } catch (error) {
      console.error('Error obteniendo solicitudes:', error);
      return [];
    }
  }

  async getSolicitudesByEstado(estado: string): Promise<Solicitud[]> {
    try {
      if (!this.firestore) await this.inicializarFirestore();
      const todas = await this.getSolicitudes();
      return todas.filter(s => s.estado === estado);
    } catch (error) {
      console.error('Error obteniendo solicitudes por estado:', error);
      return [];
    }
  }

  async addSolicitud(solicitud: Solicitud): Promise<void> {
    try {
      if (!this.firestore) await this.inicializarFirestore();
      const id = doc(collection(this.firestore, 'solicitudes')).id;
      await setDoc(doc(this.firestore, 'solicitudes', id), {
        id: id,
        nombre: solicitud.nombre,
        email: solicitud.email,
        dni: solicitud.dni,
        telefono: solicitud.telefono,
        cursoId: solicitud.cursoId,
        cursoNombre: solicitud.cursoNombre,
        precio: solicitud.precio,
        fecha: new Date().toISOString(),
        estado: solicitud.estado || 'pendiente',
        password: solicitud.password || '',
        fechaAprobacion: solicitud.fechaAprobacion || null
      });
    } catch (error) {
      console.error('Error guardando solicitud:', error);
      throw error;
    }
  }

  async updateEstado(id: string, estado: string, password?: string): Promise<void> {
    try {
      if (!this.firestore) await this.inicializarFirestore();
      const updateData: any = {
        estado: estado,
        fechaAprobacion: estado === 'aprobado' ? new Date().toISOString() : null
      };
      if (password) updateData.password = password;
      await updateDoc(doc(this.firestore, 'solicitudes', id), updateData);
    } catch (error) {
      console.error('Error actualizando solicitud:', error);
      throw error;
    }
  }

  async updateSolicitud(id: string, updateData: any): Promise<void> {
    try {
      if (!this.firestore) await this.inicializarFirestore();
      await updateDoc(doc(this.firestore, 'solicitudes', id), updateData);
    } catch (error) {
      console.error('Error actualizando solicitud:', error);
      throw error;
    }
  }
}
