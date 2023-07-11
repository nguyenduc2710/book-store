import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.services';
import { Book } from 'src/app/model/books.model';
import { FilterDataService } from 'src/app/services/filter.services';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  bookClicked = false;
  allBookOriginnal: Book[] = [];
  allBookFilter: Book[] = [];
  constructor(private bookService: BookService,
    private router: Router,
    private filterService: FilterDataService) { }

  ngOnInit(): void {
    // this.allBookOriginnal = this.bookService.getAll();
    this.bookService.callApi();
    this.bookService.book$.subscribe(book => {
      this.allBookOriginnal = book;
      this.allBookFilter = this.allBookOriginnal;

    })

    this.filterService.filterString.pipe(distinctUntilChanged()).subscribe((filterStr: string) => {
      this.filterList(filterStr);
    })
  }

  onBookClicked() {
    this.bookClicked = !this.bookClicked;
  }

  filterList(searchName: string) {
    if (!searchName) {
      this.allBookFilter = this.allBookOriginnal;
    }
    else {
      this.allBookFilter = this.allBookOriginnal.filter(x => x.name.toLowerCase().includes(searchName.toLowerCase()));
    }
  }

  navigateToDetail(book_id: string) {
    this.router.navigate([`book/${book_id}`]);
  }

  onTest() {
    this.bookService.onAddTest();
  }
}
