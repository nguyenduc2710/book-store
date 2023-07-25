import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register-account',
  templateUrl: './register-account.component.html',
  styleUrls: ['./register-account.component.css']
})

export class RegisterAccountComponent implements OnInit {
  registerForm: FormGroup;

  // checkRepeatPass = (group: FormGroup): { [key: string]: boolean } | null => {
  //   let pass = group.get('password');
  //   let confirmPass = group.get('repeatPassword');
  //   if (pass === confirmPass) console.log("Trueeeeee");
  //   return pass === confirmPass ? null : { notSame: true }
  // }

  constructor(private userService: UserService,
    private router: Router) {
    this.registerForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.initForm();
  }
  onCreateAcc() {
    if (this.registerForm.value['password'] === this.registerForm.value['repeatPassword']) {
      this.userService.createUser(
        this.registerForm.value['username'],
        this.registerForm.value['email'],
        this.registerForm.value['password'],
        this.registerForm.value['fullName'],
        this.registerForm.value['address'],
        this.registerForm.value['gender'],
        this.registerForm.value['age'],
        this.registerForm.value['phoneNumber'],
      )
      this.router.navigate(['/book']);
    } else {
      alert('Create user failed, please try again.');
    }
  }

  private initForm() {
    this.registerForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'repeatPassword': new FormControl(null, Validators.required),
      'fullName': new FormControl(null, Validators.required),
      'phoneNumber': new FormControl(null ,[Validators.required, Validators.pattern('[0-9]{10}')]),
      'age': new FormControl(null, Validators.required),
      'gender': new FormControl('male', Validators.required),
      'address': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
    })
  }

}
