import { inject, Injectable, OnDestroy, Signal, signal, WritableSignal } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { LoginDTO } from '../models/LoginDTO.type';
import { BehaviorSubject, catchError, Observable, Subject, takeUntil } from 'rxjs';
import { environment } from '../Config/properties';

import { Router } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../models/User.type';
import { NewUserDTO } from '../models/DTO/NewUserDTO';


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

  //returns the local user as an object
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

  //is for re-fetching current user data
  //componenents can call this function when they need to ensure the global user is updated
  //they can pass their local function for updating the user signal, which will be run after the observer emits
  refreshCurrentUserOld( updateUserDependents: () => void) {
    this.userService.getUserById(this.getCurrentUser().userId).pipe(
      takeUntil(this.destroy$),
      catchError((err) => {
      console.log(err);
      throw err
    })).subscribe((user) => {
      user.valid = true;//For use when we need to invalidate an old user when rendering fresh compoenents
      this.setCurrentUser(user);
      updateUserDependents();
      console.log("Refreshed user: " + JSON.stringify(user, null, 2))
    })

  }
  refreshUser( componentSignal:WritableSignal<User>) {
    this.userService.getUserById(this.getCurrentUser().userId).pipe(
      takeUntil(this.destroy$),
      catchError((err) => {
      console.log(err);
      throw err
    })).subscribe((user) => {
      user.valid = true;//For use when we need to invalidate an old user when rendering fresh compoenents
      this.setCurrentUser(user);
      componentSignal.set(user);
      console.log("Refreshed user: " + JSON.stringify(user, null, 2))
    })

  }

  logout(){
    this.router.navigate(["/login"]);
    localStorage.removeItem("user");
  }


  login(lDTO:LoginDTO):Observable<HttpResponse<User>>{
    let url:string =  environment.baseBackendUrl + "login";
    return this.http.post<User>(url,lDTO,{ observe: 'response' });
  }

  createAccount(newUser:NewUserDTO){
    let url:string = environment.baseBackendUrl + "user";
    return this.http.post<User>(url,newUser);

  }
  
  
    

  
}
