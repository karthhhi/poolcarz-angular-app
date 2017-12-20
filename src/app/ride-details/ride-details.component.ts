import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-ride-details',
  templateUrl: './ride-details.component.html',
  styleUrls: ['./ride-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class RideDetailsComponent implements OnInit {
  @Input() selectedRide: Object;
  @Output() onBookRide = new EventEmitter<Object>();

  bookButtonText: string;
  bookStatus: string;
  makeCancelButton: boolean;
  cancelled: number;
  isError: number;

  constructor() {
    this.bookButtonText = 'Book!';
    this.cancelled = 0;
    this.isError = 0;
  }

  ngOnInit() {}

  bookRideStart(rideId: number) {
    if (rideId) {
      let status = '';
      const rides = JSON.parse(localStorage.getItem('rides'));
      const selectedRide = rides.filter(item => item.id === rideId)[0];
      if (
        this.cancelled === 0 &&
        selectedRide.bookedBy !== sessionStorage.getItem('username') &&
        selectedRide.seatsLeft !== 0
      ) { /* Do booking */
        this.bookButtonText = 'Cancel Booked Ride';
        this.makeCancelButton = true;
        this.bookStatus = 'Booking done. Your booking id: 100';
        status = 'booked';
        this.cancelled = 1;
        this.isError = 0;
      } else if (
        selectedRide.bookedBy === sessionStorage.getItem('username')
      ) { /* Don't do booking : Same user */
        this.bookButtonText = 'Book!';
        this.makeCancelButton = false;
        this.bookStatus = 'Cannot Book your own ride';
        status = 'not_booked_sameuser';
        this.cancelled = 0;
        this.isError = 1;
      } else if (
        selectedRide.seatsLeft === 0
      ) { /* Don't do booking : Seats left */
        this.bookButtonText = 'Book!';
        this.makeCancelButton = false;
        this.bookStatus = 'No seats left, Please find another ride';
        status = 'not_booked_noseatsleft';
        this.cancelled = 0;
        this.isError = 1;
      } else { /* Cancel booking */
        this.bookButtonText = 'Book!';
        this.makeCancelButton = false;
        this.bookStatus = '';
        status = 'cancelled';
        this.cancelled = 0;
        this.isError = 0;
      }
      const statusObjToParent = { rideId: rideId, status: status };
      this.onBookRide.emit(statusObjToParent);
    }
  }
}
