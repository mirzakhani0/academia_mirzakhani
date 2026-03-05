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
      const { environment } = await import('../environments/environment');
      
      if (!getApps().length) {
        initializeApp(environment.firebase);
      }
      
      this.firestore = getFirestore();
      console.log('✅ MatriculasService inicializado con Firebase');
    } catch (error) {
      console.error('❌ Error inicializando MatriculasService:', error);
    }
  }

  // Obtener TODAS las solicitudes (sin orderBy para evitar índices)
  async getSolicitudes(): Promise<Solicitud[]> {
    try {
      if (!this.firestore) {
        await this.inicializarFirestore();
      }
      
      const querySnapshot = await getDocs(collection(this.firestore, 'solicitudes'));
      const solicitudes: Solicitud[] = [];
      
      querySnapshot.forEach((doc: any) => {
        solicitudes.push({
          ...doc.data(),
          id: doc.id
        } as Solicitud);
      });
      
      // Ordenar por fecha (más reciente primero) en el cliente
      return solicitudes.sort((a, b) => {
        return new Date(b.fecha).getTime() - new Date(a.fecha).getTime();
      });
    } catch (error) {
      console.error('❌ Error obteniendo solicitudes:', error);
      return [];
    }
  }

  // Obtener solicitudes por estado
  async getSolicitudesByEstado(estado: string): Promise<Solicitud[]> {
    try {
      if (!this.firestore) {
        await this.inicializarFirestore();
      }
      
      const todas = await this.getSolicitudes();
      return todas.filter(s => s.estado === estado);
    } catch (error) {
      console.error('❌ Error obteniendo solicitudes por estado:', error);
      return [];
    }
  }

  // Agregar nueva solicitud
  async addSolicitud(solicitud: Solicitud): Promise<void> {
    try {
      if (!this.firestore) {
        await this.inicializarFirestore();
      }
      
      const id = doc(collection(this.firestore, 'solicitudes')).id;
      const solicitudRef = doc(this.firestore, 'solicitudes', id);
      
      await setDoc(solicitudRef, {
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
      
      console.log('✅ Solicitud guardada:', id);
    } catch (error) {
      console.error('❌ Error guardando solicitud:', error);
      throw error;
    }
  }

  // Actualizar estado de solicitud
  async updateEstado(id: string, estado: string, password?: string): Promise<void> {
    try {
      if (!this.firestore) {
        await this.inicializarFirestore();
      }
      
      const solicitudRef = doc(this.firestore, 'solicitudes', id);
      
      const updateData: any = {
        estado: estado,
        fechaAprobacion: estado === 'aprobado' ? new Date().toISOString() : null
      };

      if (password) {
        updateData.password = password;
      }

      await updateDoc(solicitudRef, updateData);
      console.log('✅ Solicitud actualizada:', id);
      
      // Si es aprobado, registrar estudiante en Firebase Auth
      if (estado === 'aprobado' && password) {
        await this.registrarEstudianteConAuth(id, password);
      }
    } catch (error) {
      console.error('❌ Error actualizando solicitud:', error);
      throw error;
    }
  }

  // Registrar estudiante con Firebase Auth
  private async registrarEstudianteConAuth(solicitudId: string, password: string) {
    try {
      const { getAuth, createUserWithEmailAndPassword, updateProfile } = await import('firebase/auth');
      const { getFirestore, doc, getDoc, updateDoc } = await import('firebase/firestore');
      
      const auth = getAuth();
      const firestore = getFirestore();
      
      // Obtener datos de la solicitud
      const solicitudDoc = await getDoc(doc(firestore, 'solicitudes', solicitudId));
      
      if (solicitudDoc.exists()) {
        const data = solicitudDoc.data();
        
        // Crear usuario en Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data['email'],
          password
        );
        
        // Actualizar perfil
        await updateProfile(userCredential.user, {
          displayName: data['nombre']
        });
        
        // Crear documento en usuarios
        await updateDoc(doc(firestore, 'solicitudes', solicitudId), {
          uid: userCredential.user.uid
        });
        
        // Guardar en colección usuarios
        await setDoc(doc(firestore, 'usuarios', userCredential.user.uid), {
          uid: userCredential.user.uid,
          id: userCredential.user.uid,
          nombre: data['nombre'],
          email: data['email'],
          dni: data['dni'],
          telefono: data['telefono'],
          password: '',
          cursosMatriculados: [data['cursoId']],
          fechaRegistro: new Date().toISOString(),
          activo: true,
          rol: 'estudiante'
        });
        
        console.log('✅ Estudiante registrado en Auth:', userCredential.user.uid);
      }
    } catch (error) {
      console.error('❌ Error registrando estudiante en Auth:', error);
    }
  }

  // Eliminar solicitud
  async deleteSolicitud(id: string): Promise<void> {
    try {
      if (!this.firestore) {
        await this.inicializarFirestore();
      }
      
      const solicitudRef = doc(this.firestore, 'solicitudes', id);
      await deleteDoc(solicitudRef);
      console.log('✅ Solicitud eliminada:', id);
    } catch (error) {
      console.error('❌ Error eliminando solicitud:', error);
      throw error;
    }
  }

  // Actualizar solicitud
  async updateSolicitud(id: string, updateData: any): Promise<void> {
    try {
      if (!this.firestore) {
        await this.inicializarFirestore();
      }
      
      const solicitudRef = doc(this.firestore, 'solicitudes', id);
      await updateDoc(solicitudRef, updateData);
      console.log('✅ Solicitud actualizada:', id);
    } catch (error) {
      console.error('❌ Error actualizando solicitud:', error);
      throw error;
    }
  }
}
