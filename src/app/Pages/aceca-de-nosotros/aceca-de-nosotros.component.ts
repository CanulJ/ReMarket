import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MenuNavegacionComponent } from '../menu-navegacion/menu-navegacion.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { ChatDudasComponent } from '../chat-dudas/chat-dudas.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { PerfilDComponent } from '../perfil-d/perfil-d.component';
import { Carga2Component } from '../carga2/carga2.component';

@Component({
  selector: 'app-aceca-de-nosotros',
  standalone: true,
  imports: [CommonModule, MatCardModule, MenuNavegacionComponent,PerfilDComponent,Carga2Component],
  templateUrl: './aceca-de-nosotros.component.html',
  styleUrl: './aceca-de-nosotros.component.css',
  animations: [   // Agregar la animación aquí
    trigger('fadeIn', [
      transition(':enter', [  // Cuando el elemento entra en la vista
        style({ opacity: 0 }),
        animate('600ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class AcecaDeNosotrosComponent {

  isLoading = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false; // Después de 2 segundos, se oculta el cargador
    }, 2000);
  }

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

  private bottomSheet = inject(MatBottomSheet);
    private isDragging = false;
    private startX = 0;
    private startY = 0;

  openChatBot() {
    this.bottomSheet.open(ChatDudasComponent);
  }

  startDrag(event: MouseEvent) {
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.isDragging = false;

    const elmnt = event.target as HTMLElement;
    let pos1 = 0, pos2 = 0;

    const mouseMoveHandler = (moveEvent: MouseEvent) => {
      if (Math.abs(moveEvent.clientX - this.startX) > 5 || Math.abs(moveEvent.clientY - this.startY) > 5) {
        this.isDragging = true;
      }

      pos1 = this.startX - moveEvent.clientX;
      pos2 = this.startY - moveEvent.clientY;
      this.startX = moveEvent.clientX;
      this.startY = moveEvent.clientY;

      let newTop = elmnt.offsetTop - pos2;
      let newLeft = elmnt.offsetLeft - pos1;

      const maxTop = window.innerHeight - elmnt.offsetHeight;
      const maxLeft = window.innerWidth - elmnt.offsetWidth;

      newTop = Math.max(0, Math.min(newTop, maxTop));
      newLeft = Math.max(0, Math.min(newLeft, maxLeft));

      elmnt.style.top = newTop + "px";
      elmnt.style.left = newLeft + "px";
    };

    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }

  openChatBotIfNotDragging(event: MouseEvent) {
    if (!this.isDragging) {
      this.openChatBot();
    }
    this.isDragging = false; // Reiniciamos el estado de arrastre
  }

}
