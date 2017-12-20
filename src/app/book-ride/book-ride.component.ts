import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { RestService } from '../services/rest.service';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-book-ride',
  templateUrl: './book-ride.component.html',
  styleUrls: ['./book-ride.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class BookRideComponent implements OnInit {

  displayRides: boolean; // Display ride list
  buttonToggle: boolean; // Change Show all rides button color
  buttonToggleTo: boolean; // Change To Infosys button color
  buttonToggleFrom: boolean; // Change From Infosys button color
  buttonToggleOther: boolean; // Change Other button color
  filterRideClicked: boolean; // Detect if filter ride was clicked
  showSelectedRide: boolean; // Display ride details child component
  ridesArray: any[]; // array containing all the rides as objects
  selectedRideObj: Object; // selected ride object
  rideFilterOption: string; // Filter option like 'to_infosys','from_infosys' etc..
  errorMessage: string;

  constructor(private restService: RestService, private authenticationService: AuthenticationService) {
    this.displayRides = false;
    this.getRides();
  }

  ngOnInit() {
    this.authenticationService.loginUser();
  }

  getRides() {
    if (localStorage.getItem('rides') === null) {
      this.restService.getAllRides().subscribe(
          rides => { localStorage.setItem('rides', JSON.stringify(rides));
                     this.ridesArray = rides; } ,
          error => this.errorMessage = <any>error);

    } else {
      this.ridesArray = JSON.parse(localStorage.getItem('rides'));
    }
  }

  toogleDisplayRides() {
    this.displayRides = this.displayRides ?  false : true;
    this.buttonToggle = this.filterRideClicked ? false : this.buttonToggle ?  false : true;
    this.filterRideClicked = false;
    this.rideFilterOption = '';
    this.showSelectedRide = false;
    this.toggleFilterButtonColor();
  }

  showRides(rideFilter) {
    this.rideFilterOption = rideFilter;
    this.buttonToggle = false;
    this.filterRideClicked = true;
    this.toggleFilterButtonColor(rideFilter);
  }

  toggleFilterButtonColor(buttonIdentifier: string = '') {
    this.buttonToggleTo = false;
    this.buttonToggleFrom = false;
    this.buttonToggleOther = false;
    switch (buttonIdentifier) {
        case 'to_infosys':
            this.buttonToggleTo = true;
            break;
        case 'from_infosys':
            this.buttonToggleFrom = true;
            break;
        case 'others':
            this.buttonToggleOther = true;
            break;
    }
  }

  showRideDetails(ride) {
    this.showSelectedRide = true;
    this.selectedRideObj = ride;
    this.filterRideClicked = false;
  }

  bookRideComplete(statusObjFromChild) {
    this.displayRides = false;
    this.buttonToggle = false;
    this.ridesArray.map( (item, index) => {
        if (item.id === statusObjFromChild.rideId) {
          /*
           * Update seats based on emitted object from ride details component
           */
          if (statusObjFromChild.status === 'booked') {
            item.seatsLeft--;
          } else if ( statusObjFromChild.status === 'cancelled') {
            item.seatsLeft++;
          }
        }
      }
    );
    localStorage.setItem('rides', JSON.stringify(this.ridesArray));
  }

}
