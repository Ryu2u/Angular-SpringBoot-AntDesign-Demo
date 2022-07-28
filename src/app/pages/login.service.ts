import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {LoginDTO} from "./LoginDTO";
import {Observable} from "rxjs";
import {ResultMsg} from "./ResultMsg";
import {User} from "./User";

const serviceURL = "http://localhost:8080";

const httpOptions = {
  headers: {
    'content-type': 'application/json',
  }
}


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  setAuthorization(authorization: string, refreshToken: string) {
    console.log("authorization = " + authorization);
    console.log("refreshToken = " + refreshToken);
    localStorage.setItem('authorization', authorization);
    localStorage.setItem('refreshToken', refreshToken);
  }

  setUser(user: User) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem("user")!);
  }


  login(loginDTO: LoginDTO): Observable<ResultMsg> {
    return this.http.post(serviceURL + "/login", loginDTO, httpOptions);

  }

  getUserInfo(): Observable<User> {
    return this.http.get<User>(serviceURL + "/user/info", httpOptions);
  }

  refreshToken(): Observable<ResultMsg> {
    const user = this.getUser();
    const username = user.username;
    const options = {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      }),
      params: new HttpParams({
        fromString: 'username=' + username
      })

    }
    return this.http.post<ResultMsg>(serviceURL + "/refresh", null, options);

  }

  viewLoginPage(): boolean {
    const isLogin = localStorage.getItem("isLogin");
    if (isLogin && isLogin == 'true') {
      return true;
    }
    return false;

  }

  logout():Observable<ResultMsg>{
    return this.http.post<ResultMsg>(serviceURL + "/logout", null, httpOptions);
  }

}
