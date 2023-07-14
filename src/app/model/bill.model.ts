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
}

export interface Products{
  productId: string,
  quantity: number,
  total: number
}
