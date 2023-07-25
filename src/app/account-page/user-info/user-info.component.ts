import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/model/user.class';
import { UserService } from 'src/app/services/user.service';
import { AccountStore } from 'src/app/store/login/auth.store';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnDestroy {
  currentUser!: User;
  currentUserSubcription: Subscription | undefined;
  vm$ = this.store.vm$;
  readonly currentUser$ = this.userService.currentUser$;

  constructor(private userService: UserService,
    private store: AccountStore) { }

  ngOnInit(): void {
    console.log('init user info', this.userService.currentUser)
    this.currentUserSubcription = this.userService.currentUser.subscribe((user) => {
      if (user) {
        this.currentUser = user;
      }
    })
  }

  onLogout(){
    this.store.logoutUser();
    // this.userService.logout();
  }

  ngOnDestroy(): void {
    this.currentUserSubcription?.unsubscribe();
  }
}
