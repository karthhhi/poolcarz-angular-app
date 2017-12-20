import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { Ride } from '../book-ride/Ride';
import { Login } from '../login/Login';
@Injectable()
export class RestService {
  constructor(private http: Http) {}

  getAllRides(): Observable<Ride[]> {
    return this.http.get('../../assets/rides.json')
      .map((response: Response) => <Ride[]>response.json())
      .catch(this.handleError);
  }

  getAllUsers(): Observable<Login[]> {
    return this.http.get('../../assets/users.json')
      .map((response: Response) => <Login[]>response.json())
      .catch(this.handleError);
  }

  private handleError(error: any) {
    const errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }

}
