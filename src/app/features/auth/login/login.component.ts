import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false],
  });

  isSubmitting = false;

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      const { email, password, rememberMe } = this.loginForm.value;

      // TODO: Implement actual authentication
      console.log('Login attempt:', { email, password, rememberMe });

      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        // this.router.navigate(['/dashboard']);
      }, 1000);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
