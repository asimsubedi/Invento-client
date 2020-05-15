import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/common/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  errorMessage = "Invalid Credentials";

  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  
  public userdata : User;
  public userdatajson : any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.loginSuccess = this.authenticationService.isUserLoggedIn();

    if (this.loginSuccess) this.router.navigateByUrl('home')

  }

  // handles Login from the credentials user inputs from the form.
  handleLogin() {

    // first check if empty fields
    this.authenticationService.authenticationService(this.username, this.password).subscribe(
      (result) => {

        console.log(result + " .. Result Data type : " + typeof(JSON.stringify(result)) )
        this.userdata = result;

        console.log(result["name"])

        this.invalidLogin = false;
        this.loginSuccess = true;
        this.successMessage = 'Login Success';
        this.router.navigate(['/home']);

        this.authenticationService.registerSuccessfulLogin(this.username, this.password);

      }, () => {

        console.log("Ooo!! You Can't Access Sorry!!");
        this.invalidLogin = true;
        this.loginSuccess = false;

      }
    )
  }

}
