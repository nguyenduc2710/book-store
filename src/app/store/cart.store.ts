import { Injectable } from '@angular/core'
import { switchMap } from "rxjs"
import { ComponentStore, tapResponse } from "@ngrx/component-store"
import { BookService } from "../services/book.services"
import { Book, BookStore } from "src/app/model/books.model"

export interface CartState {
  bookStorage: Book[],
  cartItems: CartItem[],
  totalPrice: number,
  numbersOfItem: number
}

export interface CartItem {
  id: string,
  numbersOfItem: number,
  item: Book
}

const initCart: CartState = {
  bookStorage: [],
  cartItems: [],
  totalPrice: 0,
  numbersOfItem: 0
}
@Injectable({ providedIn: 'root' })
export class CartStore extends ComponentStore<CartState> {
  constructor(private bookService: BookService) {
    super(initCart);
    this.getBooks();
  };

  //SELECTORS
  readonly bookStorage$ = this.select((state) => state.bookStorage);
  readonly cartItems$ = this.select((state) => state.cartItems);
  readonly totalPrice$ = this.select((state) => state.totalPrice);
  readonly numbersOfItem$ = this.select((state) => state.numbersOfItem);

  //ViewModel for components
  readonly vm$ = this.select(
    this.cartItems$,
    this.totalPrice$,
    this.numbersOfItem$,
    (cartItems, totalPrice, numbersOfItem) => ({
      cartItems,
      totalPrice,
      numbersOfItem
    })
  );

  resetState(){
    this.setState(initCart);
  }

  //UPDATERSs
  readonly addBooks = this.updater((state: CartState, books: Book[]) => (
    {
      ...state,
      bookStorage: books
    }
  ))

  readonly addItem = this.updater((state: CartState, item: CartItem) => {
    const existedItemIndex = state.cartItems.findIndex(cartItem => cartItem.item.book_id === item.item.book_id);
    if (existedItemIndex !== -1) {
      const updatedItems = [...state.cartItems];
      updatedItems[existedItemIndex].numbersOfItem += item.numbersOfItem;
      return (
        {
          ...state,
          cartItems: updatedItems,
          totalPrice: state.totalPrice + (item.item.price * item.numbersOfItem),
          numbersOfItem: state.numbersOfItem + item.numbersOfItem
        }
      )
    } else {
      return (
        {
          ...state,
          cartItems: [...state.cartItems, item],
          totalPrice: state.totalPrice + (item.item.price * item.numbersOfItem),
          numbersOfItem: state.numbersOfItem + item.numbersOfItem
        }
      )
    }
  });

  readonly updateQuantity = this.updater((state: CartState, item: { book: Book, quantity: number }) => {
    const existingItemIndex = state.cartItems.findIndex(cartItem => cartItem.item.book_id === item.book.book_id);
    const list = [...state.cartItems];
    const oldQuantity = list[existingItemIndex].numbersOfItem;
    const oldPrice = list[existingItemIndex].numbersOfItem * list[existingItemIndex].item.price;
    list[existingItemIndex].numbersOfItem = item.quantity;
    const updatedTotal = state.totalPrice
      - oldPrice
      + (list[existingItemIndex].numbersOfItem * list[existingItemIndex].item.price);

    return {
      ...state,
      cartItems: list,
      numbersOfItem: state.numbersOfItem - oldQuantity + item.quantity,
      totalPrice: updatedTotal
    }
  });

  readonly removeItem = this.updater((state: CartState, item: Book) => {
    const index = state.cartItems.findIndex(cartItem => cartItem.item.book_id === item.book_id);
    const list = [...state.cartItems];
    const itemDeleted = state.cartItems[index];
    const updatedQuantity = state.numbersOfItem - itemDeleted.numbersOfItem;
    list.splice(index, 1);
    const updatedTotal = state.totalPrice - (itemDeleted.item.price * itemDeleted.numbersOfItem);

    return {
      ...state,
      cartItems: list,
      numbersOfItem: updatedQuantity,
      totalPrice: updatedTotal
    }
  });

  //EFFECTS
  readonly getBooks = this.effect(param$ => param$.pipe(
    switchMap(() =>
      this.bookService.getAllBooks().pipe(
        tapResponse(
          (books: any[]) => {
            this.addBooks(Object.values(books));
          },
          err => console.log(err)
        )
      )
    )
  ))


}
