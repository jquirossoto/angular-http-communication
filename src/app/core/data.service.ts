import { Injectable } from '@angular/core';

import { allBooks, allReaders } from 'app/data';
import { Reader } from "app/models/reader";
import { Book } from "app/models/book";
import { BookTrackerError } from 'app/models/bookTrackerError';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { OldBook } from 'app/models/oldBook';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  mostPopularBook: Book = allBooks[0];

  private handleHttpError(error: HttpErrorResponse): Observable<BookTrackerError> {
    let dataError = new BookTrackerError();
    dataError.errorNumber = 100;
    dataError.message = error.statusText;
    dataError.friendlyMessage = "An error ocurred retrieved the data";
    return throwError(dataError);
  }

  setMostPopularBook(popularBook: Book): void {
    this.mostPopularBook = popularBook;
  }

  getAllReaders(): Reader[] {
    return allReaders;
  }

  getReaderById(id: number): Reader {
    return allReaders.find(reader => reader.readerID === id);
  }

  getAllBooks(): Observable<Book[] | BookTrackerError> {
    return this.http.get<Book[]>('/api/books')
      .pipe(
        catchError(this.handleHttpError)
      );
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`api/books/${id}`, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-token'
      })
    });
  }

  getOldBookById(id: number): Observable<OldBook> {
    return this.http.get<Book>(`api/books/${id}`, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-token'
      })
    })
    .pipe(
      map(book => <OldBook>{
        bookTitle: book.title,
        year: book.publicationYear
      }),
      tap(oldBook => console.log(`old book ${JSON.stringify(oldBook)}`))
    );
  }

  addBook(newBook: Book): Observable<Book> {
    return this.http.post<Book>('api/books', newBook, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-token'
      })
    });
  }

  updateBook(updatedBook: Book): Observable<void> {
    return this.http.put<void>(`api/books/${updatedBook.bookID}`, updatedBook, {
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'my-token'
      })
    });
  }

  deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`api/books/${bookId}`);
  }

}
