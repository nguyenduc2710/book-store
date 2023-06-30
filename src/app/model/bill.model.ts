export interface Bill{
  fullName: string,
  product: Products[],
  email: string,
  phoneNumber: number,
  district: string,
  ward: string,
  level: string,
  address: string,
  typePayment: string,
  totalBill: number
}

export interface Products{
  productId: string,
  quantity: number,
  total: number
}
