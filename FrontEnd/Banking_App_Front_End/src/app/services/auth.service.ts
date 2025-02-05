import { inject, Injectable, signal } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { LoginDTO } from '../models/LoginDTO.type';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { User } from '../models/User.type';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedInUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public loggedInUser$: Observable<User | null> = this.loggedInUserSubject.asObservable();

  setLoggedInUser(user: User | null): void {
    this.loggedInUserSubject.next(user);
  }


  //Dependencies
  router = inject(Router);
  http = inject(HttpClient);

  logout(){
    this.router.navigate(["/login"]);
    this.loggedInUserSubject.next(null);
  }


  login(lDTO:LoginDTO):Observable<HttpResponse<User>>{
    let url:string = "http://localhost:8080/login";
    return this.http.post<User>(url,lDTO,{ observe: 'response' });
  }
  

    

  
}
