import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
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
}
