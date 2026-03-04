import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FirestoreService, Curso as CursoFirebase } from './firestore.service';

export interface Curso {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen?: string;
}

export interface Contenido {
  id: number;
  cursoId: number;
  cursoNombre: string;
  tema: string;  // Solo el nombre del tema (texto)
  nombre: string;
  tipo: 'pdf' | 'video';
  url: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class AcademiaService {
  // Datos de ejemplo iniciales (solo si Firebase falla)
  private cursos: Curso[] = [
    { id: 1, nombre: 'Álgebra Lineal', descripcion: 'De matrices a espacios vectoriales', precio: 45, categoria: 'Matemáticas' },
    { id: 2, nombre: 'Física I: Mecánica', descripcion: 'Domina las leyes de Newton', precio: 39, categoria: 'Física' },
    { id: 3, nombre: 'Cálculo Diferencial', descripcion: '200 ejercicios resueltos', precio: 25, categoria: 'Matemáticas' },
  ];

  private contenidos: Contenido[] = [
    { id: 1, cursoId: 1, cursoNombre: 'Álgebra Lineal', tema: 'Matrices y Vectores', nombre: 'Teoría (PDF)', tipo: 'pdf', url: '', fecha: '2026-03-01' },
    { id: 2, cursoId: 1, cursoNombre: 'Álgebra Lineal', tema: 'Matrices y Vectores', nombre: 'Ejercicios Propuestos (PDF)', tipo: 'pdf', url: '', fecha: '2026-03-01' },
    { id: 3, cursoId: 1, cursoNombre: 'Álgebra Lineal', tema: 'Matrices y Vectores', nombre: 'Ejercicios Resueltos (PDF)', tipo: 'pdf', url: '', fecha: '2026-03-01' },
    { id: 4, cursoId: 1, cursoNombre: 'Álgebra Lineal', tema: 'Matrices y Vectores', nombre: 'Clase Teoría (Video)', tipo: 'video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', fecha: '2026-03-01' },
    { id: 5, cursoId: 1, cursoNombre: 'Álgebra Lineal', tema: 'Matrices y Vectores', nombre: 'Clase Ejercicios (Video)', tipo: 'video', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', fecha: '2026-03-01' },
  ];

  // Subjects para notificar cambios
  private cursosSubject = new BehaviorSubject<Curso[]>(this.cursos);
  private contenidosSubject = new BehaviorSubject<Contenido[]>(this.contenidos);

  // Firebase
  private firestoreService: FirestoreService;
  private initialized = false;

  cursos$ = this.cursosSubject.asObservable();
  contenidos$ = this.contenidosSubject.asObservable();

  constructor() {
    this.firestoreService = new FirestoreService();
    this.cargarCursosDesdeFirebase();
  }

  // Cargar cursos desde Firebase
  private async cargarCursosDesdeFirebase() {
    try {
      const cursosFirebase = await this.firestoreService.getCursos();
      if (cursosFirebase && cursosFirebase.length > 0) {
        this.cursos = cursosFirebase.map((c, index) => ({
          id: index + 1,
          nombre: c.nombre,
          descripcion: c.descripcion,
          precio: c.precio,
          categoria: c.categoria,
          imagen: c.imagen
        }));
        this.cursosSubject.next([...this.cursos]);
        this.initialized = true;
      }
    } catch (error) {
      console.error('Error cargando cursos desde Firebase:', error);
      // Usar datos locales si Firebase falla
      this.initialized = true;
    }
  }

  // Métodos para Cursos
  getCursos(): Curso[] {
    return this.cursos;
  }

  getCursoById(id: number): Curso | undefined {
    return this.cursos.find(c => c.id === id);
  }

  async addCurso(curso: Curso): Promise<void> {
    try {
      // Guardar en Firebase
      const cursoFirebase: CursoFirebase = {
        nombre: curso.nombre,
        descripcion: curso.descripcion,
        precio: curso.precio,
        categoria: curso.categoria,
        activo: true,
        imagen: curso.imagen
      };

      const idFirebase = await this.firestoreService.createCurso(cursoFirebase);
      
      // Agregar a la lista local
      curso.id = this.cursos.length > 0 ? Math.max(...this.cursos.map(c => c.id)) + 1 : 1;
      this.cursos.push(curso);
      this.cursosSubject.next([...this.cursos]);
    } catch (error) {
      console.error('Error agregando curso:', error);
      // Fallback local
      curso.id = this.cursos.length > 0 ? Math.max(...this.cursos.map(c => c.id)) + 1 : 1;
      this.cursos.push(curso);
      this.cursosSubject.next([...this.cursos]);
    }
  }

  async updateCurso(id: number, curso: Curso): Promise<void> {
    try {
      // Actualizar en Firebase
      const cursoFirebase: Partial<CursoFirebase> = {
        nombre: curso.nombre,
        descripcion: curso.descripcion,
        precio: curso.precio,
        categoria: curso.categoria,
        imagen: curso.imagen
      };

      // Buscar el ID de Firebase (usando el índice como referencia)
      const index = this.cursos.findIndex(c => c.id === id);
      if (index !== -1) {
        // Actualizar localmente primero
        this.cursos[index] = curso;
        this.cursosSubject.next([...this.cursos]);
        
        // Intentar actualizar en Firebase si existe
        try {
          const cursosFirebase = await this.firestoreService.getCursos();
          if (cursosFirebase[index]) {
            await this.firestoreService.updateCurso(cursosFirebase[index].id!, cursoFirebase);
          }
        } catch (fbError) {
          console.error('Error actualizando en Firebase:', fbError);
        }
      }
    } catch (error) {
      console.error('Error actualizando curso:', error);
      // Fallback local
      const index = this.cursos.findIndex(c => c.id === id);
      if (index !== -1) {
        this.cursos[index] = curso;
        this.cursosSubject.next([...this.cursos]);
      }
    }
  }

  async deleteCurso(id: number): Promise<void> {
    try {
      // Eliminar de Firebase
      const index = this.cursos.findIndex(c => c.id === id);
      if (index !== -1) {
        try {
          const cursosFirebase = await this.firestoreService.getCursos();
          if (cursosFirebase[index]) {
            await this.firestoreService.deleteCurso(cursosFirebase[index].id!);
          }
        } catch (fbError) {
          console.error('Error eliminando de Firebase:', fbError);
        }
        
        // Eliminar localmente
        this.cursos = this.cursos.filter(c => c.id !== id);
        this.cursosSubject.next([...this.cursos]);
      }
    } catch (error) {
      console.error('Error eliminando curso:', error);
      // Fallback local
      this.cursos = this.cursos.filter(c => c.id !== id);
      this.cursosSubject.next([...this.cursos]);
    }
  }

  // Métodos para Contenidos
  getContenidos(): Contenido[] {
    return this.contenidos;
  }

  getContenidosByCurso(cursoId: number): Contenido[] {
    return this.contenidos.filter(c => c.cursoId === cursoId);
  }

  getContenidosByTema(tema: string): Contenido[] {
    return this.contenidos.filter(c => c.tema === tema);
  }

  addContenido(contenido: Contenido): void {
    contenido.id = this.contenidos.length > 0 ? Math.max(...this.contenidos.map(c => c.id)) + 1 : 1;
    this.contenidos.push(contenido);
    this.contenidosSubject.next([...this.contenidos]);
  }

  deleteContenido(id: number): void {
    this.contenidos = this.contenidos.filter(c => c.id !== id);
    this.contenidosSubject.next([...this.contenidos]);
  }
}
