import { Component, inject, ViewChild } from '@angular/core';
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
import { ProductService } from '../../core/services/product.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SortMenuComponent } from '../../shared/components/sort-menu/sort-menu.component';
import { MatSidenavModule, MatDrawer } from '@angular/material/sidenav';
import { FilterComponent } from '../../shared/components/filter/filter.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    SortMenuComponent,
    MatSidenavModule,
    FilterComponent,
    MatProgressSpinnerModule
  ],
  templateUrl: './subcategory-products.component.html',
  styleUrl: './subcategory-products.component.scss'
})
export class SubcategoryProductsComponent {
  @ViewChild('drawer') drawer: MatDrawer | undefined;

  private categoryService: CategoryService = inject(CategoryService);
  private productService: ProductService = inject(ProductService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  categories: Category[] = [];
  products: Product[] = [];
  initialProducts: Product[] = [];
  subcategory: Subcategory = { id: '', name: '', description: '', image: ''};
  categoryName: string = '';
  subcategoryName: string = '';
  pageIndex: number = 0;
  pageSize: number = 20;
  totalProducts: number = 0;
  selectedSort: string = ''; 
  filtersExtracted: boolean = false;
  colorCounts: { [colorName: string]: number } = {};
  selectedFilters = {
    color:  [] as string[],
    minPrice: 0,
    maxPrice: 0,
  };
  filterOptions = {
    colors: [] as { id: string, name: string, hex_code: string }[], 
    minPrice: 0,
    maxPrice: 0,
  };
  isLoading: boolean = true;

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
  
  loadProducts() : void {
    this.isLoading = true;

    const sortParam = this.selectedSort;
    const colorFilter = this.selectedFilters.color;
    const priceRangeFilter = { 
      minPrice: this.selectedFilters.minPrice, 
      maxPrice: this.selectedFilters.maxPrice 
    };

    this.productService.getProductsBySubcategoryId(
      this.subcategory.id, 
      this.pageIndex, 
      this.pageSize, 
      sortParam,
      colorFilter,
      priceRangeFilter
    ).subscribe({
      next: (response) => {
        this.products = response.products;
        this.totalProducts = response.totalCount;
        this.isLoading = false;

        if (!this.filtersExtracted) {
          this.initialProducts = response.products;
          this.colorCounts = this.getColorCounts(this.initialProducts);
          this.extractFilterOptions();
          this.filtersExtracted = true;
        }

        if(priceRangeFilter.minPrice != this.filterOptions.minPrice || priceRangeFilter.maxPrice != this.filterOptions.maxPrice){
          this.colorCounts = this.getColorCounts(this.products);
        }

        if(priceRangeFilter.minPrice == this.filterOptions.minPrice && priceRangeFilter.maxPrice == this.filterOptions.maxPrice){
          this.colorCounts = this.getColorCounts(this.initialProducts);
        }
      },
      error: (error) => {
        console.error('An error occured while fetching products:', error);
        this.isLoading = false;
      }
    });
  }

  onPageChange(event: any) : void{
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProducts();
  }

  onSortChange(sortOption: any) : void {
    this.selectedSort = sortOption;
    this.loadProducts();
  }

  getColorCounts(products: Product[] = []): { [colorName: string]: number } {
    return products.reduce((acc, product) => {
      if (product.color && product.color.name) {
        acc[product.color.name] = (acc[product.color.name] || 0) + 1;
      }
      return acc;
    }, {} as { [colorName: string]: number });
  }

  onFiltersChange(filters: any): void {
    this.selectedFilters = filters;
    this.loadProducts();
  }

  openDrawer() : void {
    if (this.drawer) {
      this.drawer.open();
    }
  }

  extractFilterOptions() {
    let minPrice = Infinity;
    let maxPrice = -Infinity;

    this.products.forEach((product) => {
      if (product.color && !this.filterOptions.colors.some(color => color.id === product.color.id)) {
        this.filterOptions.colors.push(product.color);
      }

      minPrice = Math.min(minPrice, product.price);
      maxPrice = Math.max(maxPrice, product.price);
    });

    this.filterOptions.minPrice = this.selectedFilters.minPrice = Math.floor(minPrice);
    this.filterOptions.maxPrice = this.selectedFilters.maxPrice =  Math.ceil(maxPrice);
  }
}