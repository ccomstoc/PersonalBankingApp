import { ChangeDetectorRef, Component, inject, NgZone, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { catchError, Subject, takeUntil } from 'rxjs';

import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { LoginDTO } from '../../../models/LoginDTO.type';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy{
  //Dependencies
  authService = inject(AuthService);
  router = inject(Router)
  private destroy$ = new Subject<void>();
  private cdr = inject(ChangeDetectorRef);
  private ngZone = inject(NgZone);


  username:string = "";
  password:string = "";

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  login(){
    let lDTO:LoginDTO = {
      userName: this.username,
      password: this.password
    }

    this.authService.login(lDTO).pipe(
      takeUntil(this.destroy$),
      catchError((err) => {
      console.log(err);
      throw err;
    })).subscribe((user) => {
      if(user.status != 401 ){//If the responce is a success, set global user
        if(user.body)
          this.authService.setCurrentUser(user.body);
        //localStorage.setItem("user",JSON.stringify(user.body));



        // this.ngZone.run(() => {
        //   console.log("Navigating...");
        //   this.cdr.detectChanges();  // Force Angular to update UI
        //   this.router.navigateByUrl('/catagorize').then(() => {
        //     console.log("Navigation successful");
        //     this.cdr.detectChanges();  // Force UI update again after navigation
        //     window.location.reload();
        //   });

        // });

        this.router.navigateByUrl('/home')
      }
    })

  

    
  }
  createAccount(){

  }

}
