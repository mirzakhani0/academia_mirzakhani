import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  // Datos de ejemplo
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

  cursos$ = this.cursosSubject.asObservable();
  contenidos$ = this.contenidosSubject.asObservable();

  // Métodos para Cursos
  getCursos(): Curso[] {
    return this.cursos;
  }

  getCursoById(id: number): Curso | undefined {
    return this.cursos.find(c => c.id === id);
  }

  addCurso(curso: Curso): void {
    curso.id = this.cursos.length > 0 ? Math.max(...this.cursos.map(c => c.id)) + 1 : 1;
    this.cursos.push(curso);
    this.cursosSubject.next([...this.cursos]);
  }

  updateCurso(id: number, curso: Curso): void {
    const index = this.cursos.findIndex(c => c.id === id);
    if (index !== -1) {
      this.cursos[index] = curso;
      this.cursosSubject.next([...this.cursos]);
    }
  }

  deleteCurso(id: number): void {
    this.cursos = this.cursos.filter(c => c.id !== id);
    this.cursosSubject.next([...this.cursos]);
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
