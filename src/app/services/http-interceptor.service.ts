import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor( private authService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.authService.isUserLoggedIn()) {
      const authReq = req.clone ({
        headers: new HttpHeaders({
          'Content-Type' : 'application/json',
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
          'Access-Control-Allow-Origin': '*',
          'Authorization': this.authService.getAuthToken()
        })
      });

      console.log("Auth Request");
      return next.handle(authReq);

    } else{

      console.log("Request Not Auth");
      return next.handle(req);

    }
  }
}
