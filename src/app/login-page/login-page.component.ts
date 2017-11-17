import { Component, OnInit } from '@angular/core';
import {CookieService} from 'angular2-cookie/core';
import { AuthenticationService } from "../_services/authService";
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  data = {
    username: "migy", 
    password: "dogs1234"
  }
  isLoading = false;
  failure = false;
  constructor( private router:Router, private authService: AuthenticationService, private _cookieService:CookieService ) { 

  }

  ngOnInit() {
    if(this.authService.isLoggedIn()){
      console.log("logged in")
      this.router.navigate(['/home']);
    }else{
        console.log("not logged in")
    }
  
  }

  // on login
  onSubmit(payload){
    console.log("logging in");
    this.isLoading = true;
    this.authService.login(payload)
    .subscribe(
        data => {
            this.isLoading = false;
            this.router.navigate(['/home']);
        },
        error => {
            this.failure = true;
            this.isLoading = false;
            console.log(error);
        });
  }

  exit(){
    this.failure = false;
    this.reset();
  }

  reset(){
    this.data = {
      username: "",
      password: ""
    }
  }
}
