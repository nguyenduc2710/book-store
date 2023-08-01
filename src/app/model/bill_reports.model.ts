import { OriginBill, Products } from "./bill.model";

export interface BillReport{
  bills: OriginBill[],
  topProducts: Products[],
  topCategory: Category[],
  yearReports: any,
  year: number
}

export interface YearReport{
  sales: string[],
  profits: string[]
}

export interface Category{
  type: 'Arts & Music' | 'Biographies' | 'Business' | 'Comics' | 'Computers & Tech' | 'Cooking' | 'Edu & Reference' | 'Entertainment' | 'Health & Fitness' | 'Mysteries' | 'History' | 'Hobbies & Crafts' | 'Medical' | 'Horror' | 'Home & Garden' | 'Kids' | 'Literature & Fiction' | 'Self-Help' | 'True Crime' | 'Sports' | 'Sci-Fi & Fantasy' | 'Parenting' | 'Novel' | "Teen" | "Actions" | "Loves";
}
