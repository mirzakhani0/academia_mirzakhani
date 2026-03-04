import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

interface Curso {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  gradiente: string;
  icono: string;
  tipo: 'CLASE GRABADA' | 'MATERIAL PDF';
  duracion: string;
  nivel: 'Básico' | 'Intermedio' | 'Avanzado';
  categoria: 'Matemáticas' | 'Física';
}

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule],
  templateUrl: './cursos.component.html',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px) scale(0.95)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-30px) scale(0.95)' }))
      ])
    ])
  ]
})
export class CursosComponent {
  searchTerm: string = '';
  categoriaSeleccionada: string = 'Todos';
  
  cursos: Curso[] = [
    {
      id: 1,
      titulo: 'Álgebra Lineal: Dominio Total',
      descripcion: 'De matrices a espacios vectoriales. Incluye 20 horas de video y resolución de exámenes pasados.',
      precio: 45.00,
      gradiente: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)', // Naranja a Rojo
      icono: 'functions',
      tipo: 'CLASE GRABADA',
      duracion: '20h de contenido',
      nivel: 'Intermedio',
      categoria: 'Matemáticas'
    },
    {
      id: 2,
      titulo: 'Pack: Cálculo Diferencial',
      descripcion: 'La guía definitiva en PDF con 200 ejercicios resueltos y trucos para derivar rápido.',
      precio: 25.00,
      gradiente: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)', // Naranja Suave
      icono: 'description',
      tipo: 'MATERIAL PDF',
      duracion: '120 páginas',
      nivel: 'Avanzado',
      categoria: 'Matemáticas'
    },
    {
      id: 3,
      titulo: 'Física I: Mecánica y Estática',
      descripcion: 'Domina los diagramas de cuerpo libre y las leyes de Newton con un método 100% visual.',
      precio: 39.00,
      gradiente: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)', // Dorado/Ámbar
      icono: 'rocket_launch',
      tipo: 'CLASE GRABADA',
      duracion: '15h de video',
      nivel: 'Básico',
      categoria: 'Física'
    }
  ];

  cursoSeleccionado: Curso | null = null;
  mostrarFormularioPago = false;
  nombreAlumno = '';
  correoAlumno = '';
  telefonoAlumno = '';
  errorValidacion = false;

  get cursosFiltrados() {
    return this.cursos.filter(c => {
      const matchSearch = c.titulo.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchCat = this.categoriaSeleccionada === 'Todos' || c.categoria === this.categoriaSeleccionada;
      return matchSearch && matchCat;
    });
  }

  comprar(curso: Curso) {
    this.cursoSeleccionado = curso;
    this.mostrarFormularioPago = true;
    this.errorValidacion = false;
  }

  confirmarPago() {
    if (this.nombreAlumno && this.correoAlumno) {
      this.errorValidacion = false;
      alert(`¡Registro Exitoso! Hola ${this.nombreAlumno}. Procederemos a validar tu acceso.`);
      this.cancelarPago();
    } else {
      this.errorValidacion = true;
      setTimeout(() => this.errorValidacion = false, 3000);
    }
  }

  cancelarPago() {
    this.mostrarFormularioPago = false;
    this.cursoSeleccionado = null;
    this.nombreAlumno = '';
    this.correoAlumno = '';
    this.telefonoAlumno = '';
    this.errorValidacion = false;
  }
}
