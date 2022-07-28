import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WorkReportComponent} from "./pages/week-report/work-report.component";
import {WeekSearchComponent} from "./pages/week-search/week-search.component";
import {WeekDetailComponent} from "./pages/week-detail/week-detail.component";
import {WeekApproveComponent} from "./pages/week-approve/week-approve.component";
import {LoginComponent} from "./pages/login/login.component";
import {IndexComponent} from "./pages/index/index.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login',},
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  {path:'week-report',component:WorkReportComponent},
  {path:'week-search',component:WeekSearchComponent},
  {path:'week-detail', component: WeekDetailComponent},
  {path: 'week-approve',component:WeekApproveComponent},
  {path:'login', component: LoginComponent},
  {path: 'index',component: IndexComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
