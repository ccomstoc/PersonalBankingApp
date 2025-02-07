import { inject, Injectable, signal } from '@angular/core';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { LoginDTO } from '../models/LoginDTO.type';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { User } from '../models/User.type';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  




  //Dependencies
  router = inject(Router);
  http = inject(HttpClient);
  userService = inject(UserService);

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
    this.userService.getUserById(this.getCurrentUser().userId).pipe(catchError((err) => {
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
