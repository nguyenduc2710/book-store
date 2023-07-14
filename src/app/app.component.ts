import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BookService } from './services/book.services';
import { UserService } from './services/user.service';
import { Subject, take, takeUntil } from 'rxjs';
import { Message } from './model/message.model';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ng-books-store';
  constructor(private message: NzMessageService,
    private bookService: BookService,
    private userService: UserService,
    private cartService: CartService) { }
  // private validUser = false;
  private user$ = this.userService.userMessage$;
  private book$ = this.bookService.bookMessage$;
  private cart$ = this.cartService.cartMessage$;
  readonly destroyed$ = new Subject<void>()

  ngOnInit(): void {
    this.user$.pipe(takeUntil(this.destroyed$)).subscribe(message => {
      this.renderMessage(message);
    })
    this.book$.pipe(takeUntil(this.destroyed$)).subscribe(message => {
      this.renderMessage(message);
    })
    this.cart$.pipe(takeUntil(this.destroyed$)).subscribe(message => {
      this.renderMessage(message);
    })
  }

  renderMessage(message: Message){
    if (message.info.length > 0) {
      switch (message.type) {
        case "info":
          this.message.info(message.info);
          break;
        case "success":
          this.message.success(message.info);
          break;
        case "error":
          this.message.error(message.info);
          break;
        case "warning":
          this.message.warning(message.info);
          break;
      }
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
