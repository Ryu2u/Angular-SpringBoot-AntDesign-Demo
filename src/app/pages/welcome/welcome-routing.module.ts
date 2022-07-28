import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import {WorknoteComponent} from "./worknote/worknote.component";
import {SavePageComponent} from "./save-page/save-page.component";
import {EditPageComponent} from "./edit-page/edit-page.component";

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {path:'worknote',component:WorknoteComponent},
  {path:'savePage',component:SavePageComponent},
  {path:'editPage',component:EditPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WelcomeRoutingModule { }
