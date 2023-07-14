import { Injectable } from "@angular/core";
import { Bill, Products } from "../model/bill.model";
import { BehaviorSubject } from "rxjs";
import { getDatabase, ref, set } from "firebase/database";
import * as moment from "moment";

@Injectable({ providedIn: 'root' })
export class BillService {
  bills$ = new BehaviorSubject<Bill[]>([]);
  bills: Bill[] = [];

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
    if (db) {
      set(ref(db, 'bills/' + this.getRandomNumber()), rs)
    }
  }

  getRandomNumber() {
    const result = Math.round(Math.random() * Math.random() * 10000000);
    return result.toString();
  }



}
