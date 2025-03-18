import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ShopComponent } from './pages/shop/shop.component';
import { SubcategoryProductsComponent } from './pages/subcategory-products/subcategory-products.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'shop/:category/:subcategory', component: SubcategoryProductsComponent},
    { path: '404', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/404' },
];
