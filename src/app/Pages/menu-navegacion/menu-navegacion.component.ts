import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';  // Asegúrate de importar el Router
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-menu-navegacion',
  imports: [CommonModule, MatIconModule],
  templateUrl: './menu-navegacion.component.html',
  styleUrl: './menu-navegacion.component.css'
})
export class MenuNavegacionComponent implements AfterViewInit {

  activeIndex: number = 0;

  menuItems = [
    { icon: 'home', route: '/Inicio' },
    { icon: 'person', route: '/contacto' },
    { icon: 'settings', route: '/configuracion' },
    { icon: 'favorite', route: '/acerca-de-nosotros' },
    { icon: 'search', route: '/buscar' }
  ];

  @ViewChild('menuBorder') menuBorderRef!: ElementRef;

  constructor(private router: Router) {}  // Inyectamos el Router

  ngAfterViewInit(): void {
    this.moveBorder();
  }

  setActive(index: number, event: MouseEvent): void {
    this.activeIndex = index;
    const route = this.menuItems[index].route;
  
    if (this.router.url !== route) {
      this.moveBorder(event.target as HTMLElement);  // Mueve el borde solo si la ruta cambia
    }
  }
  

  moveBorder(activeElement?: HTMLElement): void {
    if (!this.menuBorderRef || !activeElement) return;

    const menuBorder = this.menuBorderRef.nativeElement;
    const { offsetLeft, offsetWidth } = activeElement;

    menuBorder.style.transform = `translateX(${offsetLeft}px)`;
    menuBorder.style.width = `${offsetWidth}px`;
  }

  // Método de navegación a la ruta correspondiente
  navigateTo(route: string): void {
    if (this.router.url === route) {
      return;  // No hacemos nada si la ruta ya es la misma
    }
    this.router.navigate([route]);  // Navegamos a la ruta proporcionada
  }
  
}
