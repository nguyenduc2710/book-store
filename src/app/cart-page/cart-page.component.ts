import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Book } from '../model/books.model';
import { Cart } from '../model/cart.model';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit, OnDestroy {
  totalBook: number = 0;
  bookList: Book[] = [];
  shortList: Cart[] = [];
  totalPrice: number = 0;
  totalPriceAfterVAT: number = 0;
  readonly itemQuantity$ = this.cartService.itemQuantity;
  readonly destroyed$ = new Subject<void>()

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.bookList = this.cartService.onGetList();
    this.shortList = this.cartService.onGetShortList();
    this.itemQuantity$.pipe(takeUntil(this.destroyed$)).subscribe(quanChange => {
      this.totalBook = quanChange;
      // this.bookList = this.cartService.onGetList();
      // this.shortList = this.cartService.onGetShortList();
    })
    if(this.shortList){
      this.calculatePrice();
    }
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

  calculatePrice(){
    this.shortList.forEach(item => {
      const currentBook = this.bookList.find(book => book.book_id == item.book_id);
      if(currentBook){
        this.totalPrice += currentBook.price * item.quantity;
      }
    })
    this.totalPriceAfterVAT = (this.totalPrice * 0.04) + this.totalPrice;
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

