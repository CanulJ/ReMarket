import { Component, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import { MenuNavegacionComponent } from '../menu-navegacion/menu-navegacion.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ChatDudasComponent } from '../chat-dudas/chat-dudas.component';
import { Carga2Component } from '../carga2/carga2.component';

@Component({
  selector: 'app-ayuda',
  imports: [MatExpansionModule,
            CommonModule,
            MatCardModule,
            MenuNavegacionComponent,
            Carga2Component],
  templateUrl: './ayuda.component.html',
  styleUrl: './ayuda.component.css'
})
export class AyudaComponent {

  isLoading = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false; // Después de 2 segundos, se oculta el cargador
    }, 2000);
  }

  preguntasFrecuentes = [
    { titulo: "¿Cómo me registro en la plataforma?", respuesta: "Para registrarte, haz clic en 'Crear Cuenta' y sigue los pasos." },
    { titulo: "¿Cómo puedo enviar una queja?", respuesta: "En la sección 'Buzón de Quejas', llena el formulario y envía tu solicitud." },
    { titulo: "¿Cómo puedo contactar al soporte?", respuesta: "Puedes usar nuestro chatbot o escribirnos a soporte@ejemplo.com." },
    { titulo: "¿Qué hacer si olvidé mi contraseña?", respuesta: "Haz clic en '¿Olvidaste tu contraseña?', ingresa tu correo y sigue las instrucciones." },
    { titulo: "¿Cuánto tiempo tarda en responder el soporte?", respuesta: "El tiempo de respuesta varía, pero intentamos responder en menos de 24 horas." },
    { titulo: "¿Puedo modificar una queja después de enviarla?", respuesta: "No, pero puedes enviar una nueva haciendo referencia a la anterior." },
    { titulo: "¿Dónde puedo ver el estado de mi queja?", respuesta: "Puedes revisar el estado en la sección 'Mis Quejas' dentro de tu perfil." },
    { titulo: "¿Cómo puedo actualizar mis datos personales?", respuesta: "Entra a tu perfil y selecciona la opción 'Editar Información'." },
    { titulo: "¿Puedo eliminar mi cuenta?", respuesta: "Sí, pero deberás contactar al soporte para confirmar la eliminación." },
    { titulo: "¿Es seguro enviar información a través del buzón de quejas?", respuesta: "Sí, utilizamos encriptación y medidas de seguridad para proteger tus datos." }
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
