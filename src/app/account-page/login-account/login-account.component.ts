import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-account',
  templateUrl: './login-account.component.html',
  styleUrls: ['./login-account.component.css']
})
export class LoginAccountComponent {
  username: string = '';
  password: string = '';
  userAcc: any[] = [];
  isValid = false;
  constructor(private userService: UserService,
    private router: Router) {
    this.userAcc = this.userService.getUserAcc();
  }

  onSubmit() {
    this.isValid = this.userService.authenUser(this.username, this.password);
    if (this.isValid) {
      this.userService.sendUserMessage("success", "Login succeed");
    } else {
      this.userService.sendUserMessage("error", "Login failed");
    }
    this.router.navigate(['/book']);
  }
  ontest() {
    Object.values(this.userAcc[0]).forEach((user: any) => {
      console.log(user.username);
    });
  }
}
