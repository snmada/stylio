import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { Category } from '../../shared/models/category.model';
import { CategoryService } from '../../core/services/category.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Subcategory } from '../../shared/models/subcategory.model';
import { SubcategoryPreviewComponent } from '../../shared/components/subcategory-preview/subcategory-preview.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { Product } from '../../shared/models/product.model';
import { ProductService } from '../../core/services/product.services';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SortMenuComponent } from '../../shared/components/sort-menu/sort-menu.component';

@Component({
  selector: 'app-subcategory-products',
  imports: [
    CommonModule,
    RouterModule,
    ButtonComponent,
    NavbarComponent,
    SubcategoryPreviewComponent,
    ProductCardComponent,
    MatPaginatorModule,
    SortMenuComponent
  ],
  templateUrl: './subcategory-products.component.html',
  styleUrl: './subcategory-products.component.scss'
})
export class SubcategoryProductsComponent {
  private categoryService: CategoryService = inject(CategoryService);
  private productService: ProductService = inject(ProductService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  categories: Category[] = [];
  products: Product[] = [];
  subcategory: Subcategory = { id: '', name: '', description: '', image: ''};
  categoryName: string = '';
  subcategoryName: string = '';
  pageIndex: number = 0;
  pageSize: number = 20;
  totalProducts: number = 0;
  selectedSort: string = ''; 

  ngOnInit() : void {
    this.categoryService.getCategories().subscribe({
      next: (response) => {
        this.categories = response;

        this.route.paramMap.subscribe((params) => {
          this.categoryName = params.get('category') || '';
          this.subcategoryName = params.get('subcategory') || '';

          const selectedCategory = this.categories.find(
            (category) => category.name.toLowerCase() === this.categoryName.toLowerCase()
          );
  
          if (!selectedCategory) {
            this.router.navigate(['/404']);
            return;
          }
  
          const selectedSubcategory = selectedCategory.subcategories.find(
            (subcategory) => subcategory.name.toLowerCase() === this.subcategoryName.toLowerCase()
          );
  
          if (!selectedSubcategory) {
            this.router.navigate(['/404']);
            return;
          }
  
          this.subcategory = selectedSubcategory;

          this.loadProducts();
        });
      },
      error: (error) => {
        console.error('An error occured:', error);
      }
    });
  }

  loadProducts() {
    let sortParam = this.selectedSort;

    this.productService.getProductsBySubcategoryId(this.subcategory.id, this.pageIndex, this.pageSize, sortParam).subscribe({
      next: (response) => {
        this.products = response.products;
        this.totalProducts = response.totalCount;
      },
      error: (error) => {
        console.error('An error occured while fetching products:', error);
      }
    });
  }

  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }

  onSortChange(sortOption: any) {
    this.selectedSort = sortOption;
    this.loadProducts();
  }
}