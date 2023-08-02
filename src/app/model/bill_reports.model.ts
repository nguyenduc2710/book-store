import { OriginBill, Products } from "./bill.model";
import { Book } from "./books.model";

export interface BillReport{
  bills: OriginBill[],
  topProducts: topProducts[],
  categoriesRp: categoryRp | undefined,
  yearReports: YearReport | undefined,
  year: string
}

export interface topProducts{
  book: Book,
  quantity: number
}

export interface categoryRp{
  categories: categories[] | undefined,
  totalBooksSelled: number
}

export interface categories{
  category: Category,
  quantity: number
}

export interface Category{
  type: 'Arts & Music' | 'Biographies' | 'Business' | 'Comics' | 'Computers & Tech' | 'Cooking' | 'Edu & Reference' | 'Entertainment' | 'Health & Fitness' | 'Mysteries' | 'History' | 'Hobbies & Crafts' | 'Medical' | 'Horror' | 'Home & Garden' | 'Kids' | 'Literature & Fiction' | 'Self-Help' | 'True Crime' | 'Sports' | 'Sci-Fi & Fantasy' | 'Parenting' | 'Novel' | "Teen" | "Actions" | "Loves";
}

export interface YearReport{
  sales: number[],
  profits: number[]
}
