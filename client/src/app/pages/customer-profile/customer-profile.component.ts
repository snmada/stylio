import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { CustomerSidebarComponent } from '../../shared/components/customer-sidebar/customer-sidebar.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';

type FormField = 'firstName' | 'lastName' | 'phoneNumber' | 'postalCode';

@Component({
  selector: 'app-customer-profile',
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    LayoutComponent,
    CustomerSidebarComponent,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    ButtonComponent,
    FormsModule,
    MatAutocompleteModule,
    MatTooltipModule
  ],
  templateUrl: './customer-profile.component.html',
  styleUrl: './customer-profile.component.scss'
})
export class CustomerProfileComponent {
  @ViewChild('countryInput') countryInput!: ElementRef<HTMLInputElement>;
  countries: string[] = ['Spain', 'Italy', 'Greece', 'France', 'Germany'];
  countryControl = new FormControl('');
  filteredCountries: string[];

  filterCountries() {
    const value = this.countryInput.nativeElement.value?.toLowerCase();
    this.filteredCountries = this.countries.filter(country => country.toLowerCase().startsWith(value));
  }

  profileForm: FormGroup;
  errorMessage = '';

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
    phoneNumber: {
      pattern: 'Phone Number must be 10 digits.'
    },
    postalCode: {
      pattern: 'Postal Code must be 6 digits.'
    }
  }

  constructor(private fb: FormBuilder) {
    this.filteredCountries = this.countries.slice();

    this.profileForm = this.fb.group({
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
      phoneNumber: ['', [
        Validators.pattern(/^\(\d{4}\)\s\d{3}\s\d{3}$/)
      ]],
      email: [''],
      addressLine1: [''],
      addressLine2: [''],
      city: [''],
      country: [''],
      postalCode: ['', [
        Validators.pattern(/^\d{6}$/)
      ]]
    });

    this.profileForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
    });

    this.profileForm.get('email')?.disable();
  }

  get form() {
    return this.profileForm.controls;
  }

  getErrorMessage(field: FormField): string {
    const control = this.profileForm.get(field);

    if (control?.hasError('required')) {
      return this.errorMessages[field]?.['required'] || 'This field is required.';
    } else if (control?.hasError('minlength')) {
      return this.errorMessages[field]?.['minlength'] || 'This field is too short.';
    } else if (control?.hasError('pattern')) {
      return this.errorMessages[field]?.['pattern'] || 'Invalid format.';
    }
    return '';
  }

  onPhoneInput(event: any): void {
    let value = event.target.value;
    value = value.replace(/\D/g, '');

    if (value.length <= 4) {
      value = `(${value}`;
    } else if (value.length <= 7) {
      value = `(${value.substring(0, 4)}) ${value.substring(4)}`;
    } else {
      value = `(${value.substring(0, 4)}) ${value.substring(4, 7)} ${value.substring(7, 10)}`;
    }

    event.target.value = value;
  }

  onSubmit(): void {
    console.log(this.profileForm.value);
  }
}