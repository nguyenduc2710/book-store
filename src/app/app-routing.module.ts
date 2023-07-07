import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './cart-page/cart-page.component';
import { BookItemComponent } from './main-page/book-list/book-item/book-item.component';
import { BookListComponent } from './main-page/book-list/book-list.component';
import { LoginAccountComponent } from './account-page/login-account/login-account.component';
import { RegisterAccountComponent } from './account-page/register-account/register-account.component';
import { UserInfoComponent } from './account-page/user-info/user-info.component';
import { NotFoundComponent } from './not-found.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'book', pathMatch: 'full' },
  { path: 'book', component: BookListComponent },
  { path: 'book/:id', component: BookItemComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'register', component: RegisterAccountComponent },
  { path: 'login', component: LoginAccountComponent },
  { path: 'user', component: UserInfoComponent },
  { path: 'checkout', component: CheckoutPageComponent},

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
