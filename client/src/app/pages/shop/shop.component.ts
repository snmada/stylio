import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Category } from '../../shared/models/category.model';
import { CategoryService } from '../../core/services/category.service';
import { RouterModule } from '@angular/router';
import { SubcategoryPreviewComponent } from '../../shared/components/subcategory-preview/subcategory-preview.component';
import { LayoutComponent } from '../../shared/components/layout/layout.component';

@Component({
  selector: 'app-shop',
  imports: [
    CommonModule,
    RouterModule,
    SubcategoryPreviewComponent,
    LayoutComponent
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