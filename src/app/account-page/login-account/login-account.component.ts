import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AccountStore } from 'src/app/store/login/auth.store';

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

  constructor(private userService: UserService,
    private store: AccountStore) {
    this.userAcc = this.userService.getUserAcc();
  }

  users$ = this.store.user$;
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




  // onSubmit() {
  //   this.isValid = this.userService.authenUser(this.username, this.password);
  //   if (this.isValid) {
  //     this.userService.sendUserMessage("success", "Login succeed");
  //     this.router.navigate(['/book']);
  //   } else {
  //     this.userService.sendUserMessage("error", "Login failed");
  //     this.password = '';
  //   }
  // }
