import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NZ_I18N} from 'ng-zorro-antd/i18n';
import {zh_CN} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {IconsProviderModule} from './icons-provider.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzSliderModule} from "ng-zorro-antd/slider";
import {DetailsPageComponent} from "./pages/welcome/details-page/details-page.component";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDividerModule} from "ng-zorro-antd/divider";

import {NzMessageService} from "ng-zorro-antd/message";
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";

import {NzInputNumberModule} from "ng-zorro-antd/input-number";
import {NzAffixModule} from "ng-zorro-antd/affix";
import {WorkReportComponent} from './pages/week-report/work-report.component';
import {WeekSearchComponent} from './pages/week-search/week-search.component';
import {WeekDetailComponent} from './pages/week-detail/week-detail.component';
import {WeekApproveComponent} from './pages/week-approve/week-approve.component';
import {LoginComponent} from './pages/login/login.component';
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {HttpConfigInterceptor} from "./pages/HttpConfigInterceptor";
import { IndexComponent } from './pages/index/index.component';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    WorkReportComponent,
    WeekSearchComponent,
    WeekDetailComponent,
    WeekApproveComponent,
    LoginComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
    NzSpaceModule,
    NzSliderModule,
    NzFormModule,
    ReactiveFormsModule,
    NzCardModule,
    NzInputModule,
    NzSelectModule,
    NzDatePickerModule,
    NzTableModule,
    NzDividerModule,
    NzPopconfirmModule,
    NzInputNumberModule,
    NzAffixModule,
    NzCheckboxModule,

  ],
  providers: [
    {provide: NZ_I18N, useValue: zh_CN},
    NzNotificationService,
    DetailsPageComponent,
    NzMessageService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
