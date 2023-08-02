import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subscription, catchError, of, take } from "rxjs";
import { getDatabase, ref, set } from "firebase/database";
import { BookService } from "./book.services";
import * as moment from "moment";
import { Bill, OriginBill, Products } from "../model/bill.model";
import { BillReport, Category } from "../model/bill_reports.model";
import { Book } from "../model/books.model";

@Injectable({ providedIn: 'root' })
export class BillService {
  readonly billId$ = new BehaviorSubject<string>('');
  readonly bills$ = new BehaviorSubject<Bill[]>([]);
  bills: Bill[] = [];
  readonly firebaseUrl = "https://angular-udemy-d70fb-default-rtdb.asia-southeast1.firebasedatabase.app";

  constructor(private http: HttpClient,
    private bookService: BookService) { }

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
        return {
          productId: item.book_id,
          quantity: item.quantity,
          total: item.totalPrice,
          prdDetail: this.bookService.getBookById(item.book_id)
        }
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
  };

  onClearBill() {
    this.billId$.next('');
    this.bills$.next([]);
    this.bills$.complete();
    this.bills = [];
  };

  getRandomNumber() {
    const result = Math.round(Math.random() * Math.random() * 10000000);
    return result.toString();
  };

  getBills(): Observable<any> {
    return this.http.get(this.firebaseUrl + '/bills.json').pipe(
      catchError((err) => {
        console.error("Error Fetching bill: ", err);
        return of(null);
      })
    );
  };

  initBillReports() {
    const bills$ = this.getBills();
    const data: OriginBill[] = [];
    const billReport: BillReport[] = [];

    bills$.pipe(take(1)).subscribe((bills: any[]) => {
      for (const [key, value] of Object.entries(bills)) {
        data.push({ billId: key, bill: value });
      };

      console.log("cal topbook func ", this.calculateTopSellers(data));
      console.log("cal top cate func ", this.popularCategory(data));

    });
  };

  //return top 8 best sellers (FILTER DATA BEFORE USE FUNCTION)
  calculateTopSellers(bills: OriginBill[]): { book: Book, quantity: number }[] {
    const bookMap = new Map<string, {book: Book, quantity: number}>();

    bills.forEach(bill => {
      bill.bill.product.forEach(bill => {
        const bookId = bill.productId;
        const quantity = bill.quantity;

        if(bookMap.has(bookId)){
          const existing = bookMap.get(bookId);
          if(existing) existing.quantity += quantity;
        }else{
          bookMap.set(bookId, {book: bill.prdDetail, quantity: quantity});
        };
      });
    });
    const sortedBooks = [...bookMap.values()].sort((a, b) => b.quantity - a.quantity);
    return sortedBooks.splice(0, 8);
  }

  //return top 6 poplular categories (FILTER DATA BEFORE USE FUNCTION)
  popularCategory(bills: OriginBill[]): {categories: {category: Category, quantity: number}[], totalBooksSelled: number}{
    const categoryMap = new Map<Category,{category: Category, quantity: number}>();
    let totalBooksSelled = 0;
    bills.forEach(bill => {
      bill.bill.product.forEach(book => {
        book.prdDetail.category.forEach(cate => {
          if(categoryMap.has(cate)){
            const existing = categoryMap.get(cate);
            if(existing) existing.quantity += book.quantity;
          } else{
            categoryMap.set(cate, {category: cate, quantity: book.quantity});
          }
        });

        totalBooksSelled += book.quantity;
      });
    });
    const categoryChartInfo = {
      categories: [...categoryMap.values()].sort((a,b) => b.quantity - a.quantity),
      totalBooksSelled: totalBooksSelled
    };

    return categoryChartInfo;
  }


}


// calculateTopSellers(bills: OriginBill[]): { book: Book, quantity: number }[] {
//   const topBooks: { book: Book, quantity: number }[] = [];
//   const bookList: { book: Book, quantity: number }[] = [];
//   const values = bills.map(bill => { return bill.bill });

//   values.forEach(bill => {
//     bill["product"].forEach(book => {
//       const existedIndex = bookList.findIndex(item => book.prdDetail.book_id === item.book.book_id);
//       if (existedIndex === -1) {
//         bookList.push({ book: book.prdDetail, quantity: book.quantity })
//       } else {
//         bookList[existedIndex].quantity = bookList[existedIndex].quantity + book.quantity;
//       }
//     })
//   })

//   bookList.sort((a, b) => b.quantity - a.quantity);

//   for(let i = 0; i < bookList.length; i++){
//     if(i > 7){
//       break;
//     }
//     topBooks.push(bookList[i]);
//   }
//   return topBooks;
// }
