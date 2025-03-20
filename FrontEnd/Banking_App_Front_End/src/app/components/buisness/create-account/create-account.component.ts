import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, Signal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { NewUserDTO } from '../../../models/DTO/NewUserDTO';
import { catchError, Subject, takeUntil } from 'rxjs';
import { LoginDTO } from '../../../models/LoginDTO.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  imports: [FormsModule,CommonModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})
export class CreateAccountComponent implements OnDestroy {

  authService = inject(AuthService);
  router = inject(Router);
  private destroy$ = new Subject<void>();

  username!:string;
  name!:string;
  password!:string;
  confirmPassword!:string;

  doesPassMatch: boolean = true;
  allInformation: boolean = true;

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  createAccount(){
    this.doesPassMatch = true;
    this.allInformation = true;

    if(!(this.password === this.confirmPassword)){
      this.doesPassMatch = false;
      return;
    }

    if(!this.name  || !this.username  || !this.password ){
      this.allInformation = false;
      return;
    }


    let newUser:NewUserDTO = {
      name:this.name,
      userName:this.username,
      password:this.password
    }

    this.authService.createAccount(newUser).pipe(
      takeUntil(this.destroy$),
      catchError((err) => {
        console.log(err);
        throw err;
      })).subscribe((returnedUser) => {
        let loginUser:LoginDTO = {
          userName:returnedUser.userName,
          password:newUser.password
        }
        this.login(loginUser);
      });



  }

  login(loginUser:LoginDTO){


    this.authService.login(loginUser).pipe(
      takeUntil(this.destroy$),
      catchError((err) => {
        console.log(err);
        throw err;
      })
    ).subscribe((loggedInUser) => {
      if(loggedInUser.body)
        this.authService.setCurrentUser(loggedInUser.body)
      else
        throw new Error("User could not be logged in")

      this.router.navigateByUrl('/home')

    });

  }

}
