import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { UserService } from "../services/user.service";
import { FilterDataService } from "../services/filter.services";
import { CartService } from "../services/cart.service";
import { BookService } from "../services/book.services";

@Component({
  selector: 'app-layout-header',
  template: `
    <nz-page-header class="border-bt">
    <nz-page-header-title class="header-title" routerLink="/book">BOKET</nz-page-header-title>
      <nz-page-header-subtitle>
        <ul nz-menu nzMode="horizontal" class="header-menu">
            <li (click)="onClearSearch()" routerLink="book" nz-menu-item nzSelected>
              <span nz-icon nzType="book" nzTheme="outline"></span>
              Books
            </li>

            <nz-input-group nzSearch [nzAddOnAfter]="suffixIconButton">
              <input #searchVal id="search-box" (keyup)="onChangeSearch(searchVal)" type="text" nz-input placeholder="Input search text" />
            </nz-input-group>
            <ng-template #suffixIconButton>
              <button (click)="onChangeSearch(searchVal)" nz-button nzType="primary" nzSearch><span nz-icon nzType="search"></span></button>
            </ng-template>
        </ul>
      </nz-page-header-subtitle>
      <nz-page-header-extra>
        <ul nz-menu nzMode="horizontal" class="header-menu">
            <li nz-menu-item>
              <nz-badge style="line-height: 1.6;" [nzCount]="bookCount">
                <a style="text-decoration: none;" class="menu-nav-cart" routerLink="cart" rel="noopener noreferrer">View Cart</a>
              </nz-badge>
            </li>

            <li *ngIf="isAuth == false" class="authenticate">
              <a class="authen-account" routerLink="login" rel="noopener noreferrer">Sign in</a>
              /
              <a class="authen-account" routerLink="register" rel="noopener noreferrer">Sign up</a>
            </li>

            <li *ngIf="isAuth == true" class="authenticate">
              <a routerLink="user" class="authen-account" rel="noopener noreferrer">User</a>
            </li>

            <li nz-menu-item>
              <a class="authen-account" routerLink="admin" rel="noopener noreferrer">Admin</a>
            </li>
        </ul>
      </nz-page-header-extra>

    </nz-page-header>
  `,
  styles: [
    '.border-bt {border-bottom: 1px solid rgba(0,0,0,0.1);}',
    '.ant-page-header.ant-page-header-ghost { padding: 8px 24px;}',
    `.header-menu { display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center}`,
    '.authenticate a {color: black;}',
    '.authenticate a:hover {color: #1890ff;}',
    '.header-menu-child {display: flex; flex-direction: row}',
    '.authen-account { text-decoration: none }',
    '.menu-nav-cart { padding-right: 8px }',
    '.header-title { cursor: pointer }',
  ],
})

export class LayoutHeader implements OnInit, OnDestroy {

  @ViewChild("searchVal", { static: false }) searchVal!: ElementRef<HTMLInputElement>;
  constructor(private userService: UserService,
    private filterService: FilterDataService,
    private cartService: CartService,
    private bookService: BookService) { }

  isAuth: boolean = false;
  bookCount = 0;
  ngOnInit(): void {
    this.userService.isAuthenticated.subscribe((isAuthen: boolean) => {
      if (isAuthen) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    })
    this.cartService.itemQuantity$.subscribe((quantity: number) => {
      this.bookCount = quantity;
    })
  }

  onChangeSearch(event: HTMLInputElement) {
    const str = event.value;
    this.filterService.searchOnChange(str);
  }

  onClearSearch() {
    this.searchVal.nativeElement.value = '';
    this.filterService.searchOnChange('');
  }

  ngOnDestroy(): void {
    this.userService.isAuthenticated.unsubscribe();
  }
  addCount(): void {
    this.bookCount++;
  }

  minCount(): void {
    this.bookCount--;
    if (this.bookCount < 0) {
      this.bookCount = 0;
    }
  }
}
