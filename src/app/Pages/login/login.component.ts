import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuarioService } from '../../Services/usuario.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet, MatBottomSheetRef, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { FormsModule } from '@angular/forms';
import {MatListModule} from '@angular/material/list';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatBottomSheetModule,
    FormsModule,
    MatButtonModule, MatBottomSheetModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Input() userId: number | null = null;
  public formLogin: FormGroup;
  private _bottomSheet = inject(MatBottomSheet);
  isCaptchaVerified = false;

  constructor(private snackBar: MatSnackBar,
    private usuarioService: UsuarioService,
    private formBuilder: FormBuilder,
    private router: Router) {
    this.formLogin = this.formBuilder.group({
      userId: [{ value: '', disabled: true }],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      passwordHash: ['', [Validators.required]],
      createdAt: [{ value: '', disabled: true }],
      isActive: [{ value: '', disabled: true }]
    });
  }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const successMessage = navigation?.extras.state?.['successMessage'];

    if (successMessage) {
      this.snackBar.open(successMessage, 'Cerrar', { duration: 3000 });
    }

    if (this.userId && this.userId !== 0) {
      this.usuarioService.Obtener(this.userId).subscribe({
        next: (data) => this.formLogin.patchValue(data),
        error: (err) => console.error('Error al obtener usuario:', err.message)
      });
    }
  }

  openBottomSheet(): void {
    const bottomSheetRef = this._bottomSheet.open(CaptchaVerificationComponent);
    bottomSheetRef.afterDismissed().subscribe((result) => {
      this.isCaptchaVerified = result;
    });
  }

  guardar() {
    if (!this.isCaptchaVerified) {
      alert('Por favor, verifica que eres humano.');
      return;
    }

    if (this.formLogin.invalid) {
      alert('Por favor, completa todos los campos requeridos.');
      return;
    }

    const objeto = { ...this.formLogin.getRawValue() };

    if (!this.userId || this.userId === 0) {
      const { userId, createdAt, isActive, ...objetoParaCrear } = objeto;

      this.usuarioService.crear(objetoParaCrear).subscribe({
        next: (data) => {
          if (data) {
            this.router.navigate(['/'], { state: { successMessage: 'Usuario creado con éxito!' } });
          } else {
            alert('Error al crear');
          }
        },
        error: (err) => console.error('Error al crear usuario:', err.message)
      });
    } else {
      this.usuarioService.editar(objeto).subscribe({
        next: (data) => {
          if (data) {
            this.router.navigate(['/'], { state: { successMessage: 'Usuario actualizado con éxito!' } });
          } else {
            alert('Error al editar');
          }
        },
        error: (err) => console.error('Error al editar usuario:', err.message)
      });
    }
  }

  volver() {
    this.router.navigate(['/']);
  }
}

@Component({
  selector: 'captcha-verification',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgIf,MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatBottomSheetModule,
    FormsModule,
    MatButtonModule, MatBottomSheetModule],
  template: `
    <div class="captcha-container">
      <p>Escribe el siguiente código para verificar:</p>
      <strong>{{ captchaCode }}</strong>
      <input [(ngModel)]="userInput" placeholder="Ingresa el CAPTCHA" />
      <button mat-raised-button color="accent" (click)="verifyCaptcha()">Verificar</button>
      <p *ngIf="verificationResult !== ''">{{ verificationResult }}</p>
    </div>
  `,
    styleUrls: ['../captcha-button/captcha-button.component.css']

})
export class CaptchaVerificationComponent {
  captchaCode: string = Math.random().toString(36).substring(2, 8).toUpperCase();
  userInput: string = '';
  verificationResult: string = '';
  private _bottomSheetRef = inject(MatBottomSheetRef<CaptchaVerificationComponent>);

  verifyCaptcha() {
    if (this.userInput.toUpperCase() === this.captchaCode) {
      this.verificationResult = '✅ Verificación exitosa!';
      setTimeout(() => this._bottomSheetRef.dismiss(true), 1000);
    } else {
      this.verificationResult = '❌ Código incorrecto, intenta de nuevo.';
    }
  }
}
