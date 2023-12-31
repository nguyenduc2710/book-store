import { NgModule } from "@angular/core";
import { BookListComponent } from "./book-list.component";
import { BookItemComponent } from "./book-item/book-item.component";
import { BrowserModule } from "@angular/platform-browser";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzRateModule } from "ng-zorro-antd/rate";
import { FormsModule } from "@angular/forms";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzImageModule } from "ng-zorro-antd/image";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzIconModule } from "ng-zorro-antd/icon";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzBackTopModule } from "ng-zorro-antd/back-top";

const modules = [
  BrowserModule,
  BrowserAnimationsModule,
  FormsModule,
]

const antd = [
  NzCardModule,
  NzRateModule,
  NzGridModule,
  NzDividerModule,
  NzInputNumberModule,
  NzImageModule,
  NzButtonModule,
  NzIconModule,
  NzTagModule,
  NzBackTopModule,
]
@NgModule({
  declarations: [BookListComponent, BookItemComponent],
  imports: [
    ...modules,
    ...antd
  ]
})
export class BookModule{

}
