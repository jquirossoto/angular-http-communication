import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Book } from 'app/models/book';
import { BookTrackerError } from 'app/models/bookTrackerError';
import { Observable, of, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class BookResolver implements Resolve<Book[] | BookTrackerError> {

  constructor(private dataService: DataService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Book[] | BookTrackerError> {
    return this.dataService.getAllBooks()
      .pipe(
        catchError(error => of(error))
      );
  }
}
