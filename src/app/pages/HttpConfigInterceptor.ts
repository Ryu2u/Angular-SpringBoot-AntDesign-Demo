import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {applySourceSpanToExpressionIfNeeded} from "@angular/compiler/src/output/output_ast";
import {LoginService} from "./login.service";


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

  constructor(private router: Router,
              private loginService: LoginService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("*****************")
    let token = localStorage.getItem("authorization");
    let refreshToken = localStorage.getItem("refreshToken");
    if (token&&token!='undefined') {
      console.log("token = " + token);
      console.log("refreshToken = " + refreshToken);
      console.log("url = " + req.urlWithParams);
      const url = req.urlWithParams;
      req = req.clone({headers: req.headers.set('Authorization', "Bearer " + token)});
      return next.handle(req).pipe(
        tap((httpEvent: HttpEvent<any>) => {
          if (httpEvent instanceof HttpResponse) {
            //console.log("httpCode = " + httpEvent.body.code);
            if (httpEvent.body.code == 7004) {
              console.log('===================')
              let refreshToken = localStorage.getItem("refreshToken");
              if (refreshToken) {
                localStorage.removeItem('refreshToken');
                localStorage.setItem('authorization', refreshToken);
                req = req.clone({headers: req.headers.set('Authorization', "Bearer " + refreshToken)});
                this.toRefresh();
                //next.handle(req);
              } else {
                localStorage.clear();
                window.location.href = '/login'
              }

            }

          }
        })
      );
    }
    return next.handle(req).pipe(
      tap((httpEvent: HttpEvent<any>) => {
        if (httpEvent instanceof HttpResponse) {
          if (httpEvent.body.code == 7004) {
            console.log("--------token不存在----------")
            localStorage.clear();
            window.location.href = '/login'
          }
        }
      })
    );
  }

  toRefresh() {
    this.loginService.refreshToken().subscribe(data => {
      if (data.code == 200) {
        localStorage.setItem('authorization', data.obj.authorization);
        localStorage.setItem('refreshToken', data.obj.refreshToken);
      } else {
        window.location.href = '/login';
      }
    })
  }


}
