import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SelectControlValueAccessor } from '@angular/forms';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  USER_NAME_SESSION_ATTRIBUTE_NAME='authenticatedUser';

  public username: String;
  public password: String;

  constructor( private http: HttpClient) { }

  authenticationService(username: String, password: String){

    // const authHeader = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    // console.log(authHeader + " authheader is this!!")

    return this.http.get(
      `http://localhost:9889/api/v1/basicauth`,
      { headers:
        { Authorization: this.createBasicAuthToken(username, password) }
      }
    ).pipe(
      map((res) => {

        this.username = username;
        this.password = password;
        this.registerSuccessfulLogin(username, password);

      })
    );


  }

  // This method will create Authorization Header as following:
  // Authorization: Basic <Encoded username:password>
  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password);
  }

  registerSuccessfulLogin(username: String, password: String) {

    let sessionvalue = {"user":username, "token":this.createBasicAuthToken(username, password)};
    let sessionuser = JSON.stringify(sessionvalue);
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, sessionuser);

  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = null;
    this.password = null;
  }

  isUserLoggedIn() {
    let userdata = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    
    if(userdata === null){
      return false;

    } else{
      let user = JSON.parse(userdata).user;

      if(user === null ) return false

      return true;
    }
  }
  
  getLoggednUserName() {
    let userdata = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);

    if(userdata === null) return false;
    
    let user = JSON.parse(userdata).user;

    if( user === null) return ''
    
    return user;
  }

  // is bad practice
  getAuthToken() {
    let userdata = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    return JSON.parse(userdata).token
  }

}
