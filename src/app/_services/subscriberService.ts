import { Injectable } from '@angular/core';
import { Http,Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class SubscriberService {
    constructor(private http: Http) { }
    // subscribe a user to our mailing list
    subscribe(payload) {
        return this.http.post('http://localhost:3000/subscribe/saveSubscriber', payload)
            .map((response: Response) => {
                console.log(response);
            });
    }
}