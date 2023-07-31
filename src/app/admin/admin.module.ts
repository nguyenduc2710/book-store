import { NgModule } from "@angular/core";
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';

const modules = [

];

const antd = [
  NzLayoutModule,
  NzBreadCrumbModule,
  NzDropDownModule,
  NzIconModule,

];

const components = [
  AdminPageComponent
]

@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    // ...modules,
    ...antd,
  ]
})

export class AdminModule {

}
