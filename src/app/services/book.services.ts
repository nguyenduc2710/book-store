import { Injectable, OnInit } from "@angular/core";
import { Book } from "../model/books.model";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";
import { BehaviorSubject, Subject, map } from "rxjs";
import { Message } from "../model/message.model";

@Injectable({ providedIn: 'root' })
export class BookService{
  onChangeBook = new Subject<Book>();
  private dbBookPath = '/books';
  private books: any[] = [];
  bookRef: AngularFireList<Book>;
  book$ = new BehaviorSubject<Book[]>([]);
  bookMessage$ = new BehaviorSubject<Message>({type: '', message: ''});

  constructor(private db: AngularFireDatabase) {
    this.bookRef = this.db.list(this.dbBookPath);
  }

  callApi(){
    this.bookRef = this.db.list(this.dbBookPath);
    this.bookRef.snapshotChanges()
    .pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.key, value: c.payload.val() })
        )
      )
    ).subscribe(result => {
      const format = result.map(item => {
        const key: any = item.id;
        const val = item.value;
        return { [key]: val }
      });
      this.books = [];
      format.map((item) => {
        //Moi id khac nhau va khong tuan tu, nen khong push theo index cua ham map
        this.books.push(item[+Object.keys(item)]);
      });
      this.book$.next(this.books);
    })
  }
  onAddTest() {

  }

  getAll() {
    return this.books;
  }

  sendBookMessage(type: string, info: string){
    this.bookMessage$.next({type: type, message: info});
  }

  getBookById(book_id: string): Book {
    let rs: Book = {
      book_id: '',
      cover: '',
      name: '',
      rating: 0,
      descriptions: '',
      author: '',
      price: 0
    };
    this.books.forEach((book: Book) => {
      if (book.book_id.toString() === book_id) {
        rs = book;
      }
    })
    return rs;
  }
}

