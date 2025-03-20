import { inject, NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ContactoService } from '../../Services/contacto.service'; 
import { Contacto } from '../../Models/Usuario';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ChatDudasComponent } from '../chat-dudas/chat-dudas.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MenuNavegacionComponent } from '../menu-navegacion/menu-navegacion.component';

declare var google: any;

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  standalone: true,
  imports: [FormsModule, MatCardModule, MatInputModule, MatFormFieldModule, CommonModule, MatButtonModule, MatDividerModule, MatIconModule,MenuNavegacionComponent]
})
export class ContactoComponent implements OnInit {

  contactData: Contacto = {
    nombre: '',
    email: '',
    mensaje: ''
  };

  private bottomSheet = inject(MatBottomSheet);
  private isDragging = false;
  private startX = 0;
  private startY = 0;

  constructor(private contactoService: ContactoService) {}

  ngOnInit(): void {
    this.initMap();
    this.cargarDatosUsuario();
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

  initMap(): void {
    const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      zoom: 11,
      center: { lat: 18.536374708797556, lng: -92.64676866252324 }
    });

    new google.maps.Marker({
      position: { lat: 40.645037, lng: -73.880224 },
      map: map,
    });
  }

  cargarDatosUsuario() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (user && user.username) {
      // Asignar nombre de usuario y correo a los campos de contacto
      this.contactData.nombre = user.username;
      this.contactData.email = user.email;
    }
  }

  sendForm() {
    if (!this.contactData.nombre || !this.contactData.email || !this.contactData.mensaje) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    this.contactoService.enviarCorreo(this.contactData).subscribe({
      next: () => alert("Mensaje enviado exitosamente."),
      error: () => alert("Error al enviar el mensaje.")
    });
  }

  openChatBotIfNotDragging(event: MouseEvent) {
    if (!this.isDragging) {
      this.openChatBot();
    }
    this.isDragging = false; // Reiniciamos el estado de arrastre
  }

}
