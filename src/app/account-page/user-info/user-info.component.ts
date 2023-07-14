import { Component, OnDestroy, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy {
  currentUser!: User;

  readonly currentUser$ = this.userService.currentUser$;

  currentUserSubcription: Subscription | undefined;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log('init user info', this.userService.currentUser)
    this.currentUserSubcription = this.userService.currentUser.subscribe((user) => {
      if (user) {
        this.currentUser = user;
      }
    })
  }

  onLogout(){
    this.userService.logout();
  }

  ngOnDestroy(): void {
    this.currentUserSubcription?.unsubscribe();
  }
}
