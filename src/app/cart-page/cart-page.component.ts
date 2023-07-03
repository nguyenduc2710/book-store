import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Book } from '../model/books.model';
import { Cart } from '../model/cart.model';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit, OnDestroy {
  totalBook: number = 0
  bookList: Book[] = [];
  shortList: Cart[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.bookList = this.cartService.onGetList();
    this.cartService.itemQuantity.subscribe(quanChange => {
      this.totalBook = quanChange;
      this.bookList = this.cartService.onGetList();
      this.shortList = this.cartService.onGetShortList();
    })
  }

  getQuantity(book_id: string){

  }

  ngOnDestroy(): void {
    this.cartService.itemQuantity.unsubscribe();
  }
}
