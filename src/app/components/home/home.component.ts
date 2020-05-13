import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedin = false;

  loggedinUser: string= '';

  greeting = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {

    this.isLoggedin = this.authService.isUserLoggedIn();
    this.loggedinUser = this.authService.getLoggednUserName();

    if(!this.isLoggedin) {
      this.router.navigateByUrl('login');
    }

  }

  doLogout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
    this.isLoggedin = false;
  }

}
