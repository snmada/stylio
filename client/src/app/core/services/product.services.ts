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

  getProductsBySubcategoryId(subcategoryId: string) : Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/subcategory/${subcategoryId}`);
  }
}