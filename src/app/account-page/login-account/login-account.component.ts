import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
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
  private firebaseUrl = 'https://angular-udemy-d70fb-default-rtdb.asia-southeast1.firebasedatabase.app/'

  constructor(private userService: UserService,
    private router: Router,
    private http: HttpClient,
    private store: AccountStore) {
    this.userAcc = this.userService.getUserAcc();
  }

  users$ = this.store.user$;
  ngOnInit(): void {
      this.store.getUsers();
      // this.users$.subscribe(console.log)
  }

  onSubmit() {
    this.isValid = this.userService.authenUser(this.username, this.password);
    if (this.isValid) {
      this.userService.sendUserMessage("success", "Login succeed");
      this.router.navigate(['/book']);
    } else {
      this.userService.sendUserMessage("error", "Login failed");
      this.password = '';
    }
  }
  ontest() {
    Object.values(this.userAcc[0]).forEach((user: any) => {
      console.log(user.username);
    });
  }

  Test(){
    // const check = this.userService.httpUser()
    // check.subscribe(change => console.log(change))
    this.userService.authUser('','');
    // console.log("Store user ", this.users$);
  }

}
