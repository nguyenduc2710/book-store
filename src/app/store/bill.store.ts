import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { OriginBill } from "../model/bill.model";
import { Book } from "../model/books.model";
import { UserModel } from "../model/user.model";
import { UserService } from "../services/user.service";
import { BookService } from "../services/book.services";
import { BillService } from "../services/bills.service";
import { Injectable } from "@angular/core";
import { switchMap } from "rxjs";

export interface BillState {
  bills: OriginBill[];
  userBills: OriginBill[];
  users: UserModel[];
  books: Book[];
  selectedBillId: string | null;
  billReport?: undefined;
}

const initState = {
  bills: [],
  userBills: [],
  users: [],
  books: [],
  selectedBillId: null,
}

@Injectable({ providedIn: 'root' })
export class BillStore extends ComponentStore<BillState>{
  constructor(
    private userService: UserService,
    private bookService: BookService,
    private billService: BillService
  ) {
    super(initState);
    this.getBills();
    this.getBooks();
    this.getUsers();
  }

  //SELECTORS
  readonly bills$ = this.select((state) => state.bills);
  readonly userBills$ = this.select((state) => state.userBills);
  readonly users$ = this.select((state) => state.users);
  readonly books$ = this.select((state) => state.books);
  readonly selectedBillId$ = this.select((state) => state.selectedBillId);

  //ViewModel
  readonly vm$ = this.select(
    this.bills$,
    this.userBills$,
    this.users$,
    this.books$,
    this.selectedBillId$,
    (bills, userBills, users, books, selectedBillId) => ({
      bills,
      userBills,
      users,
      books,
      selectedBillId
    })
  );

  //UPDATERS
  readonly addBooks = this.updater((state: BillState, book: Book[]) => (
    {
      ...state,
      books: book
    }
  ));
  readonly addUsers = this.updater((state: BillState, users: UserModel[]) => (
    {
      ...state,
      users: users
    }
  ));
  readonly addBills = this.updater((state: BillState, bills: OriginBill[]) => (
    {
      ...state,
      bills: [...bills]
    }
  ));

  readonly getBillsByUsername = this.updater((state: BillState, username: string) => {
    const userBills = state.bills.filter(bill => bill.bill.username === username);
    return {
      ...state,
      userBills: userBills
    }
  });


  //EFFECTS
  readonly getBooks = this.effect(param$ => param$.pipe(
    switchMap(() =>
      this.bookService.getAllBooks().pipe(
        tapResponse(
          (book: any[]) => {
            this.addBooks(Object.values(book));
          },
          err => console.log(err)
        )
      )
    )
  ));

  readonly getUsers = this.effect(param$ => param$.pipe(
    switchMap(() =>
      this.userService.getAllUsers().pipe(
        tapResponse(
          (users: any[]) => {
            this.addUsers(Object.values(users));
          },
          err => console.log(err)
        )
      )
    )
  ));

  readonly getBills = this.effect(param$ => param$.pipe(
    switchMap(() =>
      this.billService.getBills().pipe(
        tapResponse(
          (bills: any[]) => {
            const formatedBill: OriginBill[] = [];
            for (const [key, value] of Object.entries(bills)) {
              formatedBill.push({ billId: key, bill: value });
            };
            console.log("Bill in store ", formatedBill);
            this.addBills(formatedBill);
          },
          err => console.log(err)
        )
      )
    )
  ));




}
