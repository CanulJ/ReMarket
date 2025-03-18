import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-aceca-de-nosotros',
  standalone: true,
  imports: [CommonModule,MatCardModule], // Agrega CommonModule aquí
  templateUrl: './aceca-de-nosotros.component.html',
  styleUrl: './aceca-de-nosotros.component.css'
  
})
export class AcecaDeNosotrosComponent {
  values = [
    { icon: '🌱', name: 'Sostenibilidad' },
    { icon: '👕', name: 'Calidad' },
    { icon: '💰', name: 'Accesibilidad' },
    { icon: '🤝', name: 'Conciencia social' }
  ];

  testimonials = [
    { name: 'María López', feedback: 'Excelente calidad y gran iniciativa para reducir el impacto ambiental.' },
    { name: 'Carlos Hernández', feedback: 'Precios accesibles y ropa en muy buen estado, lo recomiendo totalmente.' }
  ];
}
