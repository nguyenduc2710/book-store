import { NgModule } from "@angular/core";
import { CheckoutPageComponent } from "./checkout-page.component";
import { ReviewItemComponent } from "./review-item/review-item.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzPipesModule } from "ng-zorro-antd/pipes";
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';

const ngModules = [
  ReactiveFormsModule,
  CommonModule,

]
const antdZorro = [
  NzCardModule,
  NzBadgeModule,
  NzResultModule,
  NzPipesModule,
  NzButtonModule,
  NzIconModule,
  NzSpinModule,
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
