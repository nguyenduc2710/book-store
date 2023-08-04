import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '@/services/book.services';
import { Book } from '@/model/books.model';
import { FilterDataService } from '@/services/filter.services';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit, OnDestroy {
  bookClicked = false;
  allBookOriginnal: Book[] = [];
  allBookFilter: Book[] = [];
  readonly destroyed$ = new Subject<void>();

  constructor(private bookService: BookService,
    private router: Router,
    private filterService: FilterDataService) { }

  ngOnInit(): void {
    // this.allBookOriginnal = this.bookService.getAll();
    this.bookService.book$.pipe(takeUntil(this.destroyed$)).subscribe(book => {
      this.allBookOriginnal = book;
      this.allBookFilter = this.allBookOriginnal;
    })

    this.filterService.filterString.pipe(distinctUntilChanged(), takeUntil(this.destroyed$)).subscribe((filterStr: string) => {
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

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
