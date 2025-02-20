import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from '../../Services/usuario.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recuperacion',
  imports: [
      CommonModule,
      MatFormFieldModule,
      MatInputModule,
      ReactiveFormsModule,
      MatCardModule,
      MatButtonModule,
      MatDividerModule, 
      MatIconModule,
      MatProgressBarModule
    ],
  templateUrl: './recuperacion.component.html',
  styleUrls: ['./recuperacion.component.css'],
})
export class RecuperacionComponent {
  recuperacionForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private router: Router // Inyectar Router
  ) {
    // Inicializamos el formulario reactivo
    this.recuperacionForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  // Método para enviar la solicitud de recuperación de contraseña
  enviarSolicitud(): void {
    if (this.recuperacionForm.invalid) {
      this.snackBar.open('Por favor, ingresa un correo válido.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    this.isLoading = true;

    const email = this.recuperacionForm.value.email;
    this.usuarioService.solicitarRecuperacion(email).subscribe({
      next: () => {
        this.snackBar.open(
          'Correo de recuperación enviado correctamente.',
          'Cerrar',
          { duration: 5000 }
        );
        this.isLoading = false;
        this.recuperacionForm.reset();
        this.router.navigate(['/reset-password']);
      },
      error: () => {
        this.snackBar.open(
          'Ocurrió un error al enviar el correo. Intenta nuevamente.',
          'Cerrar',
          { duration: 5000 }
        );
        this.isLoading = false;
      },
    });
  }
}
