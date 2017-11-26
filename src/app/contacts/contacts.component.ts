import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../_services/auth-guard';
import { AuthenticationService } from "../_services/authService";
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng2-select2';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {
  isLoading = false;
  failure = false;
  data = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    school: ""
  }
  constructor( private router:Router, private authService: AuthenticationService )
  {}

  ngOnInit()
  {}

  //send new Contact
  onSubmit(payload){

    console.log(payload);
    this.isLoading = true;
    this.authService.contact(payload)
    .subscribe(
        data => {
            this.isLoading = false;
            this.router.navigate(['/contacts']);
        },
        error => {
            this.failure = true;
            this.isLoading = false;
            console.log(error);
        });
  }
}
