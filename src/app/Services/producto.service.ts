import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { Producto } from '../Models/Producto';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private http = inject (HttpClient)
  private apiUrl: string = appsettings.apiUrl + "Producto"

  constructor() { }

  Lista () {
    return this.http.get<ProductoService[]>(this.apiUrl); 
  }

  Obtener (productoId: number) {
    return this.http.get<Producto[]>(`${this.apiUrl}/${productoId}`);
  }

  crear (objeto:Producto){
    return this.http.post(this.apiUrl, objeto);
  }

Eliminar (productoId:Producto){
  return this.http.get(`${this.apiUrl}/${productoId}`); 
}

  //guardarSeleccion(Id: number){
    //return this.http.post<Usuario>(this.apiUrl, Id);
  //}
}