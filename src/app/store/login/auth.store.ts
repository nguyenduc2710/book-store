import { Injectable } from "@angular/core";
import { ComponentStore, tapResponse } from "@ngrx/component-store";
import { Observable, switchMap } from "rxjs";
import { User } from "src/app/model/user.class";
import { UserService } from "src/app/services/user.service";

export interface AccountState extends Data<User> {
  users: any[];
  currentUser?: User;
  isAuth: boolean;
}

export interface Data<T> {
  Data: T[];
  total: number;
  page: number;
  size: number
}
const initdata = {
  Data: [],
  total: 0,
  page: 1,
  size: 1,
}
const init: AccountState = {
  ...initdata,
  users: [],
  isAuth: false,
}

@Injectable({ providedIn: "root" })
export class AccountStore extends ComponentStore<AccountState> {
  constructor(private userService: UserService) {
    super(init);
  }

  readonly user$ = this.select((state) => state.users);
  readonly currentuser$ = this.select((state) => state.currentUser);
  readonly loading$ = this.select((state) => state.isAuth);

  //reducers
  readonly addUsers = this.updater<User[]>((state, users) => (
    {
      ...state,
      users: [...state.users, ...users],
      isAuth: false
    }
  ));

  readonly updateCurrentUser = this.updater<User>((state, currentUser): AccountState => (
    {
      ...state,
      currentUser,
      isAuth: true
    }
  ))

  readonly updateAuth = (isAuth: boolean) => this.patchState({ isAuth });

  readonly getUsers = this.effect((params$) => params$.pipe(
    switchMap(() =>
      this.userService.httpUser().pipe(
        tapResponse(
          (users: any[]) => {
            this.addUsers(Object.values(users));
            this.updateAuth(false);
          },
          (error) => console.error(error)
        )
      )
    )
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
