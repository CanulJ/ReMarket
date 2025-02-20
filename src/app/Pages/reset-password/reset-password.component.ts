import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService } from '../../Services/usuario.service';
import { Router } from '@angular/router';  // <-- Importar Router
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'app-reset-password',
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
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private usuarioService: UsuarioService,
    private router: Router  // <-- Inyectar Router
  ) {
    this.resetForm = this.fb.group({
      token: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  submitReset() {
    if (this.resetForm.invalid) {
      this.snackBar.open('Por favor, llena todos los campos correctamente.', 'Cerrar', { duration: 3000 });
      return;
    }

    const { token, newPassword, confirmPassword } = this.resetForm.value;

    if (newPassword !== confirmPassword) {
      this.snackBar.open('Las contraseñas no coinciden.', 'Cerrar', { duration: 3000 });
      return;
    }

    this.isLoading = true;

    this.usuarioService.resetPassword({ token, newPassword, confirmPassword }).subscribe({
      next: () => {
        this.isLoading = false;
        this.snackBar.open('Contraseña restablecida exitosamente.', 'Cerrar', { duration: 3000 });

        // Redirigir al login y pasar el mensaje como estado
        this.router.navigate(['./'], { state: { successMessage: 'Contraseña restablecida exitosamente.' } });

        this.resetForm.reset();
      },
      error: (err) => {
        this.isLoading = false;
        this.snackBar.open(`Error: ${err.error?.message || 'No se pudo restablecer la contraseña.'}`, 'Cerrar', { duration: 5000 });
      }
    });
  }
}
