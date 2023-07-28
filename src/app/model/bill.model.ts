import { Book } from "./books.model";

export interface Bill{
  username?: string,
  fullName: string,
  email: string,
  phoneNumber: string,
  address: string,
  typePayment: string,
  product: Products[],
  totalBill: number,
  dateBuy: string;
  status?: 'cancelled' | 'confirmed' | 'pending' | null;
};

export interface Products{
  productId: string,
  prdDetail: Book,
  quantity: number,
  total: number
};

export interface OriginBill{
  billId: string,
  bill: Bill
};
