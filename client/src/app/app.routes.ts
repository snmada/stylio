import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ShopComponent } from './pages/shop/shop.component';
import { SubcategoryProductsComponent } from './pages/subcategory-products/subcategory-products.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CartComponent } from './pages/cart/cart.component';
import { RegisterComponent } from './pages/authentication/register/register.component';
import { LoginComponent } from './pages/authentication/login/login.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'shop', component: ShopComponent },
    { path: 'shop/:category/:subcategory', component: SubcategoryProductsComponent },
    { path: 'cart', component: CartComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '404', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/404' },
];
