import { NgModule, Pipe } from "@angular/core";
import { CheckoutPageComponent } from "./checkout-page.component";
import { ReviewItemComponent } from "./review-item/review-item.component";
import { ReactiveFormsModule } from "@angular/forms";
import { NzPipesModule } from "ng-zorro-antd/pipes";
import { CommonModule } from "@angular/common";
import { NzCardModule } from "ng-zorro-antd/card";
import { RouterModule, Routes } from "@angular/router";

const ngModules = [
  ReactiveFormsModule,
  NzPipesModule,
  CommonModule,
]
const antdZorro = [
  NzCardModule
];
const router: Routes = [
  { path: '', component: CheckoutPageComponent },
  { path: 'item', component: ReviewItemComponent }
]

@NgModule({
  declarations: [
    CheckoutPageComponent,
    ReviewItemComponent
  ],
  imports: [
    ...ngModules,
    ...antdZorro,
    RouterModule.forChild(router)
  ],
  exports: []
})
export class CheckoutModule {

}
