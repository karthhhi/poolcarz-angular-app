import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BookRideComponent } from '../book-ride/book-ride.component';
import { RideDetailsComponent } from '../ride-details/ride-details.component';
import { LoginComponent } from '../login/login.component';
import { OfferRideComponent } from '../offer-ride/offer-ride.component';

const appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'book-ride', component: BookRideComponent },
    { path: 'offer-ride', component: OfferRideComponent },
    { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
      RouterModule
  ],
  declarations: []
})

export class AppRoutingModule { }
