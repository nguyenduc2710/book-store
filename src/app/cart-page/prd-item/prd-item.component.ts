import { Component, Input } from '@angular/core';
import { Book } from 'src/app/model/books.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-prd-item',
  templateUrl: './prd-item.component.html',
  styleUrls: ['./prd-item.component.css']
})
export class PrdItemComponent {
  @Input() quantity: number;

  @Input() bookItem: Book;
  constructor(private cartService: CartService) {
    this.bookItem = {
      book_id: '',
      cover: '',
      name: '',
      rating: 0,
      descriptions: '',
      author: '',
      price: 0,
      quantity: 0
    };

    this.quantity = 0;
  }

  onUpdateQuantity(quantity: number) {
    this.cartService.onUpdateQuantity(this.bookItem.book_id, quantity);
  }

  onDelete() {
    console.log("Delete");
    this.cartService.onDeleteItem(this.bookItem.book_id);
  }
}
