import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  private router = inject(Router);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/home']);
    }
  }
  isLoginMode = signal(true);

  toggleMode() {
    this.isLoginMode.update((mode) => !mode);
  }
}
