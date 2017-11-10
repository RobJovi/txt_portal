import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authService';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router:Router) {
     
  }

  canActivate() {
    if(!this.authService.isLoggedIn()){
      this.router.navigate(['/login']);
    }else{
      this.authService.updateCurrentUser();
      return true;
    }
  }
}