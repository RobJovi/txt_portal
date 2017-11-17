import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../_services/auth-guard';
import { AuthenticationService } from "../_services/authService";
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthGuard]
})
export class HomeComponent implements OnInit {

  data = {
    username: "migy", 
    password: "dogs1234"
  }
  isLoading = false;
  failure = false;
  constructor( private router:Router, private authService: AuthenticationService ) { 

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
    console.log("sending text");
    this.isLoading = true;
    this.authService.message(payload)
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
