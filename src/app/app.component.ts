import {Component, Injectable} from '@angular/core';
import {LoginService} from "./pages/login.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  viewLogin:boolean = false;

  constructor(public loginService:LoginService) {
    this.viewLogin = loginService.viewLoginPage();
  }
}
