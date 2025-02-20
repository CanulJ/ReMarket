import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../../Services/usuario.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

/** Interfaz para definir la respuesta del backend */
interface RespuestaLogin {
  autenticado: boolean;
  mensaje?: string; // Opcional para evitar errores si el backend no lo envía
}

@Component({
  selector: 'app-sesion-i',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule, 
    MatIconModule
  ],
  templateUrl: './sesion-i.component.html',
  styleUrls: ['./sesion-i.component.css'],
})
export class SesionIComponent {
  public formLogin: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) {
    // Crear el formulario de inicio de sesión
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required]], // Campo obligatorio para el usuario o correo
      passwordHash: ['', [Validators.required]], // Campo obligatorio para la contraseña
    });
  }

  iniciarSesion() {
    const credenciales = this.formLogin.value; // Obtiene los datos del formulario

    this.usuarioService.verificarUsuario(credenciales).subscribe({
      next: (respuesta: RespuestaLogin) => {
        if (respuesta.autenticado) {
          alert(respuesta.mensaje ?? 'Inicio de sesión exitoso'); // Si mensaje no existe, usa el texto por defecto
          this.router.navigate(['/Inicio']); // Redirige a la página principal
        } else {
          alert('Credenciales incorrectas'); // Mensaje cuando no se autentica
        }
      },
      error: (error) => {
        console.error('Error al verificar usuario:', error);
        alert(error.error?.mensaje || 'Error en la solicitud'); // Manejo de errores con seguridad
      }
    });
  }

  irARegistro() {
    this.router.navigate(["/Login"]);
  }
  
  irARecuperarContrasena() {
    this.router.navigate(["recuperacion"]);
  }
}
