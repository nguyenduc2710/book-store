import { Category } from "./bill_reports.model"

export interface Book{
  book_id: string,
  cover: string,
  name: string,
  rating: number,
  descriptions: string,
  author: string,
  price: number
  quantity: number,
  category: Category[]
}

export interface BookStore{
  id: string,
  value: Book[]
}
