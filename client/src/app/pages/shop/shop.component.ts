import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Category } from '../../shared/models/category.model';
import { CategoryService } from '../../core/services/category.service';

@Component({
  selector: 'app-shop',
  imports: [
    NavbarComponent,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
  private categoryService: CategoryService = inject(CategoryService);
  categories: Category[] = [];

  ngOnInit() : void {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {
        console.error('An error occured:', error);
      }
    });
  }
}