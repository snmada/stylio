import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../../../shared/components/button/button.component';

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
  loginForm: FormGroup;
  hidePassword = true;

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
    console.log(this.loginForm.value);
  }
}