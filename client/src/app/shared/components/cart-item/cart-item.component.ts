import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../button/button.component';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart-item',
  imports: [
    CommonModule,
    ButtonComponent
  ],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  @Input() item!: CartItem;
  @Output() quantityChanged = new EventEmitter<number>();
  @Output() remove = new EventEmitter<void>();

  increaseQuantity() : void {
    this.quantityChanged.emit(this.item.quantity + 1);
  }

  decreaseQuantity() : void {
    if (this.item.quantity > 1) {
      this.quantityChanged.emit(this.item.quantity - 1);
    }
  }

  removeItem() : void {
    this.remove.emit();
  }
}