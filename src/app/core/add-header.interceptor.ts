import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class AddHeaderInterceptor implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`AddHeaderInterceptor - ${req.url}`);
    let interceptedReq: HttpRequest<any> = req.clone({
      setHeaders: {'ContentType': 'application/json'}
    });
    return next.handle(interceptedReq);
  }

}
