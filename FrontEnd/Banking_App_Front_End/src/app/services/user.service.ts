import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { User } from '../models/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http = inject(HttpClient);

  getUserById(id:number){
   let url:string = ("http://localhost:8080/user/"+id);

    return this.http.get<User>(url);
   
  }

  
}
