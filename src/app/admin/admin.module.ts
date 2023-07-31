import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router"
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from "@angular/common";
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

const modules = [
  CommonModule
];

const antd = [
  NzLayoutModule,
  NzBreadCrumbModule,
  NzDropDownModule,
  NzIconModule,
  NzAvatarModule,
];

const components = [
  AdminPageComponent
]

const router: Routes = [

]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    ...modules,
    ...antd,
    RouterModule.forChild(router)
  ]
})

export class AdminModule {

}
