import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './local-storage.service';
import { CartItem } from '../../shared/models/cart-item.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private cart: CartItem[] = this.localStorageService.getItem<CartItem[]>('cart') || [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.cart);
  private cartCountSubject = new BehaviorSubject<number>(this.getCartItemCount());

  cart$ = this.cartSubject.asObservable();
  cartCount$ = this.cartCountSubject.asObservable();

  addToCart(item: CartItem) : void {
    const existingItem = this.cart.find((i) => i.id === item.id);

    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cart.push(item);
    }
    this.updateCartState();
  }

  updateQuantity(id: string, quantity: number) : void {
    this.cart = this.cart.map((item) => item.id === id ? { ...item, quantity } : item);
    this.updateCartState();
  }

  removeItem(id: string) : void {
    this.cart = this.cart.filter((item) => item.id !== id);
    this.updateCartState();
  }

  clearCart() : void {
    this.cart = [];
    this.updateCartState();
  }

  updateCartState() : void {
    this.cartSubject.next([...this.cart]);
    this.cartCountSubject.next(this.getCartItemCount());
    this.localStorageService.setItem('cart', this.cart);
  }

  getCartItemCount(): number {
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  getSubtotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  getTax(): number {
    return this.getSubtotal() * 0.1;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTax();
  }
}