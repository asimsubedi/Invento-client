import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password);
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = null;
    this.password = null;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if(user === null ) return false
    console.log(user + " USER IS LOGGED IN!!")
    
    return true;
  }
  
  getLoggednUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if( user === null) return ''
    
    return user;
  }

}
