import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { RestService } from '../services/rest.service';
import { AuthenticationService } from '../services/authentication.service';
import { Offerride } from './Offerride';

@Component({
  selector: 'app-offer-ride',
  templateUrl: './offer-ride.component.html',
  styleUrls: ['./offer-ride.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OfferRideComponent implements OnInit {

  offerRideForm: FormGroup;
  rides: any[];
  offerride = new Offerride();
  successMsg: string;

  constructor(private formBuilder: FormBuilder, private restService: RestService, private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.loginUser();
    this.rides = JSON.parse(localStorage.getItem('rides'));
    this.offerRideForm = this.formBuilder.group({
      name: ['', Validators.required],
      pickUp: ['', Validators.required],
      destination: ['', Validators.required],
      car: ['', Validators.required],
      seatsLeft: ['', [Validators.required, this.seatNumberValidator]]
    });
  }

  seatNumberValidator(control: FormControl): { [key: string]: any } {
        if (control.value > 0 && control.value < 8 ) {
          return null;
        }
        return { 'numberValid': true };
  }

  addRide() {
    const rides = localStorage.getItem('rides') != null
                  ? JSON.parse(localStorage.getItem('rides')) :
                  [];
    const postObj = {id: rides.length + 1, bookedBy: sessionStorage.getItem('username')};
    for (const rideproperty in this.offerride) {
      if (!postObj.hasOwnProperty(rideproperty)) {
        postObj[rideproperty] = this.offerRideForm.controls[rideproperty].value;
      }
    }
    rides.push(postObj);
    localStorage.setItem('rides', JSON.stringify(rides));
    this.successMsg = 'Added Successfully';
  }
}

