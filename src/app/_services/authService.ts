import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import { Contact } from '../contacts/contact';

@Injectable()
export class AuthenticationService {
    // helper to check token expiration
    jwtHelper: JwtHelper = new JwtHelper();
    // variable to keep track of logged in User
    currentUser;

    constructor(private http: Http) { }
    // login a user
    login(payload) {
        return this.http.post('http://localhost:3000/txtportal/login', payload)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.data) {
                    console.log(user.data);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', user.data);
                }
            });
    }
    message(payload) {
        return this.http.post('http://localhost:3000/text/send', payload)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.data) {
                    console.log(user.data);
                }
            });
    }
    contact(payload) {
      // console.log(payload)
        return this.http.post('http://localhost:3000/contacts', payload)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.data) {
                    console.log(user.data);
                }
            });
    }
    //
    // getContacts() : Observable<data[]> {
    //     return this.http.get('http://localhost:3000/contact/getContacts')
    //     // ...and calling .json() on the response to return data
    //           // ...and calling .json() on the response to return data
    //       .map((res:Response) => res.json())
    //       //...errors if any
    //       .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
    // }
    // logout a user
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    updateCurrentUser(){
        console.log("verifying");
        const token =  localStorage.getItem('currentUser');
        var payload = {
            token: token
        }
        // decipher user on server and console log it
        // dev purposes only
       this.http.post('http://localhost:3000/txtportal/verifyToken', payload)
        .map(res => res.json())
        .subscribe( res => {
            if(res.error){
                console.log(res.error);
                return false;
            }else{
                this.currentUser = res.data;
                console.log(this.currentUser + " currently logged in");
                return true;
            }
        })

    }

    isLoggedIn(){
        const token =  localStorage.getItem('currentUser');


        if(token != null){
           return !this.jwtHelper.isTokenExpired(token)
        }else{
            return false;
        }
    }

}
