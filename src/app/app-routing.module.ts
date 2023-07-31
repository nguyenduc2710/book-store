import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './cart-page/cart-page.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookItemComponent } from './book-list/book-item/book-item.component';
import { LoginAccountComponent } from './account-page/login-account/login-account.component';
import { RegisterAccountComponent } from './account-page/register-account/register-account.component';
import { UserInfoComponent } from './account-page/user-info/user-info.component';
import { NotFoundComponent } from './not-found.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';

//Nên chia thành 2 view, user(book, cart, checkout) và admin
const routes: Routes = [
  { path: '', redirectTo: 'book', pathMatch: 'full' },
  { path: 'book', component: BookListComponent, data: { animation: BookListComponent } },
  { path: 'book/:id', component: BookItemComponent, data: { animation: BookItemComponent } },
  { path: 'cart', component: CartPageComponent, data: { animation: CartPageComponent } },
  { path: 'register', component: RegisterAccountComponent, data: { animation: RegisterAccountComponent } },
  { path: 'login', component: LoginAccountComponent, data: { animation: LoginAccountComponent } },
  { path: 'user', component: UserInfoComponent, data: { animation: UserInfoComponent } },
  { path: 'admin', component: AdminPageComponent, data: { animation: AdminPageComponent } },

  {
    path: 'checkout',
    loadChildren: () => import('./checkout-page/checkout.module').then(m => m.CheckoutModule)
  },
  {
    path: '**', component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
