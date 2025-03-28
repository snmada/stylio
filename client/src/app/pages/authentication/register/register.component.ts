import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../../../shared/components/button/button.component';

type FormField = 'firstName' | 'lastName' | 'email' | 'password';

@Component({
  selector: 'app-register',
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
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  hidePassword = true;

  errorMessages: { [key in FormField]: { [key: string]: string } } = {
    firstName: {
      required: 'First Name is required.',
      minlength: 'First Name must be at least 2 characters long.',
      pattern: 'First name should only contain letters and spaces.'
    },
    lastName: {
      required: 'Last Name is required.',
      minlength: 'Last Name must be at least 2 characters long.',
      pattern: 'Last name should only contain letters and spaces.'
    },
    email: {
      required: 'Email is required.',
      email: 'Please enter a valid email address.'
    },
    password: {
      required: 'Password is required.',
      minlength: 'Password must be at least 8 characters long.',
      pattern: 'Password must contain at least one uppercase letter and one digit.'
    }
  }

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[A-Za-z]+(?: [A-Za-z]+)*$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/)
      ]]
    });
  }

  get form() {
    return this.registerForm.controls;
  }

  togglePasswordVisibility() : void {
    this.hidePassword = !this.hidePassword;
  }

  getErrorMessage(field: FormField) : string {
    const control = this.registerForm.get(field);

    if (control?.hasError('required')) {
      return this.errorMessages[field]?.['required'] || 'This field is required.';
    } else if (control?.hasError('minlength')) {
      return this.errorMessages[field]?.['minlength'] || 'This field is too short.';
    } else if (control?.hasError('pattern')) {
      return this.errorMessages[field]?.['pattern'] || 'Invalid format.';
    } else if (control?.hasError('email')) {
      return this.errorMessages[field]?.['email'] || 'Please enter a valid email address.';
    } 
    return '';
  }

  onSubmit() : void {
    console.log(this.registerForm.value);
  }
}