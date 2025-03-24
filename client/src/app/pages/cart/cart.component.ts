import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { CartItemComponent } from '../../shared/components/cart-item/cart-item.component';
import { CartItem } from '../../shared/models/cart-item.model';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    NavbarComponent,
    ButtonComponent,
    CartItemComponent
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: CartItem[] = [
    { id: 1, name: 'Product 1', price: 25.50, quantity: 1, image: 'yana-hurska-zeGT9j4ltRA-unsplash.jpg' },
    { id: 2, name: 'Product 2', price: 40.99, quantity: 2, image: 'yana-hurska-zeGT9j4ltRA-unsplash.jpg' }
  ];
  tax: number = 300;

  get subtotalPrice(): number {
    return this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  get totalPrice(): number {
    return this.subtotalPrice + this.tax;
  }

  updateQuantity(event: { id: number, change: number }) : void {
    const item = this.cartItems.find(i => i.id === event.id);
    if (item) {
      item.quantity += event.change;
    }
  }

  removeItem(itemId: number) : void {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
  }
}