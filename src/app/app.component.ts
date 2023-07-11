import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BookService } from './services/book.services';
import { UserService } from './services/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ng-books-store';
  constructor(private message: NzMessageService,
    private bookService: BookService,
    private userService: UserService) { }
  // private validUser = false;
  private user$ = this.userService.userMessage$;
  private book$ = this.bookService.bookMessage$;
  readonly destroyed$ = new Subject<void>()

  ngOnInit(): void {
    this.user$.pipe(takeUntil(this.destroyed$)).subscribe(message => {
      if (message.message.length > 0) {
        switch (message.type) {
          case "success":
            this.message.success(message.message);
            break;
          case "error":
            this.message.error(message.message);
            break;
        }
      }
    })
    this.book$.pipe(takeUntil(this.destroyed$)).subscribe(message => {
      if (message.message.length > 0) {
        switch (message.type) {
          case "success":
            this.message.success(message.message);
            break;
          case "warning":
            this.message.warning(message.message);
            break;
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
