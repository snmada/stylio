import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CartItemComponent } from '../../shared/components/cart-item/cart-item.component';
import { CartItem } from '../../shared/models/cart-item.model';
import { CartService } from '../../core/services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    RouterModule,
    NavbarComponent,
    ButtonComponent,
    CartItemComponent
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  private cartService: CartService = inject(CartService);

  cartItems: CartItem[] = [];
  cartCount$: Observable<number> = this.cartService.cartCount$;
  subtotalPrice = 0;
  tax = 0;
  totalPrice = 0;

  ngOnInit() {
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
      this.updateCartSummary();
    });
  }

  updateQuantity(item: CartItem, quantity: number) : void {
    if (quantity > 0) {
      this.cartService.updateQuantity(item.id, quantity);
    }
  }

  removeItem(id: string) : void {
    this.cartService.removeItem(id);
  }

  updateCartSummary() : void {
    this.subtotalPrice = this.cartService.getSubtotal();
    this.tax = this.cartService.getTax();
    this.totalPrice = this.cartService.getTotal();
  }
}