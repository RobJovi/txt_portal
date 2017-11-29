import { Component, OnInit } from '@angular/core';
import { ContactService } from "./contacts.service";
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Contact } from './contact'
import { AuthenticationService } from "../_services/authService";

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {

  constructor( private router:Router, private contactService: ContactService, private authService: AuthenticationService )
  {}
    // contacts$: Observable<Contact[]>;
    isLoading = false;
    failure = false;
    contact = {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        school: ""
      }
    contacts = [];

    ngOnInit() {
        // this.contacts$ = this.contactService.getContacts();
        this.contactService.getContacts().subscribe(
              data => {
                console.log(data);
                this.contacts = data;
                console.log(this.contacts);
              }
            )
    }

    // send new Contact
      onSubmit(payload){

        console.log(payload);
        this.isLoading = true;
        this.contactService.contact(payload)
        // this.authService.contact(payload)
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
    // CREATE NEW CONTACT --> HTTP POST /contacts
    // GET ALL CONTACTS --> HTTP GET /contacts
    // GET CONTACT BY ID --> HTTP GET /contacts/:id
    // UPDATE CONTACT BY ID --> HTTP PUT /contacts/:id


// export class ContactsComponent implements OnInit {
//   isLoading = false;
//   failure = false;
//   contact = {
//     first_name: "",
//     last_name: "",
//     email: "",
//     phone_number: "",
//     school: ""
//   }
//
//   contacts = [];
//
//   constructor( private router:Router, private authService: AuthenticationService )
//   {}
//
//   ngOnInit()
//   {
//     this.authService.getContacts().subscribe(
//       data => {
//         console.log(data);
//         this.contacts = data;
//       }
//     )
//     // this.contacts = of(this.authService.getContacts())
//   }
//
//   //send new Contact
//   onSubmit(payload){
//
//     console.log(payload);
//     this.isLoading = true;
//     this.authService.contact(payload)
//     .subscribe(
//         data => {
//             this.isLoading = false;
//             this.router.navigate(['/contacts']);
//         },
//         error => {
//             this.failure = true;
//             this.isLoading = false;
//             console.log(error);
//         });
//   }
// }
