import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { TablerIconsModule } from 'angular-tabler-icons';

interface stats {
  id: number;
  color: string;
  title: string;
  subtitle: string;
  img: string;
  percent: string;
}

interface stats2 {
  id: number;
  time: string;
  color: string;
  title?: string;
  subtext?: string;
  link?: string;
}


@Component({
  selector: 'app-upcoming-schedules',
  imports: [MatCardModule, MatChipsModule, TablerIconsModule, MatButtonModule, MatIconModule],
  templateUrl: './upcoming-schedules.component.html',
})
export class AppUpcomingSchedulesComponent {
  constructor() { }

  stats: stats[] = [
    {
      id: 1,
      color: 'primary',
      title: 'Paypal',
      subtitle: 'Big Brands',
      img: 'assets/images/svgs/icon-paypal.svg',
      percent: '6235',
    },
    {
      id: 2,
      color: 'success',
      title: 'Wallet',
      subtitle: 'Bill payment',
      img: 'assets/images/svgs/icon-office-bag.svg',
      percent: '345',
    },
    {
      id: 3,
      color: 'warning',
      title: 'Credit Card',
      subtitle: 'Money reversed',
      img: 'assets/images/svgs/icon-master-card.svg',
      percent: '2235',
    },
    {
      id: 4,
      color: 'error',
      title: 'Refund',
      subtitle: 'Bill Payment',
      img: 'assets/images/svgs/icon-pie.svg',
      percent: '32',
    },
  ];

  stats2: stats2[] = [
    {
      id: 1,
      time: '09:30 am',
      color: 'primary',
      subtext: 'Inscripción confirmada: Juan Pérez - Curso Matemáticas',
    },
    {
      id: 2,
      time: '10:30 am',
      color: 'accent',
      title: 'Nueva venta registrada',
      link: '#MAT-5678',
    },
    {
      id: 3,
      time: '12:30 pm',
      color: 'success',
      subtext: 'Pago recibido de $45.00 - María García',
    },
    {
      id: 4,
      time: '01:00 pm',
      color: 'warning',
      title: 'Clase en vivo grabada y subida',
      link: '#FIS-1234',
    },
    {
      id: 5,
      time: '02:30 pm',
      color: 'error',
      title: 'Nuevo alumno registrado en la plataforma',
      link: '#USU-8890',
    },
    {
      id: 6,
      time: '04:00 pm',
      color: 'success',
      subtext: 'Tarea entregada por el alumno Carlos Ruiz',
    },
  ];
}
