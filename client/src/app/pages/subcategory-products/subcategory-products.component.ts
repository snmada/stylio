import { Component, inject } from '@angular/core';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { Category } from '../../shared/models/category.model';
import { CategoryService } from '../../core/services/category.service';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { Subcategory } from '../../shared/models/subcategory.model';
import { SubcategoryPreviewComponent } from '../../shared/components/subcategory-preview/subcategory-preview.component';

@Component({
  selector: 'app-subcategory-products',
  imports: [
    RouterModule,
    ButtonComponent,
    NavbarComponent,
    SubcategoryPreviewComponent
  ],
  templateUrl: './subcategory-products.component.html',
  styleUrl: './subcategory-products.component.scss'
})
export class SubcategoryProductsComponent {
  private categoryService: CategoryService = inject(CategoryService);
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);

  categories: Category[] = [];
  subcategory: Subcategory = { id: '', name: '', description: '', image: ''};
  categoryName: string = '';
  subcategoryName: string = '';

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
        });
      },
      error: (error) => {
        console.error('An error occured:', error);
      }
    });
  }
}