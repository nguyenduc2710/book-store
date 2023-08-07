import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, Subscription, catchError, map, of, switchMap, take } from "rxjs";
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
      status: 'pending'
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

  initBillReports(year: string): Observable<BillReport> {
    const sales: number[] = [];
    const profits: number[] = [];
    // const bills$ = this.getBills();
    const data: OriginBill[] = [];
    const billReport: BillReport = {
      bills: [],
      topProducts: [],
      categoriesRp: {
        categories: [],
        totalBooksSold: 0
      },
      yearReports: undefined,
      year: ''
    };

    return this.getBills().pipe(
      take(1),
      map((bills: any[]) => {
        for (const [key, value] of Object.entries(bills)) {
          if(value['dateBuy'].toString().includes(year)){
            data.push({ billId: key, bill: value });
          }
        };
        billReport.bills = data;
        billReport.topProducts = this.top6BestSellers(data);
        billReport.categoriesRp = this.categoryReports(data);
        billReport.year = year;
        const yearRpData = this.salesProfitsReport(data);
        for (let i = 0; i < yearRpData.length; i++) {
          sales.push(yearRpData[i].sales);
          profits.push(yearRpData[i].profits);
        }
        billReport.yearReports = { sales: sales, profits: profits };

        return billReport;
      })
    );
  };

  //(FILTER DATA BEFORE USE FUNCTION)
  top6BestSellers(bills: OriginBill[]): { book: Book, quantity: number }[] {
    const bookMap = new Map<string, { book: Book, quantity: number }>();

    bills.forEach(bill => {
      bill.bill.product.forEach(bill => {
        const bookId = bill.productId;
        const quantity = bill.quantity;

        if (bookMap.has(bookId)) {
          const existing = bookMap.get(bookId);
          if (existing) existing.quantity += quantity;
        } else {
          bookMap.set(bookId, { book: bill.prdDetail, quantity: quantity });
        };
      });
    });
    const sortedBooks = [...bookMap.values()].sort((a, b) => (b.book.price * b.quantity) - (a.book.price * a.quantity));
    return sortedBooks.splice(0, 6);
  }

  //(FILTER DATA BEFORE USE FUNCTION)
  categoryReports(bills: OriginBill[]): { categories: { category: Category, quantity: number }[], totalBooksSold: number } {
    const categoryMap = new Map<Category, { category: Category, quantity: number }>();
    let totalBooksSold = 0;
    bills.forEach(bill => {
      bill.bill.product.forEach(book => {
        book.prdDetail.category.forEach(cate => {
          if (categoryMap.has(cate)) {
            const existing = categoryMap.get(cate);
            if (existing) existing.quantity += book.quantity;
          } else {
            categoryMap.set(cate, { category: cate, quantity: book.quantity });
          }
        });

        totalBooksSold += book.quantity;
      });
    });
    const categoryChartInfo = {
      categories: [...categoryMap.values()].sort((a, b) => b.quantity - a.quantity).splice(0, 8),
      totalBooksSold: totalBooksSold
    };

    return categoryChartInfo;
  }

  //Data through years
  salesProfitsReport(bills: OriginBill[]) {
    const reports = new Map<string, { month: string, sales: number, profits: number }>();

    bills.forEach(bill => {
      const year = bill.bill.dateBuy.split('-')[0];
      const month = bill.bill.dateBuy.split('-')[1];
      let sales = bill.bill.totalBill;
      let profits = +this.randomProfits(sales);

      if (reports.has(month)) {
        const existing = reports.get(month);
        if (existing) {
          existing.sales += sales;
          existing.profits += profits;
        }
      } else {
        reports.set(month, { month: month, sales: sales, profits: profits });
      }
    })
    return [...reports.values()].sort((a, b) => (+a.month) - (+b.month))
  }

  //Random profit return 75 - 90% from origin price;
  randomProfits(sales: number) {
    const randomPercent = ((Math.random() * 25) + 10) / 100;
    const profits = sales - (sales * randomPercent);
    return profits.toFixed(3);
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
