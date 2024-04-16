import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { apiUrls } from '../api_URL';
import { AsyncLocalStorage } from 'async_hooks';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient);

  /* Using the below behaviour we are setting the isLoggedIn value to True and when log off to False. */
  isLoggedIn$ = new BehaviorSubject<boolean>(false);

  registerService(registerObj : any){
    return this.http.post<any>(`${apiUrls.authServiceApi}register`, registerObj);
  }

  loginService(loginObj : any){
    return this.http.post<any>(`${apiUrls.authServiceApi}login`, loginObj);
  }

  sendEmailService(email: string){
    return this.http.post<any>(`${apiUrls.authServiceApi}send-email`,{email:email});
  }

  resetPasswordService(resetObj: any){
    return this.http.post<any>(`${apiUrls.authServiceApi}resetPass`,resetObj);
  }

 isLoggedIn(){
  return !!localStorage.getItem("user_id");
 }
  
}
