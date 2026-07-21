import { Routes } from '@angular/router';

import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layout/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/pages/blanks/notfound/notfound.component';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { RegisterComponent } from './components/pages/auth/register/register.component';
import { HomeComponent } from './components/pages/blanks/home/home.component';
import { ProductsComponent } from './components/pages/blanks/products/products.component';
import { CartComponent } from './components/pages/blanks/cart/cart.component';
import { BrandsComponent } from './components/pages/blanks/brands/brands.component';
import { CategoriesComponent } from './components/pages/blanks/categories/categories.component';

export const routes: Routes = [
    { path: '', component: AuthLayoutComponent, children: [
        { path: '', redirectTo: 'login', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent }
    ]},

    { path: '', component: BlankLayoutComponent, children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: HomeComponent },
        { path: 'products', component: ProductsComponent },
        { path: 'cart', component: CartComponent },
        { path: 'brands', component: BrandsComponent },
        { path: 'categories', component: CategoriesComponent },

    ]},

    { path: '**', component: NotfoundComponent }
];
