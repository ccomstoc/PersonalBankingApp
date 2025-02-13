import { inject, Injectable, OnDestroy, signal } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { LoginDTO } from '../models/LoginDTO.type';
import { BehaviorSubject, catchError, Observable, Subject, takeUntil } from 'rxjs';

import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../models/User.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{

  




  //Dependencies
  router = inject(Router);
  http = inject(HttpClient);
  userService = inject(UserService);

  private destroy$ = new Subject<void>();

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getCurrentUser(): User{

    const storedUser = localStorage.getItem("user");
    if(storedUser)
      return JSON.parse(storedUser);
    else
      throw Error("Tried to access null user from AuthService");


  }
  setCurrentUser(user:User){
    localStorage.setItem("user",JSON.stringify(user));
  }
  refreshCurrentUser( updateUserDependents: () => void) {
    this.userService.getUserById(this.getCurrentUser().userId).pipe(
      takeUntil(this.destroy$),
      catchError((err) => {
      console.log(err);
      throw err
    })).subscribe((user) => {
      this.setCurrentUser(user);
      updateUserDependents();
    })

  }

  logout(){
    this.router.navigate(["/login"]);
    localStorage.removeItem("user");
  }


  login(lDTO:LoginDTO):Observable<HttpResponse<User>>{
    let url:string = "http://localhost:8080/login";
    return this.http.post<User>(url,lDTO,{ observe: 'response' });
  }
  

    

  
}
