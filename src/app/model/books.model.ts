export interface Book{
  book_id: number,
  cover: string,
  name: string,
  rating: number,
  descriptions: string,
  author: string,
  price: number
  quantity?: number,
}
