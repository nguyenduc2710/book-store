import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './cart-page/cart-page.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookItemComponent } from './book-list/book-item/book-item.component';
import { LoginAccountComponent } from './account-page/login-account/login-account.component';
import { RegisterAccountComponent } from './account-page/register-account/register-account.component';
import { UserInfoComponent } from './account-page/user-info/user-info.component';
import { NotFoundComponent } from './not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'book', pathMatch: 'full' },
  { path: 'book', component: BookListComponent },
  { path: 'book/:id', component: BookItemComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'register', component: RegisterAccountComponent },
  { path: 'login', component: LoginAccountComponent },
  { path: 'user', component: UserInfoComponent },

  {
    path: 'checkout',
    loadChildren: () => import('./checkout-page/checkout.module').then(m => m.CheckoutModule)
  },
  {
    path: '**', component: NotFoundComponent
  },
  // {
  //   path: 'cart',
  //   loadComponent: () => import('./cart-page/cart-page.component').then(m => m.CartPageComponent)
  // },
  // {
  //   path: 'register',
  //   loadComponent: () => import('./account-page/register-account/register-account.component').then(m => m.RegisterAccountComponent)
  // },
  // {
  //   path: 'login',
  //   loadComponent: () => import('./account-page/login-account/login-account.component').then(m => m.LoginAccountComponent)
  // },
  // {
  //   path: 'user',
  //   loadComponent: () => import('./account-page/user-info/user-info.component').then(m => m.UserInfoComponent)
  // },
  // {
  //   path: 'checkout',
  //   loadComponent: () => import('./checkout-page/checkout-page.component').then(m => m.CheckoutPageComponent)
  // },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
