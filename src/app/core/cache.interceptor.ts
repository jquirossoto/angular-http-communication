import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpCacheService } from './http-cache.service';

@Injectable({providedIn: 'root'})
export class CacheInterceptor implements HttpInterceptor {

  constructor(private cacheService: HttpCacheService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      console.log(`Clearing cache: ${req.method} ${req.url}`);
      this.cacheService.clearCache();
      return next.handle(req);
    } else {
      const cachedResponse:HttpResponse<any> = this.cacheService.get(req.url);
      if (cachedResponse) {
        console.log(`Returning cached response: ${cachedResponse.url}`);
        console.log(`Response: ${JSON.stringify(cachedResponse)}`);
        return of(cachedResponse);
      } else {
        return next.handle(req)
          .pipe(
            tap(event => {
              if(event.type === HttpEventType.Response) {
                console.log(`Adding response to cache: ${req.url}`);
                this.cacheService.put(req.url, event);
              }
            })
          )
      }
    }
  }

}
