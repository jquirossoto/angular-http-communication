import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Book } from 'app/models/book';
import { DataService } from 'app/core/data.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styles: []
})
export class EditBookComponent implements OnInit {

  selectedBook: Book;

  constructor(private route: ActivatedRoute,
              private dataService: DataService) { }

  ngOnInit() {
    let bookID: number = parseInt(this.route.snapshot.params['id']);
    this.dataService.getBookById(bookID).subscribe(
      (book: Book) => this.selectedBook = book,
      (error: any) => console.log(error),
      () => console.log('All done getting a book')
    );

    this.dataService.getOldBookById(bookID).subscribe(book => console.log(`old book ${book.bookTitle}`))
  }

  setMostPopular(): void {
    this.dataService.setMostPopularBook(this.selectedBook);
  }

  saveChanges(): void {
    this.dataService.updateBook(this.selectedBook).subscribe(
      () => console.log('edit book successfully'),
      error => console.log('error editing book', error)
      );
  }
}
