import {Component, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {LoginService} from "../login.service";
import {LoginDTO} from "../LoginDTO";
import {NzNotificationService} from "ng-zorro-antd/notification";
import {User} from "../User";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;

  submitForm(): void {
    if (this.validateForm.valid) {
      const username = this.validateForm.value.username;
      const password = this.validateForm.value.password;
      const loginDTO = new LoginDTO();
      loginDTO.username = username;
      loginDTO.password = password;
      this.loginService.login(loginDTO).subscribe(data =>{
        if (data.code == 200) {
          this.nzNotificationService.success(data.msg!, 'authorization = ' + data.obj.authorization);
        this.loginService.setAuthorization(data.obj.authorization,data.obj.refreshToken);
          localStorage.setItem("isLogin", "true");
        this.loginService.getUserInfo().subscribe(data =>{
          const user  = data;
          this.loginService.setUser(user);
          window.location.href = '/week-search';
        })

        }else{
          this.nzNotificationService.error(data.msg!,"");
        }
      })
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  constructor(private fb: FormBuilder,
              private loginService:LoginService,
              private nzNotificationService:NzNotificationService,
              private router:Router) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }

  logOut() {
    this.loginService.logout().subscribe(data =>{
      if (data.code == 200) {
        this.nzNotificationService.success(data.msg!, '');
        localStorage.clear();
      }else{
        this.nzNotificationService.error(data.code + '', data.msg!);

      }
    })
  }
}
