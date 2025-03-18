import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../button/button.component';

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
}