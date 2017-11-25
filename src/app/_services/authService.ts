import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    // helper to check token expiration
    jwtHelper: JwtHelper = new JwtHelper();
    // variable to keep track of logged in User
    currentUser;

    constructor(private http: Http) { }
    // login a user
    login(payload) {
        return this.http.post('http://d9d9078c.ngrok.io/txtportal/login', payload)
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
        return this.http.post('http://d9d9078c.ngrok.io/text/send', payload)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.data) {
                    console.log(user.data);
                }
            });
    }
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
       this.http.post('http://d9d9078c.ngrok.io/txtportal/verifyToken', payload)
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