import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  title: string;
  isLoggedin = false;

  loggedinUser: string= '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.title = 'Invento';
    this.isLoggedin = this.authService.isUserLoggedIn();
    this.loggedinUser = this.authService.getLoggednUserName();
  }

  // try implement this on navbar component
  doLogout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
    this.isLoggedin = false;
  }

}
