import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../_services/auth-guard';
import { AuthenticationService } from "../_services/authService";
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Select2TemplateFunction, Select2OptionData } from 'ng2-select2';
import { TXTer } from '../model/txter';

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
  txter;

  isLoading = false;
  failure = false;
  constructor( private router:Router, private authService: AuthenticationService ) { 

  }

  private model = new Array<TXTer[]>();

  ngOnInit() {
    if(this.authService.isLoggedIn()){
      console.log("logged in")
      this.router.navigate(['/texts']);
    }else{
        console.log("not logged in")
    }

    this.authService.getTemplateList().subscribe(
      data => { 
        var recipient = [];
        for (let i in data) {
          var fullName = data[i].first_name + ' ' + data[i].last_name;
          let txterList = {
            id: data[i],
            text: fullName,
            additional: {
              image: data[i].local_img_url,
              number: data[i].phone_number,
            }
          }
          recipient.push(txterList);
          } 
          this.exampleData = recipient;
      }
    );
    this.options = {
      multiple: true,
      placeholder: 'To...',
      templateResult: this.templateResult,
      templateSelection: this.templateSelection
    }
  }

  // function for result template
  public templateResult: Select2TemplateFunction = (state: Select2OptionData): JQuery | string => {
    if (!state.id) {
      return state.text;
    }

    let image = '<span class="userImage"><img src="' + state.additional.image + '" width="50" height="50"></span>';

    return jQuery('<span>' + image + ' ' + state.text + ' - ' + state.additional.number + '</span>');
  }

  // function for selection template
  public templateSelection: Select2TemplateFunction = (state: Select2OptionData): JQuery | string => {
    if (!state.id) {
      return state.text;
    }

    return jQuery('<span [(ngModel)]="data.phone_number">' + state.text + '</span>');
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
              console.log('banana');
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
