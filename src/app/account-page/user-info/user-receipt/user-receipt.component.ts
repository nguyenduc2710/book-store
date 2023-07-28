import { Component, Input } from '@angular/core';
import { OriginBill } from 'src/app/model/bill.model';

@Component({
  selector: 'app-user-receipt',
  templateUrl: './user-receipt.component.html',
  styleUrls: ['./user-receipt.component.css']
})
export class UserReceiptComponent {
  //products, total, date, billId, status
  //BillsStore: billId, status, date, products[]
  @Input() receipt!: OriginBill;


}
