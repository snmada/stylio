import { Injectable, inject } from '@angular/core';
import { Product } from '../../shared/models/product.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getProductsBySubcategoryId(
    subcategoryId: string,
    pageIndex: number, 
    pageSize: number, 
    sortParam: string = '',
    colorFilter: string[] = [],
    priceRange: { minPrice: number, maxPrice: number } = { minPrice: 0, maxPrice: 0 }
  ) : Observable<{ products: Product[], totalCount: number }> {
    let url = `${this.apiUrl}/products/subcategory/${subcategoryId}?pageIndex=${pageIndex}&pageSize=${pageSize}`;

    if (sortParam) {
      url += `&sortParam=${sortParam}`;
    }
  
    if (colorFilter.length > 0) {
      url += `&colors=${colorFilter.join(',')}`;
    }
  
    if (priceRange.minPrice || priceRange.maxPrice) {
      url += `&minPrice=${priceRange.minPrice}&maxPrice=${priceRange.maxPrice}`;
    }
  
    return this.http.get<{ products: Product[], totalCount: number }>(url);
  }
}