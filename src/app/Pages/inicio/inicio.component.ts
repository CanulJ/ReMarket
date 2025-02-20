import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ChatDudasComponent } from '../chat-dudas/chat-dudas.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  menuOpen = false;
  private bottomSheet = inject(MatBottomSheet);
  private isDragging = false;
  private startX = 0;
  private startY = 0;

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
    this.menuOpen = false;
  }

  Irchat() {
    this.router.navigate(['/chat-dudas']);
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
}
