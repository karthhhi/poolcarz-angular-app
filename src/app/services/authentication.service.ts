import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthenticationService {

   private subject = new Subject<any>();

    loginUser() {
       this.subject.next({statusText: 'Logout'});
    }

    logoutUser() {
        this.subject.next({statusText: ''});
    }

    checkUserLoggedIn(): Observable<any> {
        return this.subject.asObservable();
    }
}
