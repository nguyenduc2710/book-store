import { BookStore } from '@/model/books.model';
import { BookService } from '@/services/book.services';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-products-manage',
  templateUrl: './products-manage.component.html',
  styleUrls: ['./products-manage.component.css']
})
export class ProductsManageComponent implements OnInit, OnDestroy {
  searchValue = '';
  visible = false;
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly BookStore[] = [];
  listOfData: BookStore[] = [];
  setOfCheckedId = new Set<string>();
  listOfDisplayData = [...this.listOfData];
  readonly destroy$ = new Subject<void>;

  constructor(
    private bookService: BookService,
  ) {}

  ngOnInit(): void {
    this.getBookList();
  }

  getBookList(){
    this.bookService.getAllBooks().pipe(takeUntil(this.destroy$)).subscribe((book: BookStore) => {
      console.log(book);
      for(let [key, value] of Object.entries(book)){
        this.listOfData.push({id: key, value: value})
      }
      this.listOfDisplayData = [...this.listOfData];
    })
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onItemChecked(id: string, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  updateCheckedSet(id: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange($event: readonly BookStore[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: BookStore) => {
      console.log(item.value.name);
      return item.value.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
