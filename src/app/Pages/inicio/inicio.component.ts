import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ChatDudasComponent } from '../chat-dudas/chat-dudas.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingComponent } from '../loading/loading.component';  
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, LoadingComponent,RouterModule,MatCardModule ],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  slides = ['img/camisa-removebg-preview.png', 'img/sudadera-removebg-preview.png', 'img/vestido-removebg-preview.png'];
  currentSlide = 0;
  isTransitioning = false;
  autoSlideInterval: any;
  isLoading = true; // Controla el estado de carga
  
  private bottomSheet = inject(MatBottomSheet);
  private isDragging = false;
  private startX = 0;
  private startY = 0;

  constructor(private router: Router) {
    this.startAutoSlide();
  }

  ngOnInit() {
    // Simula el proceso de carga (aquí puedes agregar tu lógica real de carga, como la obtención de datos)
    setTimeout(() => {
      this.isLoading = false; // Termina la carga después de 2 segundos
    }, 2000);
  }

  changeSlide(direction: number) {
    this.isTransitioning = true; // Activamos la animación

    setTimeout(() => {
      this.currentSlide = (this.currentSlide + direction + this.slides.length) % this.slides.length;
      this.isTransitioning = false; // Terminamos la animación
    }, 500); // Tiempo de animación

    // Reiniciar el temporizador al cambiar manualmente
    this.resetAutoSlide();
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.changeSlide(1);
    }, 5000);
  }

  resetAutoSlide() {
    clearInterval(this.autoSlideInterval); // Detener el temporizador actual
    this.startAutoSlide(); // Iniciar un nuevo temporizador
  }

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
  
  navigateToContact() {
    this.router.navigate(['/contacto']);
  }

  navigateToAcerca() {
    this.router.navigate(['/acerca-de-nosotros']);
  }
}
