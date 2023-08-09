import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router"
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
//Components
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { ProductsManageComponent } from './admin-page/products-manage/products-manage.component';
import { CustomersManageComponent } from './admin-page/customers-manage/customers-manage.component';
import { OrdersManageComponent } from './admin-page/orders-manage/orders-manage.component';
import { TasksManageComponent } from './admin-page/tasks-manage/tasks-manage.component';
//Antd
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';
import { NzInputModule } from 'ng-zorro-antd/input';

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
  NzTreeModule,
  NzTreeSelectModule,
  NzInputModule
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
