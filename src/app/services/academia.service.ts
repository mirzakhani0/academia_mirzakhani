import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  Timestamp
} from 'firebase/firestore';
import { getApps, initializeApp, FirebaseApp } from 'firebase/app';

export interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen?: string;
  activo?: boolean;
}

export interface Contenido {
  id: number;
  cursoId: number;
  cursoNombre: string;
  tema: string;
  nombre: string;
  tipo: 'pdf' | 'video';
  url: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class AcademiaService {
  private firestore: any = null;
  private app: FirebaseApp | null = null;
  private cursosSubject = new BehaviorSubject<Curso[]>([]);
  private contenidosSubject = new BehaviorSubject<Contenido[]>([]);
  
  cursos$ = this.cursosSubject.asObservable();
  contenidos$ = this.contenidosSubject.asObservable();

  constructor() {
    this.initializeFirebase();
  }

  private async initializeFirebase() {
    try {
      // Importar environment dinámicamente
      const { environment } = await import('../../environments/environment');
      
      // Inicializar Firebase si no está inicializado
      if (!getApps().length) {
        this.app = initializeApp(environment.firebase);
      }
      
      this.firestore = getFirestore();
      console.log('✅ Firebase inicializado en AcademiaService');
      
      // Cargar cursos después de inicializar
      await this.loadCursosFromFirebase();
    } catch (error) {
      console.error('❌ Error inicializando Firebase en AcademiaService:', error);
      // Cargar datos de ejemplo si Firebase falla
      this.loadDefaultCursos();
    }
  }

  private loadDefaultCursos() {
    const defaultCursos: Curso[] = [
      { id: 1, nombre: 'Álgebra Lineal', descripcion: 'De matrices a espacios vectoriales', precio: 45, categoria: 'Matemáticas' },
      { id: 2, nombre: 'Física I: Mecánica', descripcion: 'Domina las leyes de Newton', precio: 39, categoria: 'Física' },
      { id: 3, nombre: 'Cálculo Diferencial', descripcion: '200 ejercicios resueltos', precio: 25, categoria: 'Matemáticas' },
    ];
    this.cursosSubject.next(defaultCursos);
  }

  private async loadCursosFromFirebase() {
    try {
      const q = query(collection(this.firestore, 'cursos'), where('activo', '==', true));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        console.log('⚠️ No hay cursos en Firebase, cargando datos por defecto');
        this.loadDefaultCursos();
        return;
      }

      const cursos: Curso[] = querySnapshot.docs.map((doc: any, index: number) => {
        const data = doc.data();
        return {
          id: index + 1,
          nombre: data.nombre,
          descripcion: data.descripcion,
          precio: data.precio,
          categoria: data.categoria,
          imagen: data.imagen,
          activo: data.activo
        };
      });

      console.log('✅ Cursos cargados desde Firebase:', cursos.length);
      this.cursosSubject.next(cursos);
    } catch (error) {
      console.error('❌ Error cargando cursos desde Firebase:', error);
      this.loadDefaultCursos();
    }
  }

  getCursos(): Curso[] {
    let cursos: Curso[] = [];
    this.cursosSubject.subscribe(c => cursos = c).unsubscribe();
    return cursos;
  }

  getCursoById(id: number): Curso | undefined {
    return this.getCursos().find(c => c.id === id);
  }

  async addCurso(curso: Curso): Promise<void> {
    try {
      const cursoData = {
        nombre: curso.nombre,
        descripcion: curso.descripcion,
        precio: curso.precio,
        categoria: curso.categoria,
        activo: true,
        imagen: curso.imagen || '',
        createdAt: Timestamp.now()
      };

      // Generar ID único
      const id = doc(collection(this.firestore, 'cursos')).id;
      const cursoRef = doc(this.firestore, 'cursos', id);
      
      // Guardar en Firebase
      await setDoc(cursoRef, { ...cursoData, id });
      console.log('✅ Curso guardado en Firebase:', id);

      // Recargar cursos para obtener la lista actualizada
      await this.loadCursosFromFirebase();
    } catch (error) {
      console.error('❌ Error guardando curso en Firebase:', error);
      throw error;
    }
  }

  async updateCurso(id: number, curso: Curso): Promise<void> {
    try {
      // Obtener todos los cursos para encontrar el ID de Firebase
      const q = query(collection(this.firestore, 'cursos'), where('activo', '==', true));
      const querySnapshot = await getDocs(q);
      
      if (id <= querySnapshot.docs.length) {
        const docSnapshot = querySnapshot.docs[id - 1];
        const cursoRef = doc(this.firestore, 'cursos', docSnapshot.id);
        
        await updateDoc(cursoRef, {
          nombre: curso.nombre,
          descripcion: curso.descripcion,
          precio: curso.precio,
          categoria: curso.categoria,
          imagen: curso.imagen
        });

        await this.loadCursosFromFirebase();
      }
    } catch (error) {
      console.error('❌ Error actualizando curso:', error);
      throw error;
    }
  }

  async deleteCurso(id: number): Promise<void> {
    try {
      // Obtener todos los cursos para encontrar el ID de Firebase
      const q = query(collection(this.firestore, 'cursos'), where('activo', '==', true));
      const querySnapshot = await getDocs(q);
      
      if (id <= querySnapshot.docs.length) {
        const docSnapshot = querySnapshot.docs[id - 1];
        const cursoRef = doc(this.firestore, 'cursos', docSnapshot.id);
        
        // En lugar de eliminar, desactivamos el curso
        await updateDoc(cursoRef, { activo: false });
        
        await this.loadCursosFromFirebase();
      }
    } catch (error) {
      console.error('❌ Error eliminando curso:', error);
      throw error;
    }
  }

  // Métodos para Contenidos
  getContenidos(): Contenido[] {
    let contenidos: Contenido[] = [];
    this.contenidosSubject.subscribe(c => contenidos = c).unsubscribe();
    return contenidos;
  }

  getContenidosByCurso(cursoId: number): Contenido[] {
    return this.getContenidos().filter(c => c.cursoId === cursoId);
  }

  getContenidosByTema(tema: string): Contenido[] {
    return this.getContenidos().filter(c => c.tema === tema);
  }

  async addContenido(contenido: Contenido): Promise<void> {
    try {
      // Guardar en Firebase
      const { getFirestore, collection, doc, setDoc, Timestamp } = await import('firebase/firestore');
      const firestore = getFirestore();
      
      const id = doc(collection(firestore, 'contenidos')).id;
      const contenidoRef = doc(firestore, 'contenidos', id);
      
      await setDoc(contenidoRef, {
        ...contenido,
        id: parseInt(id),
        fecha: new Date().toISOString(),
        createdAt: Timestamp.now()
      });

      console.log('✅ Contenido guardado en Firebase:', id);
      
      // Recargar contenidos después de guardar
      await this.cargarContenidosDesdeFirebase();
    } catch (error) {
      console.error('❌ Error guardando contenido:', error);
      // Fallback local
      contenido.id = this.getContenidos().length > 0
        ? Math.max(...this.getContenidos().map(c => c.id)) + 1
        : 1;
      const currentContenidos = this.getContenidos();
      currentContenidos.push(contenido);
      this.contenidosSubject.next([...currentContenidos]);
    }
  }

  async cargarContenidosDesdeFirebase(): Promise<void> {
    try {
      const { getFirestore, collection, getDocs } = await import('firebase/firestore');
      const firestore = getFirestore();
      
      const querySnapshot = await getDocs(collection(firestore, 'contenidos'));
      
      if (querySnapshot.empty) {
        console.log('⚠️ No hay contenidos en Firebase');
        return;
      }

      const contenidos: Contenido[] = querySnapshot.docs.map((doc: any) => {
        const data = doc.data();
        return {
          id: data['id'] || parseInt(doc.id),
          cursoId: data['cursoId'],
          cursoNombre: data['cursoNombre'],
          tema: data['tema'],
          nombre: data['nombre'],
          tipo: data['tipo'],
          url: data['url'],
          fecha: data['fecha']
        };
      });

      console.log('✅ Contenidos cargados desde Firebase:', contenidos.length);
      this.contenidosSubject.next(contenidos);
    } catch (error) {
      console.error('❌ Error cargando contenidos desde Firebase:', error);
    }
  }

  deleteContenido(id: number): void {
    const currentContenidos = this.getContenidos().filter(c => c.id !== id);
    this.contenidosSubject.next(currentContenidos);
  }
}
