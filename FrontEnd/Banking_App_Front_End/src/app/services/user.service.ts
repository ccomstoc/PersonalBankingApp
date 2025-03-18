import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { User } from '../models/User.type';
import { environment } from '../Config/properties';





@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);

  getUserById(id:number){
   let url:string = (environment.baseBackendUrl + "user/"+id);
    return this.http.get<User>(url);
   
  }

  makeDeposit(updatedUser:any){
    let url:string = environment.baseBackendUrl + "user/deposit";
    return this.http.patch<User>(url,updatedUser);

  }

  
}
