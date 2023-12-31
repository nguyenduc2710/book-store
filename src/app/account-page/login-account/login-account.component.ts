import { Component, OnInit } from '@angular/core';
import { UserService } from '@/services/user.service';
import { BillStore } from '@/store/bill.store';
import { AccountStore } from '@/store/login/auth.store';

@Component({
  selector: 'app-login-account',
  templateUrl: './login-account.component.html',
  styleUrls: ['./login-account.component.css']
})
export class LoginAccountComponent implements OnInit {
  username: string = '';
  password: string = '';
  userAcc: any[] = [];
  isValid = false;
  users$ = this.store.user$;

  constructor(private userService: UserService,
    private store: AccountStore,
    private billStore: BillStore) {
    this.userAcc = this.userService.getUserAcc();
  }

  ngOnInit(): void {
    this.store.getUsers();
  }

  onAuthLogin() {
    this.store.authUser({ username: this.username, password: this.password });
    if (!this.userService.isAuthenticated.value) {
      this.password = '';
    }
  }
}
