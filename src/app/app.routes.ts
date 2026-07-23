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
import { authGuard } from './core/guards/navigateToBlanks/auth.guard';
import { logedGuard } from './core/guards/navigateToLogin/loged.guard';
import { ProductsdetailspageComponent } from './components/pages/blanks/productsdetailspage/productsdetailspage/productsdetailspage.component';
import { ForgetpasswordComponent } from './components/pages/blanks/forgetpassword/forgetpassword.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [logedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full', title: 'Login' },
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
      { path: 'forgetpassword', component: ForgetpasswordComponent, title: 'Register' },
    ],
  },

  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full', title: 'Home' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'products', component: ProductsComponent, title: 'Products'},
      { path: 'cart', component: CartComponent, title: 'Cart' },
      { path: 'brands', component: BrandsComponent, title: 'Brands' },
      { path: 'categories', component: CategoriesComponent, title: 'Categories'},
      { path: 'details/:id', component: ProductsdetailspageComponent, title: 'Product Details'},
    ],
  },

  { path: '**', component: NotfoundComponent, title: 'Not Found' },
];
