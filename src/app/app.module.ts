import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { BookListComponent } from './main-page/book-list/book-list.component';
import { BookItemComponent } from './main-page/book-list/book-item/book-item.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { PrdItemComponent } from './cart-page/prd-item/prd-item.component';
import { LayoutFooter } from './layout/layout-footer.component';
import { LayoutHeader } from './layout/layout-header.component';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

//Pipe
import { LineBreak } from './shared/line-break.pipe';
import { FilterBook } from './shared/filter-book.pipe';
//Antd Zorro
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDividerModule } from 'ng-zorro-antd/divider';
//FireBase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { firebaseConfig } from './firebaseConfig';
import { BookService } from './services/book.services';
import { RegisterAccountComponent } from './account-page/register-account/register-account.component';
import { LoginAccountComponent } from './account-page/login-account/login-account.component';
import { UserService } from './services/user.service';
import { UserInfoComponent } from './account-page/user-info/user-info.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CartPageComponent,
    BookListComponent,
    BookItemComponent,
    PrdItemComponent,
    LayoutFooter,
    LayoutHeader,
    RegisterAccountComponent,
    LoginAccountComponent,
    UserInfoComponent,
    LineBreak,
    FilterBook,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzButtonModule,
    NzSliderModule,
    NzCarouselModule,
    NzPageHeaderModule,
    NzMenuModule,
    NzInputModule,
    NzIconModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    NzRateModule,
    NzCardModule,
    NzDescriptionsModule,
    NzRadioModule,
    NzInputNumberModule,
    NzImageModule,
    NzGridModule,
    NzDividerModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    BookService,
  ],
  exports: [ReactiveFormsModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
