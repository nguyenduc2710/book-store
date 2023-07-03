import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Book } from '../model/books.model';
import { Cart } from '../model/cart.model';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  totalBook: number = 0
  bookList: Book[] = [];
  shortList: Cart[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.bookList = this.cartService.onGetList();
    this.shortList = this.cartService.onGetShortList();
    this.cartService.itemQuantity.subscribe(quanChange => {
      this.totalBook = quanChange;
      // this.bookList = this.cartService.onGetList();
      // this.shortList = this.cartService.onGetShortList();
    })
  }

  getQuantity(book_id: string): number {
    let quantity = 0;
    for (let i = 0; i < this.shortList.length; i++) {
      const id = this.shortList[i].book_id;
      const quan = this.shortList[i].quantity;
      if (id === book_id) {
        quantity = quan;
      }
    }
    return quantity;
  }

  // ngOnDestroy(): void {
  //   this.cartService.itemQuantity.unsubscribe();
  // }
}
