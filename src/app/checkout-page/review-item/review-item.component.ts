import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: ['./review-item.component.css']
})
export class ReviewItemComponent implements OnInit {
  @Input() bookItem!: { book_id: string, bookName: string, quantity: number, totalPrice: number };

  ngOnInit(): void {
    // console.log(this.bookItem);
  }
}
