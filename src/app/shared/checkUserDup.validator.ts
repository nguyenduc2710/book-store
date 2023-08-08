import { AbstractControl, ValidatorFn } from "@angular/forms";

export function checkDuplicateUsername(usernameList: Set<string>): ValidatorFn{
  return (control: AbstractControl): { [key: string]: any} | null =>{
    if(!control.value){
      return null
    }

    return usernameList.has(control.value) ? {userExisted: control.value} : null
  }
}
