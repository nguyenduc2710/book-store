import { Injectable, effect } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { EMPTY, exhaustMap, switchMap, pipe, of, tap, Observable, map, OperatorFunction } from 'rxjs'
import { UserService } from 'src/app/services/user.service'
import { loginSuccess } from './account.action'


@Injectable()
// @effect()
// @Effect()
export class authenEffects {
  constructor(private actions$: Actions,
    private userService: UserService) { }

  // login$ = createEffect(() => this.actions$.pipe(
  //   ofType('[Auth] Login'),
  //   switchMap((action) => {
  //     const params = action;
  //     of(1, 2, 3)
  //       .pipe(map((x) => x * x))
  //       .subscribe((v) => console.log(`value: ${v}`));

  //   }),
  // ))


}
