import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-sort-menu',
  imports: [
    CommonModule,
    MatIconModule,
    ButtonComponent
  ],
  templateUrl: './sort-menu.component.html',
  styleUrl: './sort-menu.component.scss'
})
export class SortMenuComponent {
  isMenuOpen = false;
  selectedSort: string | null = null;
  sortOptions = [
    { label: 'Product Name: A - Z', value: 'name-asc' },
    { label: 'Product Name: Z - A', value: 'name-desc' },
    { label: 'Price: Low - High', value: 'price-asc' },
    { label: 'Price: High - Low', value: 'price-desc' }
  ];

  @Output() sortChanged = new EventEmitter<string>();

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onSortOptionSelected(option: any) {
    this.selectedSort = option.label;
    this.sortChanged.emit(option.value);
  }
}