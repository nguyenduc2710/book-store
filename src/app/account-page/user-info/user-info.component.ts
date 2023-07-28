import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/services/user.service';
import { BillStore } from 'src/app/store/bill.store';
import { AccountStore } from 'src/app/store/login/auth.store';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy {
  currentUser?: User;
  readonly accountVm$ = this.accountStore.vm$;
  readonly billsVm$ = this.billStore.vm$;
  readonly currentUser$ = this.userService.currentUser$;
  readonly destroy$ = new Subject<void>;
  viewReceipt = false;

  constructor(private userService: UserService,
    private accountStore: AccountStore,
    private billStore: BillStore) {
      this.billStore.getBills();
  }

  ngOnInit(): void {
    this.accountVm$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.currentUser = data.currentUser;
      if (this.currentUser) {
        this.billStore.getBillsByUsername(this.currentUser.username);
      }
    })
  }

  onViewReceipt(){
    this.viewReceipt = !this.viewReceipt;
  }

  onLogout() {
    this.accountStore.logoutUser();
    this.userService.logout();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
