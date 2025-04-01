import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-customer-sidebar',
  imports: [
    ButtonComponent
  ],
  templateUrl: './customer-sidebar.component.html',
  styleUrl: './customer-sidebar.component.scss'
})
export class CustomerSidebarComponent { 
  private authService: AuthService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }
}