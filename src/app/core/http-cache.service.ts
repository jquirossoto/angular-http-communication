import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpCacheService {

  requests: any = {};

  constructor() { }

  put(url: string, response: HttpResponse<any>) {
    this.requests[url] = response;
  }

  get(url: string): HttpResponse<any> | null {
    return this.requests[url];
  }

  delete(url: string): void {
    this.requests[url] = null;
  }

  clearCache(): void {
    this.requests = {};
  }

}
