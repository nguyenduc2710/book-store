import { Injectable } from "@angular/core";
import { Book } from "../model/books.model";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";
import { BehaviorSubject, map } from "rxjs";
import { Message } from "../model/message.model";
import { getDatabase, ref, update } from "firebase/database";

@Injectable({ providedIn: 'root' })
export class BookService {
  // onChangeBook = new Subject<Book>();
  private dbBookPath = '/books';
  private books: any[] = [];
  bookRef: AngularFireList<Book>;
  originStore$ = new BehaviorSubject<any[]>([]);
  book$ = new BehaviorSubject<Book[]>([]);
  bookMessage$ = new BehaviorSubject<Message>({ type: '', info: '' });

  constructor(private db: AngularFireDatabase) {
    this.bookRef = this.db.list(this.dbBookPath);
  }

  callApi() {
    this.bookRef = this.db.list(this.dbBookPath);
    this.bookRef.snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c =>
            ({ id: c.key, value: c.payload.val() })
          )
        )
      ).subscribe(result => {
        this.books = [];
        const origin = result.map(item => {
          this.books.push(item.value);
          return item
        });
        this.book$.next(this.books);
        this.originStore$.next(origin)
      })
  }

  getAll() {
    return this.books;
  }

  sendBookMessage(type: string, info: string) {
    this.bookMessage$.next({ type: type, info: info });
  }

  getBookById(book_id: string): Book {
    let rs: Book = {
      book_id: '',
      cover: '',
      name: '',
      rating: 0,
      descriptions: '',
      author: '',
      price: 0,
      quantity: 0
    };
    this.books.forEach((book: Book) => {
      if (book.book_id.toString() === book_id) {
        rs = book;
      }
    })
    return rs;
  }

  getBookIndex(book_id: string) {
    let rs: string = '';
    this.originStore$.value.forEach((item: { id: string, value: Book }) => {
      for (const [key, value] of Object.entries(item.value)) {
        if (key == 'book_id' && book_id == value) {
          rs = item.id;
        }
      }
    })
    return rs.toString();
  }

  updateBookQuantity(shortList: { book_id: string, quantity: number }[]) {
    const updatedList: any = {};
    shortList.forEach(item => {
      const currentIndex = this.getBookIndex(item.book_id);
      this.originStore$.value.forEach(
        (book: { id: string, value: Book }) => {
          if (book.id == currentIndex && currentIndex.length > 0) {
            book.value.quantity = book.value.quantity - item.quantity;
            updatedList['/books/' + currentIndex] = book.value;
          }
        }
      )
    })

    const db = getDatabase();
    update(ref(db), updatedList)
  }


  //Update one item at a time called
  // updateBookQuantity(book_id: string, quantity: number) {
  //   const index = this.getBookIndex(book_id);
  //   let updatedItem = {};
  //   this.originStore$.value.forEach((item: { id: string, value: Book }) => {
  //     if (item.id == index && index.length > 0 ) {
  //       item.value.quantity = item.value.quantity - quantity;
  //       updatedItem = item;
  //     }
  //   })

  //   const db = getDatabase();
  //   update(ref(db),
  //     {
  //       '/books/b_1': {
  //         "author": "Rebecca Serle",
  //         "book_id": "47894246",
  //         "cover": "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1626799802i/58438583.jpg",
  //         "descriptions": "The New York Times bestselling author of the 'heartwarming, heartbreaking, and hard to put down' (Laurie Frankel, New York Times bestselling author) modern classic In Five Years returns with a moving and unforgettable exploration of the powerful bond between mother and daughter set on the breathtaking Amalfi Coast. When Katy's mother dies, she is left reeling. Carol wasn't just Katy's mom, but her best friend and first phone call. She had all the answers and now, when Katy needs her the most, she is gone. To make matters worse, their planned mother-daughter trip of a lifetime looms: one week in Positano, the magical town Carol spent the summer right before she met Katy's father. Katy has been waiting years for Carol to take her, and now she is faced with embarking on the adventure alone. But as soon as she steps foot on the Amalfi Coast, Katy begins to feel her mother's spirit. Buoyed by the stunning waters, beautiful cliffsides, delightful residents, and, of course, delectable food, Katy feels herself coming back to life. And then Carol appears--in the flesh, healthy, sun-tanned, and thirty years old. Katy doesn't understand what is happening, or how--all she can focus on is that she has somehow, impossibly, gotten her mother back. Over the course of one Italian summer, Katy gets to know Carol, not as her mother, but as the young woman before her. She is not exactly who Katy imagined she might be, however, and soon Katy must reconcile the mother who knew everything with the young woman who does not yet have a clue. Rebecca Serle's next great love story is here, and this time it's between a mother and a daughter. With her signature 'heartbreaking, redemptive, and authentic' (Jamie Ford, New York Times bestselling author) prose, Serle has crafted a transcendent novel about how we move on after loss, and how the people we love never truly leave us",
  //         "name": "One Italian Summer",
  //         "price": 13.95,
  //         "quantity": 100,
  //         "rating": 3.62
  //       }
  //     })
  // }

}

