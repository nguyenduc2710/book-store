import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Cart } from "../model/cart.model";
import { Book } from "../model/books.model";
import { BookService } from "./book.services";

@Injectable({providedIn: 'root'})
export class CartService{
  itemQuantity = new BehaviorSubject<number>(0);
  itemList: Book[] = [];
  list: Cart[] = [];

  constructor(private bookService: BookService){}

  onAddItem(book_id: string, quantity: number){
    let isExist = false;
    this.list.forEach(item => {
      if(item.book_id === book_id){
        item.quantity += quantity;
        isExist = true;
      }
    })
    if(!isExist){
      this.list.push({book_id, quantity});
      const bookDetail = this.bookService.getBookById(book_id);
      this.itemList.push(bookDetail);
      console.log(this.itemList);
    }
    this.itemQuantity.next(this.itemQuantity.value + quantity);
  }

  onGetList(){
    return this.itemList;
  }
  onGetShortList(){
    return this.list;
  }
}
