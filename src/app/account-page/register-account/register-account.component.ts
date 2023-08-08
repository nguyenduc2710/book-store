import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@/services/user.service';
import * as CryptoJS from 'crypto-js';
import { Subject, map, take, takeUntil } from 'rxjs';
import { OriginUsers } from '@/model/user.model';
import { checkDuplicateUsername } from '@/shared/checkUserDup.validator';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.css']
})

export class RegisterAccountComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  readonly uniqueList = new Set<string>();
  readonly destroy$ = new Subject<void>;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = new FormGroup({});
  }
  ngOnInit(): void {
    this.initForm();
  }

  checkDuplicate(username: string) {
    const isExisted = this.uniqueList.has(username);
    return isExisted;
  }

  onCreateAcc() {
    const username: string = this.registerForm.value['username'].toString();
    if (!this.checkDuplicate(username)) {
      if (this.registerForm.value['password'] === this.registerForm.value['repeatPassword']) {
        const password: string = this.registerForm.value['password'].toString();
        const encodePassword = CryptoJS.SHA256(password + username).toString();
        this.userService.createUser(
          username,
          this.registerForm.value['email'],
          encodePassword,
          this.registerForm.value['fullName'],
          this.registerForm.value['address'],
          this.registerForm.value['gender'],
          this.registerForm.value['age'],
          this.registerForm.value['phoneNumber'],
        );
        this.router.navigate(['/book']);
      } else {
        alert('Password and Confirm Password not met, please try again.');
      }
    } else {
      alert('Username already used, please choose another.');
    }
  }

  private initForm() {
    this.userService.getAllUsers().pipe(takeUntil(this.destroy$)).subscribe(
      (data: OriginUsers) => {
        for (let [key, value] of Object.entries(data)) {
          this.uniqueList.add(value['username']);
        };
      },
    )

    this.registerForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, checkDuplicateUsername(this.uniqueList)]),
      'password': new FormControl(null, Validators.required),
      'repeatPassword': new FormControl(null, Validators.required),
      'fullName': new FormControl(null, Validators.required),
      'phoneNumber': new FormControl(null, [Validators.required, Validators.pattern('[0-9]{10}')]),
      'age': new FormControl(null, Validators.required),
      'gender': new FormControl('male', Validators.required),
      'address': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
