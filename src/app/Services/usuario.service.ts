import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { Usuarios } from '../Models/Usuario';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private http = inject (HttpClient)
  private apiUrl: string = appsettings.apiUrl + "Usuarios"

  constructor() { }

  Lista () {
    return this.http.get<Usuarios[]>(this.apiUrl); 
  }

  Obtener (userId: number) {
    return this.http.get<Usuarios>(`${this.apiUrl}/${userId}`);
  }

  crear (objeto:Usuarios){
    return this.http.post(this.apiUrl, objeto);
  }

  editar(objeto:Usuarios){
    return this.http.put(this.apiUrl, objeto);
  }

Eliminar (userId:Usuarios){
  return this.http.get(`${this.apiUrl}/${userId}`); 
}

verificarUsuario(credenciales: { username: string; passwordHash: string }): Observable<{ autenticado: boolean }> {
  return this.http.post<{ autenticado: boolean }>(`${this.apiUrl}/verificarUsuario`, credenciales);
}

solicitarRecuperacion(email: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/solicitarRestablecimientoContraseña`, { email });
}


// **Nuevo método para validar un token de recuperación**
validarToken(token: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/validar-token`, { token });
}

// **Nuevo método para restablecer la contraseña**
restablecerContrasena(data: { token: string; nuevaContrasena: string }): Observable<any> {
  return this.http.post(`${this.apiUrl}/restablecerContraseña`, data);
}

resetPassword(data: { token: string; newPassword: string; confirmPassword: string }) {
  return this.http.post(`${this.apiUrl}/restablecerContraseña`, data);
}
}