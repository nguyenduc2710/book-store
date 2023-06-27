import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { BookItemComponent } from './main-page/book-list/book-item/book-item.component';
import { BookListComponent } from './main-page/book-list/book-list.component';
import { LoginAccountComponent } from './account-page/login-account/login-account.component';
import { RegisterAccountComponent } from './account-page/register-account/register-account.component';
import { UserInfoComponent } from './account-page/user-info/user-info.component';

const routes: Routes = [
  { path: '', redirectTo: 'book', pathMatch: 'full' },
  { path: 'cart', component: CartPageComponent },
  {
    path: 'book', component: BookListComponent,
  },
  { path: 'book/:id', component: BookItemComponent },
  { path: 'register', component: RegisterAccountComponent },
  { path: 'login', component: LoginAccountComponent },
  { path: 'user', component: UserInfoComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
