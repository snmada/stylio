import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ShopComponent } from './pages/shop/shop.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'shop', component: ShopComponent },
];
