import { Component, Input, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../button/button.component';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [
    CommonModule,
    MatIconModule,
    CurrencyPipe,
    ButtonComponent
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input() description: string = '';
  @Input() price: number = 0;
  @Input() image: string = '';

  private cartService: CartService = inject(CartService);

  addToCart() {
    const item: CartItem = {
      id: this.id,
      name: this.name,
      price: this.price,
      quantity: 1,
      image: this.image,
    };
    this.cartService.addToCart(item);
  }
}