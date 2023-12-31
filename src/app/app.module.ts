import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import en from '@angular/common/locales/en';
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
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

//FireBase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { firebaseConfig } from './firebaseConfig';

//Components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { PrdItemComponent } from './cart-page/prd-item/prd-item.component';
import { LayoutFooter } from './layout/layout-footer.component';
import { LayoutHeader } from './layout/layout-header.component';
import { RegisterAccountComponent } from './account-page/register-account/register-account.component';
import { LoginAccountComponent } from './account-page/login-account/login-account.component';
import { UserInfoComponent } from './account-page/user-info/user-info.component';
import { UserReceiptComponent } from './account-page/user-info/user-receipt/user-receipt.component';

//Modules
import { CheckoutModule } from './checkout-page/checkout.module';
import { BookModule } from './book-list/book.module';
import { AdminModule } from './admin/admin.module';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    CartPageComponent,
    PrdItemComponent,
    LayoutFooter,
    LayoutHeader,
    RegisterAccountComponent,
    LoginAccountComponent,
    UserInfoComponent,
    LineBreak,
    FilterBook,
    UserReceiptComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    BrowserAnimationsModule,
    //firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    //antd zorro
    NzButtonModule,
    NzSliderModule,
    NzCarouselModule,
    NzPageHeaderModule,
    NzMenuModule,
    NzInputModule,
    NzIconModule,
    NzRateModule,
    NzCardModule,
    NzDescriptionsModule,
    NzRadioModule,
    NzInputNumberModule,
    NzImageModule,
    NzGridModule,
    NzDividerModule,
    NzLayoutModule,
    NzBadgeModule,
    NzSelectModule,
    NzListModule,
    NzCollapseModule,
    NzMessageModule,
    //modules
    CheckoutModule,
    BookModule,
    AdminModule,

  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
  ],
  exports: [ReactiveFormsModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
