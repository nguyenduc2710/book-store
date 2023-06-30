import { Injectable } from "@angular/core";
import { Book } from "../model/books.model";
import { AngularFireDatabase, AngularFireList } from "@angular/fire/compat/database";
import { Subject, map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class BookService {
  onChangeBook = new Subject<Book>();
  private dbBookPath = '/books';
  private books: any[] = [];
  bookRef: AngularFireList<Book>;

  constructor(private db: AngularFireDatabase) {
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
        format.map((item) => {
          //Moi id khac nhau va khong tuan tu, nen khong push theo index cua ham map
          this.books.push(item[+Object.keys(item)]);
        });
      })
  }

  onAddTest() {

  }

  getAll() {
    return this.books;
  }

  getBook(index: number) {
    return this.books[index];
  }

  getBookById(book_id: string): Book {
    let rs: Book = {
      book_id: 0,
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

