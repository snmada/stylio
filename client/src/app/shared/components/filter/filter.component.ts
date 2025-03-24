import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ButtonComponent } from '../button/button.component';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-filter',
  imports: [
    CommonModule,
    MatIconModule,
    MatSidenavModule,
    MatExpansionModule,
    MatCheckboxModule,
    ButtonComponent,
    FormsModule,
    MatSliderModule
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Input() drawer: MatDrawer | undefined;
  @Input() filterOptions!: { 
    colors: { id: string, name: string, hex_code: string}[], 
    minPrice: number, 
    maxPrice: number 
  };
  @Input() selectedFilters!: { 
    color: string[], 
    minPrice: number, 
    maxPrice: number 
  };
  @Input() colorCounts: { [colorName: string]: number } = {};
  @Input() totalProducts!: number;
  @Output() filtersChange  = new EventEmitter<any>();

  getTotalProductCount(): number {
    return Object.values(this.colorCounts).reduce((sum, count) => sum + count, 0);
  }
  
  onColorChange(colorId: string): void {
    const index = this.selectedFilters.color.indexOf(colorId);

    if (index === -1) {
      this.selectedFilters.color.push(colorId);
    } else {
      this.selectedFilters.color.splice(index, 1);
    }

    this.applyFilters();
  }

  onStartThumbInput(event: any): void {
    this.selectedFilters.minPrice = event.target.value;
    this.applyFilters();
  }

  onEndThumbInput(event: any): void {
    this.selectedFilters.maxPrice = event.target.value;
    this.applyFilters();
  }

  closeDrawer(): void {
    if (this.drawer) {
      this.drawer.close();
    }
  }

  applyFilters(): void {
    this.filtersChange.emit(this.selectedFilters);
  }

  resetFilters(): void {
    this.selectedFilters.color = [];
    this.selectedFilters.minPrice = this.filterOptions.minPrice;
    this.selectedFilters.maxPrice = this.filterOptions.maxPrice;
    this.applyFilters();
  }
  
  formatLabel(value: number): string {
    return value ? `${value}` : '';
  }
}