import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Login } from './Login';
import { RestService } from '../services/rest.service';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  login = new Login();
  users: any[];
  userValid: boolean;
  errorMessage: string;
  constructor(private restService: RestService, private router: Router, private authenticationService: AuthenticationService) {
     this.restService.getAllUsers().subscribe(
        users => this.users = users,
        error => this.errorMessage = <any>error);
    this.userValid = true;
  }

  ngOnInit() {
    sessionStorage.removeItem('username');
    this.authenticationService.logoutUser();
  }

  onSubmit() {
      // inputs
      const username = this.login.username;
      const password = this.login.password;
      // Check if user exist
      const user = this.users.filter(item => item.username === username && item.password === password)[0];
      if (user) {
        this.userValid = true;
        sessionStorage.setItem('username', username);
        this.router.navigate(['/book-ride']);
      } else {
          this.userValid = false;
      }
  }

}
