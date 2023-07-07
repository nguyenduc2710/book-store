import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Cart } from "../model/cart.model";
import { Book } from "../model/books.model";
import { BookService } from "./book.services";

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly itemQuantity$ = new BehaviorSubject<number>(0);
  readonly totalPrice$ = new BehaviorSubject<number>(0);
  readonly totalPriceAfterVAT$ = new BehaviorSubject<number>(0);
  itemList: Book[] = [];
  list: Cart[] = [];

  constructor(private bookService: BookService) { }

  onAddItem(book_id: string, quantity: number) {
    let isExist = false;
    this.list.forEach(item => {
      if (item.book_id === book_id) {
        item.quantity += quantity;
        isExist = true;
      }
    })
    if (!isExist) {
      this.list.push({ book_id, quantity });
      const bookDetail = this.bookService.getBookById(book_id);
      this.itemList.push(bookDetail);
    }
    this.itemQuantity$.next(this.itemQuantity$.value + quantity);
    this.calculatePrice();
  }

  onDeleteItem(book_id: string) {
    const index = this.itemList.findIndex(book => book_id == book.book_id);
    const indexList = this.list.findIndex(book => book_id == book.book_id);
    const currentQuantity = this.getQuantity(book_id);
    if (index != -1 && indexList != -1) {
      this.itemList.splice(index, 1);
      this.list.splice(indexList, 1);
      this.itemQuantity$.next(this.itemQuantity$.value - currentQuantity);
      this.calculatePrice();
    }
  }

  onUpdateQuantity(book_id: string, quantity: number){
    console.log("Updating in cart service");
    this.list.forEach(item => {
      if(item.book_id === book_id){
        this.itemQuantity$.next(this.itemQuantity$.value - item.quantity + quantity);
        item.quantity = quantity;
      }
    })
    this.calculatePrice();
  }

  getQuantity(book_id: string) {
    let rs = 0;
    this.list.forEach(item => {
      if (item.book_id == book_id) {
        rs = item.quantity;
      }
    })
    return rs;
  }

  calculatePrice() {
    let totalPrice = 0;
    this.list.forEach(item => {
      const currentBook = this.itemList.find(book => book.book_id == item.book_id);
      if (currentBook) {
        totalPrice += currentBook.price * item.quantity;
      }
    })
    this.totalPrice$.next(totalPrice);
    this.totalPriceAfterVAT$.next((this.totalPrice$.value * 0.04) + this.totalPrice$.value);
  }


  onGetList() {
    return this.itemList;
  }

  onGetShortList() {
    return this.list;
  }
}
