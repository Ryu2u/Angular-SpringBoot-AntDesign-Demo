import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { WorknoteComponent } from './worknote/worknote.component';
import {NzTableModule} from "ng-zorro-antd/table";
import {CommonModule} from "@angular/common";
import {NzPaginationModule} from "ng-zorro-antd/pagination";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import { SavePageComponent } from './save-page/save-page.component';
import {NzFormModule} from "ng-zorro-antd/form";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzDrawerModule} from "ng-zorro-antd/drawer";
import { DetailsPageComponent } from './details-page/details-page.component';
import {NzMenuModule} from "ng-zorro-antd/menu";
import { EditPageComponent } from './edit-page/edit-page.component';
import {NzCardModule} from "ng-zorro-antd/card";


@NgModule({
  imports: [WelcomeRoutingModule, NzTableModule, CommonModule, NzPaginationModule, NzInputModule, NzButtonModule, NzDatePickerModule, FormsModule, NzBreadCrumbModule, NzFormModule, ReactiveFormsModule, NzSelectModule, NzDrawerModule, NzMenuModule, NzCardModule,],
  declarations: [WelcomeComponent, WorknoteComponent, SavePageComponent, DetailsPageComponent, EditPageComponent],
  exports: [WelcomeComponent]
})
export class WelcomeModule { }
