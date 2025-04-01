import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { Observable } from 'rxjs';
import { MatBadgeModule } from '@angular/material/badge';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule,
    MatBadgeModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private cartService: CartService = inject(CartService);
  private authService: AuthService = inject(AuthService);

  isMenuOpen: boolean = false;
  cartCount$: Observable<number> = this.cartService.cartCount$;
  isAuthenticated$: Observable<boolean> = this.authService.checkAuth();

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
