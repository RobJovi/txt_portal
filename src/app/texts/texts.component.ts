import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../_services/auth-guard';
import { AuthenticationService } from "../_services/authService";
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng2-select2';

@Component({
  selector: 'app-texts',
  templateUrl: './texts.component.html',
  styleUrls: ['./texts.component.css'],
  providers: [AuthGuard]
})
export class TextsComponent implements OnInit {

  data = {
    username: "migy", 
    password: "dogs1234"
  }

  public exampleData: Array<Select2OptionData>;
  public options: Select2Options;
  public value: string[];
  public current: string;

  isLoading = false;
  failure = false;
  constructor( private router:Router, private authService: AuthenticationService ) { 

  }

  ngOnInit() {
    if(this.authService.isLoggedIn()){
      console.log("logged in")
      this.router.navigate(['/texts']);
    }else{
        console.log("not logged in")
    }
  
    this.exampleData = [
      {
        id: 'migy',
        text: 'Migy'
      },
      {
        id: 'jorge',
        text: 'Jorge'
      },
      {
        id: 'multiple3',
        text: 'Multiple 3'
      },
      {
        id: 'multiple4',
        text: 'Multiple 4'
      }
    ];

    this.value = [];

    this.options = {
      multiple: true,
      theme: 'classic',
      closeOnSelect: true
    }

    this.current = this.value.join(' | ');
  }

  changed(data: {value: string[]}) {
    this.current = data.value.join(' | ');
  }

    // on send message
    onSubmit(payload){
      console.log("sending text");
      this.isLoading = true;
      this.authService.message(payload)
      .subscribe(
          data => {
              this.isLoading = false;
              this.router.navigate(['/texts']);
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

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  reset(){
    this.data = {
      username: "",
      password: ""
    }
  }

}
