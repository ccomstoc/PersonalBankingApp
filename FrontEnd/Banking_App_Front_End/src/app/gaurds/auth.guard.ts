import { inject, Injector } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/User.type';
import { Subscription } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  let loggedIn:boolean = false;

  let currentUser!: User;
  let subscription!: Subscription;

  subscription = authService.loggedInUser$.subscribe(user => {
    if(user != null)
      loggedIn = true;
    else
      loggedIn = false;

  });

  if(!loggedIn){
      router.navigate(['/login']);
      return false;
  }

  
  return true;
};
