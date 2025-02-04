import { inject, Injectable, signal } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { LoginDTO } from '../models/LoginDTO.type';
import { catchError, Observable } from 'rxjs';
import { User } from '../models/User.type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Dependencies
  router = inject(Router);
  http = inject(HttpClient);

  //signals
  _loggedInUser = signal<User | null>(null);

  isLoggedIn():boolean {
    if (this._loggedInUser() == null){
      console.log("Guard returning false") ;
      return false;
    }
    console.log("Guard returning true") ;
    return true;
  }

  get loggedInUser(): User{
    if(this.isLoggedIn())
      throw new Error("User is not logged in");
    return this._loggedInUser() as User;
  }

  set loggedInUser(user:User | null){
    this._loggedInUser.set(user);
  }




  logins(lDTO:LoginDTO){

    let url:string = "http://localhost:8080/login";
    this.http.post<User>(url,lDTO,{ observe: 'response' })
    

  }

  login(lDTO:LoginDTO):Observable<HttpResponse<User>>{
    let url:string = "http://localhost:8080/login";
    return this.http.post<User>(url,lDTO,{ observe: 'response' });
  }
  

    

  
}
