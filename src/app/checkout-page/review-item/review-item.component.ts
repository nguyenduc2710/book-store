import { Component, Input, OnInit } from '@angular/core';
import { Book } from 'src/app/model/books.model';
import { Cart } from 'src/app/model/cart.model';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.css']
})
export class ReviewItemComponent implements OnInit {
  @Input() bookItem!: {bookName: string, totalPrice: number};

  ngOnInit(): void {
    // console.log(this.bookItem);
  }
}
