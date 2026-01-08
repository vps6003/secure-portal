import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { RegisterRequest } from '../../../core/auth/auth.models';
import { NotificationService } from '../../../core/services/notification.service';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  @Output() signupCompleted = new EventEmitter<void>();
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private notify = inject(NotificationService);
  readonly loader = inject(LoaderService);
  private authService = inject(AuthService);

  registerForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      acceptTerms: [false, [Validators.requiredTrue]],
    },
    { validators: this.passwordMatchValidator }
  );

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get acceptTerms() {
    return this.registerForm.get('acceptTerms');
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { name, email, password, confirmPassword } = this.registerForm.value;

      // TODO: Implement actual registration
      console.log('Registration attempt:', { name, email, password, confirmPassword });
      const registerPayload: RegisterRequest = {
        name,
        email,
        password,
        confirmPassword,
      };
      this.authService.authRegister(registerPayload).subscribe({
        next: (response: any) => {
          this.notify.success(response.message);

          setTimeout(() => {
            this.registerForm.reset({
              acceptTerms: false, // reset checkbox explicitly
            });
            this.signupCompleted.emit();
          }, 200);
        },
        error: (err: any) => {
          const errorMsg =
            err?.error?.message || err?.error || err?.message || 'Something went wrong';
          this.notify.error(errorMsg);
        },
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
