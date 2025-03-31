import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest, AuthResponse } from '../../../shared/models/auth.model';
import { Router } from '@angular/router';

type FormField = 'email' | 'password';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    ButtonComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  loginForm: FormGroup;
  hidePassword = true;
  errorMessage = '';

  errorMessages: { [key in FormField]: { [key: string]: string } } = {
    email: {
      required: 'Email is required.',
      email: 'Please enter a valid email address.'
    },
    password: {
      required: 'Password is required.',
    }
  }

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
      ]]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });
  }

  get form() {
    return this.loginForm.controls;
  }

  togglePasswordVisibility() : void {
    this.hidePassword = !this.hidePassword;
  }

  getErrorMessage(field: FormField) : string {
    const control = this.loginForm.get(field);

    if (control?.hasError('required')) {
      return this.errorMessages[field]?.['required'] || 'This field is required.';
    } else if (control?.hasError('email')) {
      return this.errorMessages[field]?.['email'] || 'Please enter a valid email address.';
    } 
    return '';
  }

  onSubmit() : void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const loginData: LoginRequest = { email, password };

      this.authService.login(loginData).subscribe({
        next: () => {
          this.router.navigate(['/orders']);
        },
        error: (error) => {
          this.errorMessage = error.message;
        }
      });
    }
  }
}