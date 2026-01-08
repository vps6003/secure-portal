import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { AuthLogin, LoginResponse } from '../../../core/auth/auth.models';
import { LoaderService } from '../../../core/services/loader.service';
import { NotificationService } from '../../../core/services/notification.service';
import { SessionManager } from '../../../core/auth/session.manager';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);
  readonly loader = inject(LoaderService);

  private notify = inject(NotificationService);
  private sessionManager = inject(SessionManager);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [false],
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password, rememberMe } = this.loginForm.value;

      // TODO: Implement actual authentication
      // console.log('Login attempt:', { email, password, rememberMe });
      const loginObj: AuthLogin = {
        email,
        password,
      };
      this.authService.authLogin(loginObj).subscribe({
        next: (response: LoginResponse) => {
          // console.log(response);
          this.notify.success('Login Successful!!');
          this.sessionManager.startSession(response);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.log(err);
        },
      });

      // // Simulate API call
      // setTimeout(() => {
      //   this.isSubmitting = false;
      //   // this.router.navigate(['/dashboard']);
      // }, 1000);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
