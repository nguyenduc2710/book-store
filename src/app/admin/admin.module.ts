import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from "@angular/common";
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ProductsManageComponent } from './admin-page/products-manage/products-manage.component';
import { CustomersManageComponent } from './admin-page/customers-manage/customers-manage.component';
import { OrdersManageComponent } from './admin-page/orders-manage/orders-manage.component';
import { TasksManageComponent } from './admin-page/tasks-manage/tasks-manage.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule
];

const antd = [
  NzLayoutModule,
  NzBreadCrumbModule,
  NzDropDownModule,
  NzIconModule,
  NzAvatarModule,
  NzDatePickerModule,
  NzStatisticModule,
  NzTableModule,
  NzDividerModule,
  NzFormModule,
  NzButtonModule,
  NzRadioModule,
];

const components = [
  AdminPageComponent,
  ProductsManageComponent,
  CustomersManageComponent,
  OrdersManageComponent,
  TasksManageComponent,
]

const router: Routes = [

]

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    ...modules,
    ...antd,
    RouterModule.forChild(router)
  ]
})

export class AdminModule {

}
