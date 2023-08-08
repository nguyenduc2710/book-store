import { BookStore } from '@/model/books.model';
import { BookService } from '@/services/book.services';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-manage',
  templateUrl: './products-manage.component.html',
  styleUrls: ['./products-manage.component.css']
})
export class ProductsManageComponent implements OnInit, OnDestroy {
  searchValue = '';
  visible = false;
  constructor(
    private bookService: BookService,

  ){}

  listOfData: BookStore[] = [];
  listOfDisplayData = [...this.listOfData];

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    // this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }
  ngOnInit(): void {

  }
  ngOnDestroy(): void {

  }
}
