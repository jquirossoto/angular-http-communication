import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing'
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { TestBed } from '@angular/core/testing';
import { Book } from 'app/models/book';
import { BookTrackerError } from 'app/models/bookTrackerError';

import { DataService } from "./data.service";

describe('DataService', () => {

  let dataService: DataService;
  let httpTestingController: HttpTestingController;
  let testBooks: Book[] = [
    { bookID: 1, title: 'Goodnight Moon', author: 'Margated Wise Brown', publicationYear: 1989 },
    { bookID: 2, title: 'Winnie-the-Pooh', author: 'A. A. Milne', publicationYear: 1897 },
    { bookID: 3, title: 'The Hobbit', author: 'J. R. R. Tolkien', publicationYear: 1966 }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ DataService ]
    });

    dataService = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);

  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('Should get all books', () => {
    dataService.getAllBooks().subscribe(
      (data: Book[] | BookTrackerError) => expect((data as Book[]).length).toBe(testBooks.length)
    );
    let booksRequest: TestRequest = httpTestingController.expectOne('/api/books');
    expect(booksRequest.request.method).toEqual('GET');
    booksRequest.flush(testBooks);
  });

  it('Should return a BookTrackerError', () => {
    dataService.getAllBooks()
      .subscribe(
        () => fail('this should have been an error'),
        (error: BookTrackerError) => {
          expect(error.errorNumber).toBe(100)
        }
    );
    let booksRequest: TestRequest = httpTestingController.expectOne('/api/books');
    booksRequest.flush('', {
      status: 500,
      statusText: 'Internal Server Error'
    });
  })

});
