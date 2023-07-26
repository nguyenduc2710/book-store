import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Observable, switchMap } from "rxjs";
import { delay, tap } from 'rxjs/operators'
import { User } from "src/app/model/user.class";
import { UserService } from "src/app/services/user.service";
import { Router } from '@angular/router';


export interface AccountState {
  users: User[];
  currentUser?: User;
  isAuth: boolean;
}

// export interface Data<T> {
//   Data: T[];
//   total: number;
//   page: number;
//   size: number
// }
// const initdata = {
//   Data: [],
//   total: 0,
//   page: 1,
//   size: 1,
// }
const init: AccountState = {
  users: [],
  currentUser: undefined,
  isAuth: false,
}

@Injectable({ providedIn: "root" })
export class AccountStore extends ComponentStore<AccountState> {
  constructor(private userService: UserService,
    private router: Router) {
    super(init);
  }

  //SELECTORS
  readonly user$ = this.select((state) => state.users);
  readonly currentuser$ = this.select((state) => state.currentUser);
  readonly isAuth$ = this.select((state) => state.isAuth);

  //ViewModel for components
  readonly vm$ = this.select(
    this.user$,
    this.currentuser$,
    this.isAuth$,
    (user, currentUser, isAuth) => ({
      user,
      currentUser,
      isAuth
    })
  )

  readonly addUsers = this.updater<User[]>((state, users) => (
    {
      ...state,
      users: [...state.users, ...users],
      isAuth: false
    }
  ));

  //UPDATERS
  readonly updateCurrentUser = this.updater((state: AccountState, currentUser: User): AccountState => (
    {
      ...state,
      currentUser,
      isAuth: true
    }
  ))

  readonly updateAuthLogout = this.updater((state: AccountState) =>
  ({
    ...state,
    currentUser: undefined,
    isAuth: false
  })
  );

  //EFFECTS
  readonly getUsers = this.effect((params$) => params$.pipe(
    switchMap(() =>
      this.userService.getAllUsers().pipe(
        tapResponse(
          (users: any[]) => {
            this.addUsers(Object.values(users));
          },
          (error) => console.error(error)
        )
      )
    )
  ));

  readonly authUser = this.effect((param$: Observable<{ username: string, password: string }>) => param$.pipe(
    switchMap((credential) =>
      this.userService.authUser(credential.username, credential.password).pipe(
        delay(400),
        tapResponse(
          (user) => {
            if (user.value.username.length > 0) {
              this.updateCurrentUser(user);
              this.userService.sendUserMessage("success", "Login succeed");
              this.router.navigate(['/book']);
            } else {
              this.userService.sendUserMessage("error", "Login failed");
            }
          },
          (err) => console.log(err)
        )
      )
    )
  ));

  readonly logoutUser = this.effect<void>((param$) => param$.pipe(
    tap(() => {
      this.userService.logout();
      this.updateAuthLogout();
    })
  ))

}



 //   readonly setPaginationRouting = this.updater<[number, number]>(
  //     (state, data): ManagerBd10State => ({
  //         ...state,
  //         pageIndexRouting: data[0],
  //         pageSizeRouting: data[1],
  //     })
  // );

  //actions
  // readonly getUsers = this.effect(() => {
  //   this.updateAuth(false);
  //   return this.userService.httpUser().pipe(
  //     tapResponse(
  //       (users: any[]) => {
  //         this.addUsers(Object.values(users));
  //         this.updateAuth(false);
  //       },
  //       (error) => console.error(error)
  //     )
  //   );
  // });
  // ok = () => {
  //   this.updateAuth(false);
  //   return this.userService.httpUser().pipe(
  //     tapResponse(
  //       (users: any[]) => {
  //         this.addUsers(Object.values(users));
  //         this.updateAuth(false);
  //       },
  //       (error) => console.error(error)
  //     )
  //   );
  // }


//   readonly loadDataRouting = this.effect<[[number, number, Filter[], Sort[]], FilterParams]>((params$) =>params$.pipe(
  //       tap(() => this.patchState({ isLoadingRouting: true })),
  //       switchMap(([[page, pageSize, filters, sorts], filterParams]) =>
  //           this.service
  //               .getBD10sRouting(page, pageSize, filters, sorts, filterParams)
  //               .pipe(
  //                   tapResponse(
  //                       (pagedModel: PagedModelCustom<DTO_ManagerBD10>) => {
  //                           this.patchState((state) => ({
  //                               ...state,
  //                               dataRouting: pagedModel.data,
  //                               totalCountRouting: pagedModel.meta.totalItems,
  //                               isLoadingRouting: false,
  //                           }));
  //                       },
  //                       (error: HttpErrorResponse) => {
  //                           this.message.error(error.error.message);
  //                           this.patchState((state) => ({
  //                               ...state,
  //                               dataRouting: [],
  //                               totalCountRouting: 0,
  //                               isLoadingRouting: false,
  //                           }));
  //                       }
  //                   ),
  //                   finalize(() => {
  //                       this.patchState({ isLoadingRouting: false });
  //                   })
  //               )
  //       )
  //   )
  // );


  // readonly authUser = this.effect((username: string, password: string) => {
  //     this.userService.authUser(username, password).pipe(

  //     )
  //     return Observable;
  //   })
