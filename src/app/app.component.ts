import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BookService } from './services/book.services';
import { UserService } from './services/user.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { Message } from './model/message.model';
import { CartService } from './services/cart.service';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { fade } from './route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    fade,
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ng-books-store';
  routerSubcription$: Subscription;
  private isAdmin = false;

  constructor(private message: NzMessageService,
    private bookService: BookService,
    private userService: UserService,
    private cartService: CartService,
    private routes: Router) {
    this.routerSubcription$ = this.routes.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if(event.url.toString().split('/')[1] === 'admin'){
          this.isAdmin = true;
        } else{
          this.isAdmin = false;
        }
      }
    })
  }
  // private validUser = false;
  private user$ = this.userService.userMessage$;
  private book$ = this.bookService.bookMessage$;
  private cart$ = this.cartService.cartMessage$;
  readonly destroyed$ = new Subject<void>()

  ngOnInit(): void {
    // this.routerSubcription$ = this.routes.paramMap.subscribe(param => console.log("Param changing ", param.getAll))
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

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  renderMessage(message: Message) {
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

  getStatus():boolean{
    return this.isAdmin;
  }

  ngOnDestroy(): void {
    this.routerSubcription$.unsubscribe();
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
