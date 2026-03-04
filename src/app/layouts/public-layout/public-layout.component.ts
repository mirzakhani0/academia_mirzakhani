import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterLink, RouterOutlet, MatIconModule],
  templateUrl: './public-layout.component.html'
})
export class PublicLayoutComponent {
  currentYear = new Date().getFullYear();

  toggleMenu() {
    // Implementar menú móvil después
    console.log('Toggle menu');
  }
}
