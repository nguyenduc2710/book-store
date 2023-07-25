import { Book } from "src/app/model/books.model"

export interface CartState{
  cartItems: CartItem[],
  numbersOfItem: number
}

export interface CartItem{
  id: string,
  numbersOfItem: number,
  item: Book
}

// export const selectCartState = (state: CartState) => state
