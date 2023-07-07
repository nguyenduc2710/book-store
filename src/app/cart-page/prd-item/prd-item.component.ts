import { Component, Input } from '@angular/core';
import { Book } from 'src/app/model/books.model';

@Component({
  selector: 'app-prd-item',
  templateUrl: './prd-item.component.html',
  styleUrls: ['./prd-item.component.css']
})
export class PrdItemComponent {
  @Input() quantity: number;

  @Input() bookItem: Book;
  constructor() {
    this.bookItem = {
      book_id: '',
      cover: '',
      name: '',
      rating: 0,
      descriptions: '',
      author: '',
      price: 0
    };

    this.quantity = 0;
  }
}
