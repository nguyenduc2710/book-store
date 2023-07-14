import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { BookService } from '../services/book.services';
import { UserModel } from '../model/user.model';
import { Subject, takeUntil } from 'rxjs';
import { CartService } from '../services/cart.service';
import { BillService } from '../services/bills.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  @ViewChild('#cashMethod') cashMethod?: ElementRef;

  summaryCart: { book_id: string, bookName: string, quantity: number, totalPrice: number }[] = [];
  summaryCart$ = this.cartService.shortList$;
  userInfo?: UserModel;
  totalBeforeVat$ = this.cartService.totalPrice$;
  totalAfterVat$ = this.cartService.totalPriceAfterVAT$;
  destroy$ = new Subject<void>();
  checkoutForm: FormGroup = new FormGroup({
    'fullName': new FormControl('', Validators.required),
    'phoneNumber': new FormControl('', [Validators.required, Validators.minLength(9)]),
    'email': new FormControl('', Validators.required),
    'address': new FormControl('', Validators.required),
  });

  constructor(private userService: UserService,
    private cartService: CartService,
    private billService: BillService) {
    // this.cashMethod.nativeElement.
  }

  ngOnInit(): void {
    this.userInfo = this.userService.getCurrentUser();
    if (this.userInfo.fullName && this.userInfo.phoneNumber && this.userInfo.address) {
      this.checkoutForm = new FormGroup({
        'fullName': new FormControl(this.userInfo.fullName, Validators.required),
        'phoneNumber': new FormControl(this.userInfo.phoneNumber, [Validators.required, Validators.minLength(9)]),
        'email': new FormControl(this.userInfo.email, Validators.required),
        'address': new FormControl(this.userInfo.address, Validators.required),
      })
    }
    this.summaryCart$.pipe(takeUntil(this.destroy$)).subscribe(product => {
      this.summaryCart = this.cartService.getShortListProducts();
    })
  }

  functionComingSoon() {
    this.cartService.sendCartMessage('info', 'Feature coming soon, please use method payment by cash!');
  }

  onTest() {
    const checkoutForm = this.checkoutForm.value;
    const username = this.userService.currentUser.value;
    const products = this.cartService.getShortListProducts();
    const totalBill = this.cartService.totalPriceAfterVAT$.value;
    this.billService.onCheckout(
      username.username,
      checkoutForm.email,
      checkoutForm.fullName,
      checkoutForm.phoneNumber,
      checkoutForm.address,
      products,
      totalBill,
    )
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
