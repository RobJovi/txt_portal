import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../_services/auth-guard';
import { AuthenticationService } from '../_services/authService';
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
    username: 'migy',
    password: 'dogs1234'
  };

  public exampleData: Array<Select2OptionData>;
  public options: Select2Options;
  private _selectedFields: Array<string> = [];
  public numArray = [];
  txter;

  isLoading = false;
  failure = false;
  constructor( private router: Router, private authService: AuthenticationService ) {

  }

  private model = new Array<TXTer[]>();

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      console.log('logged in');
      this.router.navigate(['/texts']);
    } else {
        console.log('not logged in');
    }

    this.authService.getTemplateList().subscribe(
      data => {
        const recipient = [];
        for (let i = 0; i < data.length; i++) {
          const fullName = data[i].first_name + ' ' + data[i].last_name;
          const txterList = {
            id: data[i]._id,
            text: fullName,
            additional: {
              image: data[i].local_img_url,
              number: data[i].phone_number,
            }
          };
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
    };
  }

  // function for result template
  public templateResult: Select2TemplateFunction = (state: Select2OptionData): JQuery | string => {
    if (!state.id) {
      return state.text;
    }

    const image = '<span class="userImage"><img src="' + state.additional.image + '" width="50" height="50"></span>';


    return jQuery('<span>' + image + ' ' + state.text + ' - ' + state.additional.number + '</span>' );
  }

  // function for selection template
  public templateSelection: Select2TemplateFunction = (state: Select2OptionData): JQuery | string => {
    if (!state.id) {
      return state.additional.number;
    }


    const value = state.additional.number;
    console.log(state.additional.number);
    this.numArray.push(value);
    // const valueArray = [value].concat();
    console.log(this.numArray);

    return jQuery('<span name="contact" id="contact"><b>' + state.text + '</b></span>');
  }


    // on send message
    onSubmit(payload) {
      const elem = document.getElementById('contactSelect');
      const el = $('#phone_number').val(elem.outerText);
      const numberArray = [el];
      console.log(numberArray);
      // console.log('sending text');
      // this.isLoading = true;
      // // this.authService.message(this.array && elemTwo)
      // this.authService.message(payload)
      // .subscribe(
      //     data => {
      //         this.isLoading = false;
      //         this.router.navigate(['/texts']);
      //     },
      //     error => {
      //         this.failure = true;
      //         this.isLoading = false;
      //         console.log(error);
      //     });
    }

  exit() {
    this.failure = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
