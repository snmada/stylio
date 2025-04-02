import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { CustomerSidebarComponent } from '../../shared/components/customer-sidebar/customer-sidebar.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserService } from '../../core/services/user.service';
import { UserProfile } from '../../shared/models/user-profile.model';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

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

  private userService: UserService = inject(UserService);
  private _snackBar = inject(MatSnackBar);

  profileForm: FormGroup;
  errorMessage = '';
  userData: UserProfile = {firstName: '', lastName: '', phoneNumber: '', email: '', shippingAddress: {}};
  isDataModified = false;

  filterCountries() {
    const value = this.countryInput.nativeElement.value?.toLowerCase();
    this.filteredCountries = this.countries.filter(country => country.toLowerCase().startsWith(value));
  }

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
      email: [{ value: '', disabled: true }],
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

    if (value.length === 0) {
      event.target.value = '';
      return;
    }

    if (value.length > 10) {
      value = value.substring(0, 10);
    }

    if (value.length <= 4) {
      value = `(${value}`;
    } else if (value.length <= 7) {
      value = `(${value.substring(0, 4)}) ${value.substring(4)}`;
    } else {
      value = `(${value.substring(0, 4)}) ${value.substring(4, 7)} ${value.substring(7, 10)}`;
    }

    event.target.value = value;
    event.target.dispatchEvent(new Event('input'));
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getUserProfile().subscribe({
      next: (data: UserProfile) => {
        this.userData = {
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber || '', 
          email: data.email,
          shippingAddress: data.shippingAddress || {
            addressLine1: '',
            addressLine2: '',
            city: '',
            country: '',
            postalCode: ''
          }
        };

        this.countryControl.setValue(data.shippingAddress?.country || '');

        this.profileForm.patchValue({
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber || '',
          email: data.email,
          addressLine1: data.shippingAddress?.addressLine1 || '',
          addressLine2: data.shippingAddress?.addressLine2 || '',
          city: data.shippingAddress?.city || '',
          country: data.shippingAddress?.country || '',
          postalCode: data.shippingAddress?.postalCode || ''
        });
      },
      error: (error) => {
        console.error('Error loading profile data', error);
      }
    });
  }

  onFormChange(): void {
    const isModified = (obj1: any, obj2: any, fields: string[]) =>
      fields.some(field => obj1?.[field]?.trim() !== obj2?.[field]?.trim());
  
    this.isDataModified = 
      isModified(this.userData, this.profileForm.value, ['firstName', 'lastName', 'phoneNumber']) ||
      isModified(this.userData.shippingAddress, this.profileForm.value, ['addressLine1', 'addressLine2', 'city', 'country', 'postalCode']);
  }
  

  onCountrySelected(event: MatAutocompleteSelectedEvent) {
    const selectedCountry = event.option.value;

    this.countryControl.setValue(selectedCountry); 
    this.profileForm.patchValue({ country: selectedCountry });
    this.onFormChange()
  }
  
  
  onSubmit(): void {
    if (this.profileForm.invalid || !this.isDataModified) {
      return;
    }

    const updatedData: UserProfile = {
      firstName: this.profileForm.value.firstName,
      lastName: this.profileForm.value.lastName,
      email: this.userData.email,
      phoneNumber: this.profileForm.value.phoneNumber,
      shippingAddress: {
        addressLine1: this.profileForm.value.addressLine1,
        addressLine2: this.profileForm.value.addressLine2,
        city: this.profileForm.value.city,
        country: this.profileForm.value.country,
        postalCode: this.profileForm.value.postalCode,
      }
    };

    this.userService.updateUserProfile(updatedData).subscribe({
      next: () => {
        this.openSnackBar('Profile updated successfully');
      },
      error: (error) => {
        console.error('Error saving profile', error);
      }
    });
  }

  openSnackBar(message: string): MatSnackBarRef<any> {
    return this._snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }  
}