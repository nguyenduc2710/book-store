import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/services/book.services';
import { TopBook } from 'src/app/model/books.model';
import { FilterDataService } from 'src/app/services/filter.services';
import { distinctUntilChanged, distinctUntilKeyChanged } from 'rxjs';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent implements OnInit {
  bookClicked = false;
  allBookOriginnal: TopBook[] = [];
  allBookFilter: TopBook[] = [];
  constructor(private bookService: BookService,
    private router: Router,
    private filterService: FilterDataService) {}

  ngOnInit(): void {
    this.allBookOriginnal = this.bookService.getAll();
    this.allBookFilter = this.allBookOriginnal;
    console.log(this.allBookFilter);

    this.filterService.filterString.pipe(distinctUntilChanged()).subscribe((filterStr:string) =>{

      this.filterList(filterStr);
    })
  }

  onBookClicked() {
    this.bookClicked = !this.bookClicked;
  }

  filterList(searchName: string){
    if(!searchName)
    {
      this.allBookFilter = this.allBookOriginnal;
    }
    else{
      this.allBookFilter = this.allBookOriginnal.filter(x => x.name.toLowerCase().includes(searchName.toLowerCase()));
    }
  }

  navigateToDetail(book_id: number){
    const index = this.allBookOriginnal.findIndex(x => x.book_id === book_id);
    this.router.navigate([`book/${index}`]); // WORKS
  }

  onTest(){
    this.bookService.onAddTest();
  }
}
