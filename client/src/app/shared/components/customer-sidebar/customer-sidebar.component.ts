import { Component, inject } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-sidebar',
  imports: [
    ButtonComponent,
    RouterModule
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