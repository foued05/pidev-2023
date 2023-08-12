import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  isLogin = false;

  constructor(private http: HttpClient) { }

  public login(login: any): Observable<string>{
    return this.http.post<string>("http://localhost:3080/user/authenticate", login);
  }

  public createUser(user: any): Observable<any>{
    return this.http.post("http://localhost:3080/user/add", user);
  }

  public getUsers(): Observable<any[]>{
    return this.http.get<any[]>("http://localhost:3080/user/list");
  }

  public getUserById(id: string): Observable<any>{
    return this.http.get<any>(`http://localhost:3080/user/${id}`)
  }

  public improvedAccount(id: string): Observable<any>{
    return this.http.post<any>(`http://localhost:3080/user/improveAccount/${id}`, {})
  }

  public forgotPassword(email: string): Observable<boolean>{
    return this.http.post<boolean>(`http://localhost:3080/user/sendEmail/${email}`, {});
  }

  public verifyForgotPassword(key: string): Observable<boolean>{
    return this.http.get<boolean>(`http://localhost:3080/user/verifyForgotPassword/${key}`);
  }

  public updatePasswordByEmail(email: string, password: string): Observable<string>{
    return this.http.post<string>('http://localhost:3080/user/updatePasswordByEmail', {
      email: email,
      password: password
    });
  }
 
}
