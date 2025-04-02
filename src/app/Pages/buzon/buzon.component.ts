import { inject, NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ContactoService } from '../../Services/contacto.service';
import { MenuNavegacionComponent } from '../menu-navegacion/menu-navegacion.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ChatDudasComponent } from '../chat-dudas/chat-dudas.component';
import { Carga2Component } from '../carga2/carga2.component';

@Component({
  selector: 'app-buzon',
  templateUrl: './buzon.component.html',
  styleUrls: ['./buzon.component.css'],
  standalone: true,
  imports: [FormsModule,
            MatCardModule,
            MatInputModule,
            MatFormFieldModule,
            CommonModule,
            MatButtonModule, 
            MatDividerModule, 
            MatIconModule,
            MatSelectModule,  
            MatOptionModule,
            MenuNavegacionComponent,
            Carga2Component]
})
export class BuzonComponent implements OnInit {

  isLoading = true;

  // Datos de la queja o sugerencia
  quejaSugerenciaData = {
    nombre: '',
    email: '',
    mensaje: '',
    tipo: 'Queja' // Puede ser "Queja" o "Sugerencia"
  };

 private bottomSheet = inject(MatBottomSheet);
    private isDragging = false;
    private startX = 0;
    private startY = 0;

  constructor(private buzonesService: ContactoService) {}

  ngOnInit(): void {
    this.cargarDatosUsuario();
    setTimeout(() => {
      this.isLoading = false; // Después de 2 segundos, se oculta el cargador
    }, 2000);
  }

  // Cargar los datos del usuario si están disponibles en sessionStorage
  cargarDatosUsuario() {
    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    if (user && user.username) {
      this.quejaSugerenciaData.nombre = user.username;
      this.quejaSugerenciaData.email = user.email;
    }
  }

  // Enviar la queja o sugerencia
  sendForm() {
    if (!this.quejaSugerenciaData.nombre || !this.quejaSugerenciaData.email || !this.quejaSugerenciaData.mensaje) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    // Llamar al servicio para enviar la queja/sugerencia a la API
    this.buzonesService.enviarMensajeBuzon(this.quejaSugerenciaData).subscribe({
      next: () => {
        alert("¡Gracias por tu sugerencia/queja! Hemos recibido tu mensaje.");
        
        // Limpiar el formulario
        this.quejaSugerenciaData = { nombre: '', email: '', mensaje: '', tipo: 'Queja' };
      },
      error: (err) => {
        alert("Hubo un error al enviar el mensaje. Intenta nuevamente.");
      }
    });
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
