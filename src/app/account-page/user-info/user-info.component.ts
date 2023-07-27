import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  currentUser!: User;
  currentUserSubcription: Subscription | undefined;
  accountVm$ = this.accountStore.vm$;
  billsVm$ = this.billStore.vm$;
  readonly currentUser$ = this.userService.currentUser$;

  constructor(private userService: UserService,
    private accountStore: AccountStore,
    private billStore: BillStore) { }

  ngOnInit(): void {
    this.currentUserSubcription = this.userService.currentUser.subscribe((user) => {
      if (user) {
        this.currentUser = user;
      }
    })
  }

  onLogout(){
    this.accountStore.logoutUser();
    this.userService.logout();
  }

  ngOnDestroy(): void {
    this.currentUserSubcription?.unsubscribe();
  }
}
