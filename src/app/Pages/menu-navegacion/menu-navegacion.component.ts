import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-menu-navegacion',
  standalone: true,
  imports: [CommonModule, MatIconModule,MatTooltipModule],
  templateUrl: './menu-navegacion.component.html',
  styleUrl: './menu-navegacion.component.css'
})
export class MenuNavegacionComponent implements AfterViewInit {
  
  activeIndex: number = 0;

  menuItems = [
    { icon: 'home', route: '/Inicio' },
    { icon: 'person', route: '/contacto' },
    { icon: 'info', route: '/acerca-de-nosotros' },
    { icon: 'report_problem', route: '/buzon' },
    { icon: 'help', route: '/ayuda' }
  ];

  @ViewChild('menuBorder') menuBorderRef!: ElementRef;
  @ViewChild('menuItemsContainer', { static: false }) menuItemsContainerRef!: ElementRef;

  constructor(private router: Router) {
    // Detectar cambios en la navegación y actualizar la animación
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateActiveIndex();
        this.moveBorder();
      }
    });
  }

  ngAfterViewInit(): void {
    this.updateActiveIndex();
    this.moveBorder();
  }

  setActive(index: number, event: MouseEvent): void {
    this.activeIndex = index;
    this.moveBorder(event.target as HTMLElement);
  }

  moveBorder(activeElement?: HTMLElement): void {
    if (!this.menuBorderRef || !this.menuItemsContainerRef) return;

    // Si no se pasa un elemento, se toma el que corresponde al índice activo
    if (!activeElement) {
      activeElement = this.menuItemsContainerRef.nativeElement.children[this.activeIndex] as HTMLElement;
    }
    
    if (!activeElement) return;

    const menuBorder = this.menuBorderRef.nativeElement;
    const { offsetLeft, offsetWidth } = activeElement;

    menuBorder.style.transform = `translateX(${offsetLeft}px)`;
    menuBorder.style.width = `${offsetWidth}px`;
  }

  navigateTo(route: string): void {
    if (this.router.url === route) return;
    this.router.navigate([route]);
  }

  private updateActiveIndex(): void {
    const currentRoute = this.router.url;
    const foundIndex = this.menuItems.findIndex(item => item.route === currentRoute);
    if (foundIndex !== -1) {
      this.activeIndex = foundIndex;
    }
  }

  getTooltip(icon: string): string {
    switch(icon) {
      case 'home': return 'Inicio';
      case 'person': return 'Contacto';
      case 'info': return 'Acerca de Nosotros';
      case 'report_problem': return 'Buzón de Sugerencias';
      case 'help': return 'Ayuda';
      default: return 'Navegar';
    }
  }

}
