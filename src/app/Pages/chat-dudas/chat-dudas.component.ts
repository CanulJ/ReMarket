import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-chat-dudas',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-dudas.component.html',
  styleUrls: ['./chat-dudas.component.css']
})
export class ChatDudasComponent {
  userMessage: string = '';
  chatHistory: { sender: string, message: string }[] = [];

  constructor(private bottomSheetRef: MatBottomSheetRef<ChatDudasComponent>) {}

  responses: { keywords: string[], response: string }[] = [
    { keywords: ['compra', 'pedido', 'no ha cargado'], response: 'Lamentamos los inconvenientes. Su solicitud ha sido procesada.' },
    { keywords: ['reembolso', 'devolver'], response: 'Para solicitar un reembolso, por favor contáctenos al soporte.' },
    { keywords: ['rastrear', 'seguimiento', 'dónde está mi pedido'], response: 'Puede rastrear su pedido en la sección "Mis compras".' },
    { keywords: ['hola', 'buenos días', 'saludos'], response: '¡Hola! ¿En qué puedo ayudarte?' }
  ];

  sendMessage() {
    if (!this.userMessage.trim()) return;

    const normalizedMessage = this.normalizeText(this.userMessage);
    this.chatHistory.push({ sender: 'Tú', message: this.userMessage });

    setTimeout(() => {
      const response = this.getResponse(normalizedMessage) || 'Lo sentimos, no entendemos tu pregunta. Intenta reformularla.';
      this.chatHistory.push({ sender: 'Asistente', message: response });
    }, 500);

    this.userMessage = '';
  }

  getResponse(userText: string): string | null {
    for (let entry of this.responses) {
      if (entry.keywords.some(keyword => userText.includes(keyword))) {
        return entry.response;
      }
    }
    return null;
  }

  normalizeText(text: string): string {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  closeChat() {
    this.bottomSheetRef.dismiss();
  }
}
