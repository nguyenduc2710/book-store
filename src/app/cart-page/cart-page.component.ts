import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Book } from '../model/books.model';
import { Cart } from '../model/cart.model';
import { Subject, takeUntil } from 'rxjs';
import { CartStore } from '../store/cart.store';
import { BillStore } from '../store/bill.store';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit, OnDestroy {
  totalBook: number = 0;
  bookList: Book[] = [];
  shortList: Cart[] = [];
  totalPrice: number = 0
  totalPriceAfterVAT: number = 0
  readonly totalPrice$ = this.cartService.totalPrice$;
  readonly totalPriceAfterVAT$ = this.cartService.totalPriceAfterVAT$;
  readonly itemQuantity$ = this.cartService.itemQuantity$;
  readonly bookStorage$ = this.store.bookStorage$;
  readonly vm$ = this.store.vm$;

  //Observable destroyed$ only be declared 1 time for each component, unsubcribed using next() & complete()
  readonly destroyed$ = new Subject<void>();

  constructor(private cartService: CartService,
    private store: CartStore,
    private billStore: BillStore) { }

  ngOnInit(): void {
    this.bookList = this.cartService.onGetList();
    this.shortList = this.cartService.onGetShortList();

    this.itemQuantity$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(quanChange => this.totalBook = quanChange);
    this.totalPrice$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(totalPrice => this.totalPrice = totalPrice);
    this.totalPriceAfterVAT$
      .pipe(takeUntil(this.destroyed$))
      .subscribe(totalPriceVAT => this.totalPriceAfterVAT = totalPriceVAT);
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
  test(){
    this.billStore.getBills();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}

