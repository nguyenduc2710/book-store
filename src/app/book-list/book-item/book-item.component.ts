import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BookService } from 'src/app/services/book.services';
import { Book } from 'src/app/model/books.model';
import { Subject, takeUntil } from 'rxjs'
import { CartService } from 'src/app/services/cart.service';
import { CartStore } from 'src/app/store/cart.store';

@Component({
  selector: 'app-book-item',
  template: `
  <div class="book-item-container" nz-row [nzGutter]="{ xs: 8, sm: 16, md: 24, lg: 32 }">
    <div nz-col [nzSpan]="8">
      <img style="border: 1px solid rgba(0,0,0,0.5);"
      nz-image
      width="80%"
      [nzSrc]="book.cover"
      [alt]="book.name"
      />
    </div>
    <div class="book-info" nz-col [nzSpan]="16">
      <div class="book-title">
        <div class="book-title_name">{{ book.name }}</div>
        <p>
          By <span class="book-title_author">{{ book.author }}</span>
        </p>
        <div>Price: <span class="book-title-price">{{ '$' + book.price }}</span></div>
        <div>Store: {{ book.quantity }}</div>
      </div>
      <hr>
      <form class="book-add-to-cart">
        <div class="book-operation">
          <button class="update-quantity me-2" (click)="decreaseQuantity()" nz-button nzType="primary"  nzShape="circle"><span nz-icon nzType="minus" nzTheme="outline"></span></button>
          <nz-input-number class="hide-arrows me-2" name="quantity" [(ngModel)]="bookQuantity" [nzMin]="1" [nzMax]="1000" [nzStep]="1" ></nz-input-number>
          <button class="update-quantity" (click)="increaseQuantity()" nz-button nzType="primary" nzShape="circle"><span nz-icon nzType="plus" nzTheme="outline"></span></button>
        </div>
        <button class="mt-2 add-to-cart" type="button" nz-button nzType="default" (click)="onAddItem()">Add To Cart</button>
      </form>
      <nz-divider nzText="Descriptions" nzOrientation="left"></nz-divider>
      <div class="book-description">
        {{ book.descriptions }}
      </div>
    </div>
    <hr>
  </div>

  `,
  styleUrls: ['./book-item.component.css'],
})
export class BookItemComponent implements OnInit, OnDestroy {
  bookQuantity: number = 1;
  book: Book = {
    book_id: '',
    cover: '',
    name: '',
    rating: 0,
    descriptions: '',
    author: '',
    price: 0,
    quantity: 0,
  };
  bookId: string = '';
  itemListSelected$ = this.store.cartItems$
  readonly destroy$ = new Subject<void>();

  constructor(private bookService: BookService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private store: CartStore) { }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe((param: Params) => {
      this.bookId = param['id'];
      this.book = this.bookService.getBookById(this.bookId);
    })
  }

  increaseQuantity() {
    this.bookQuantity += 1;
  }

  decreaseQuantity() {
    if (this.bookQuantity <= 1) {
      return;
    } else {
      this.bookQuantity -= 1;
    }
  }

  onAddItem() {
    //Still having bug constant adding product to cart
    const currentItem = this.itemListSelected$.forEach(item => {return item})
    if (this.book.quantity && this.bookQuantity > this.book.quantity) {
      this.bookService.sendBookMessage("warning", "Selected quantity exceeds available storage!");
    }
    else {
      const book_id = this.book.book_id.toString();
      const itemId = Math.trunc((Math.random() * 1000000)).toString();
      this.store.addItem({ id: itemId, numbersOfItem: this.bookQuantity, item: this.book });
      this.cartService.onAddItem(book_id, this.bookQuantity);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
