import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Contact } from './contact'

@Injectable()
export class ContactService{

  constructor(private http: Http) { }

  getContacts() : Observable<Contact[]> {
      return this.http.get('http://localhost:3000/contacts')
      // ...and calling .json() on the response to return data
            // ...and calling .json() on the response to return data
        .map((res:Response) => res.json())
        //...errors if any
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
  }
  contact(payload) {
      return this.http.post('http://localhost:3000/contacts', payload)
          .map((response: Response) => {
              let user = response.json();
              if (user && user.data) {
                  console.log(user.data);
              }
          });
  }
}
