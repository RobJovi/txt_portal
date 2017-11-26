import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { JwtHelper } from 'angular2-jwt';
import { Select2OptionData } from 'ng2-select2';
import { TXTer } from '../model/txter';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
    // helper to check token expiration
    jwtHelper: JwtHelper = new JwtHelper();
    // variable to keep track of logged in User
    currentUser;
    txter;

    constructor(private http: Http) { }
    // login a user
    login(payload) {
        return this.http.post('http://6e74655b.ngrok.io/txtportal/login', payload)
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

    // send text message
    message(payload) {
        return this.http.post('http://6e74655b.ngrok.io/text/send', payload)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.data) {
                    console.log(user.data);
                }
            });
    }

    // grab TXTer from mongo collection
    getTemplateList() : Observable<TXTer[]> {
        var recipient = [];
        return this.http.get('http://6e74655b.ngrok.io/text/getTxter')
        // ...and calling .json() on the response to return data
        .map((res:Response) => res.json())
        //...errors if any
        .catch((error:any) => Observable.throw(error.json().error || 'Server error'))
            // .map((res:Response) => {
            //     res.json();
                
            //     for (let i in txter) {
            //         var fullName = txter[i].first_name + txter[i].last_name;
            //         let txterList = {
            //             text: fullName,
            //             additional: {
            //                 image: txter[i].local_img_url,
            //                 number: txter[i].phone_number
            //             }
            //         }
            //         recipient.push(txterList);
            //     }
            //     console.log(recipient);
            //     return recipient;
            // })
            //...errors if any
            // .subscribe(
            //     data => { this.txter = data },
            //     () => console.log('done')
            // );
        
        // return [
        //     {
        //         id: 'jorge',
        //         text: 'Jorge Landaverde',
        //         additional: {
        //             image: 'assets/app-imgs/circle_small.png',
        //             number: '+13233833060'
        //         }
        //     },
        //     {
        //         id: 'danny',
        //         text: 'Danny Menjivar',
        //         additional: {
        //             image: 'assets/app-imgs/circle_small.png',
        //             number: '+13233833060'
        //         }
        //     },
        //     {
        //         id: 'oscar',
        //         text: 'Oscar Menjivar',
        //         additional: {
        //             image: 'assets/app-imgs/circle_small.png',
        //             number: '+13233833060'
        //         }
        //     },
        //     {
        //         id: 'roberto',
        //         text: 'Roberto Sanchez',
        //         additional: {
        //             image: 'assets/app-imgs/circle_small.png',
        //             number: '+13233833060'
        //         }
        //     },
        //     {
        //         id: 'migy',
        //         text: 'Migy Dominguez',
        //         additional: {
        //             image: 'assets/app-imgs/circle_small.png',
        //             number: '+13233833060'
        //         }
        //     },
        //     {
        //         id: 'mike',
        //         text: 'Mike Spike',
        //         additional: {
        //             image: 'assets/app-imgs/circle_small.png',
        //             number: '+13233833060'
        //         }
        //     },
        //     {
        //         id: 'rike',
        //         text: 'RIke Spike',
        //         additional: {
        //             image: 'assets/app-imgs/circle_small.png',
        //             number: '+13233833060'
        //         }
        //     },
        //     {
        //         id: 'like',
        //         text: 'Like Spike',
        //         additional: {
        //             image: 'assets/app-imgs/circle_small.png',
        //             number: '+13233833060'
        //         }
        //     },
        //     {
        //         id: 'nike',
        //         text: 'Nike Spike',
        //         additional: {
        //             image: 'assets/app-imgs/circle_small.png',
        //             number: '+13233833060'
        //         }
        //     },
        //     {
        //         id: 'pike',
        //         text: 'Pike Spike',
        //         additional: {
        //             image: 'assets/app-imgs/circle_small.png',
        //             number: '+13233833060'
        //         }
        //     },
        //     {
        //         id: 'spike',
        //         text: 'Spike Jonze',
        //         additional: {
        //             image: 'assets/app-imgs/circle_small.png',
        //             number: '+13233833060'
        //         }
        //     },
        // ];
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
       this.http.post('http://6e74655b.ngrok.io/txtportal/verifyToken', payload)
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