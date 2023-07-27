import { Injectable } from "@angular/core";
import { Bill, Products } from "../model/bill.model";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { getDatabase, ref, set } from "firebase/database";
import * as moment from "moment";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class BillService {
  readonly billId$ = new BehaviorSubject<string>('');
  readonly bills$ = new BehaviorSubject<Bill[]>([]);
  bills: Bill[] = [];
  readonly firebaseUrl = "https://angular-udemy-d70fb-default-rtdb.asia-southeast1.firebasedatabase.app"

  constructor(private http: HttpClient) { }

  onCheckout(
    username: string | undefined,
    email: string,
    fullName: string,
    phoneNumber: string,
    address: string,
    products: { book_id: string, bookName: string, quantity: number, totalPrice: number }[],
    total: number
  ) {
    const productList: Products[] = products.map(
      item => {
        return { productId: item.book_id, quantity: item.quantity, total: item.totalPrice }
      }
    )
    const currentDate = moment().format('YYYY-MM-DD HH:mm:ss');
    let rs: Bill = {
      username: username,
      fullName: fullName,
      email: email,
      phoneNumber: phoneNumber,
      address: address,
      typePayment: 'cash',
      totalBill: total,
      product: productList,
      dateBuy: currentDate,
    };
    const db = getDatabase();
    this.billId$.next(this.getRandomNumber());
    if (db) {
      set(ref(db, 'bills/' + this.billId$.value), rs)
    }
  }

  onClearBill() {
    this.billId$.next('');
    this.bills$.next([]);
    this.bills$.complete();
    this.bills = [];
  }

  getRandomNumber() {
    const result = Math.round(Math.random() * Math.random() * 10000000);
    return result.toString();
  }

  getBills(): Observable<any> {
    return this.http.get(this.firebaseUrl + '/bills.json');
  }

}
