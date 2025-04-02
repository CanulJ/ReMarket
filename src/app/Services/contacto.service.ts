import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contacto } from '../Models/Usuario';
import { appsettings } from '../Settings/appsettings';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private apiUrl: string = appsettings.apiUrl + "Usuarios"

  constructor(private http: HttpClient) {}

  enviarCorreo(contacto: Contacto): Observable<any> {
    return this.http.post(`${this.apiUrl}/enviarCorreoContacto`, contacto);
  }  

  enviarMensajeBuzon(datos: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/enviarCorreobuzon`, datos)  // Enviar datos al backend
  }
  
}
