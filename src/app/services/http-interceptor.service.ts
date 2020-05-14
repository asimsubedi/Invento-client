import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor( private authenticationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.authenticationService.isUserLoggedIn()) {
      const authReq = req.clone ({
        headers: new HttpHeaders({
          'Content-Type' : 'application/json',
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Basic ${window.btoa(this.authenticationService.username + ":" + this.authenticationService.password)}`
        })
      });

      console.log("Request Authed!");

      return next.handle(authReq);

    } else{
      console.log("NADA");
      return next.handle(req);

    }
  }
}
