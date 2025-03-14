import { Injectable } from '@angular/core';
import { Category } from '../../shared/models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  protected categories: Category[] = [
    {
      id: '9f87c67c-a431-4a45-9300-2f7845436736',
      name: 'Textiles',
      subcategories: [
        { id: '6eefd341-299c-4004-89cf-cae9befed647', name: 'Curtains', image: 'jon-tyson-SlpsgiZsSNk-unsplash.jpg' },
        { id: 'b6d5ff09-a396-4c39-840e-16aaa6925a7a', name: 'Cushions', image: 'designecologist-SQuY313aZyA-unsplash.jpg' },
        { id: '894a92d9-95e3-4a38-9920-667da49b3644', name: 'Rugs', image: 'sina-saadatmand-gB9hryu1q40-unsplash.jpg' }
      ]
    },
    {
      id: 'ebd9b52f-f589-434e-8f0d-e0f11c6742e8',
      name: 'Decorative Accessories',
      subcategories: [
        { id: 'ad5fd002-585b-479b-8832-5b1ae3a982ca', name: 'Artificial plants', image: 'galina-n-miziNqvJx5M-unsplash.jpg' },
        { id: '420e8e24-6544-4d4a-b0b3-84a8e7930701', name: 'Vases', image: 'yana-hurska-zeGT9j4ltRA-unsplash.jpg' },
        { id: 'b6ec5cea-4afd-4127-bd8f-a5510a4e3f55', name: 'Wall art', image: 'jonny-caspari-KuudDjBHIlA-unsplash.jpg' }
      ]
    }
  ];

  fetchCategories() : Category[] {
    return this.categories;
  }
}