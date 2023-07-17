export interface Book{
  book_id: string,
  cover: string,
  name: string,
  rating: number,
  descriptions: string,
  author: string,
  price: number
  quantity: number,
}

export interface BookStore{
  id: string,
  value: Book[]
}
