import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { ShopComponent } from './pages/shop/shop.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'shop', component: ShopComponent },
    { path: '**', component: PageNotFoundComponent},
];
