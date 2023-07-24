import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/user.class";
import { Action } from "@ngrx/store";

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGOUT = '[Auth] Logout',
}

// export const login = createAction('[Login Component] Login Account');
// export const register_account = createAction('[Register Component] Register Account');

export class LoginAccount implements Action {
  public readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: { username: string, password: string }) { }
}

export class LoginSuccess implements Action {
  public readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: string) { }
}
export class LoginFail implements Action {
  public readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor() { }
}

export type AccountActions = LoginAccount | LoginSuccess | LoginFail

export const login = createAction(
  AuthActionTypes.LOGIN,
  props<{ username: string, password: string }>()
)

export const loginSuccess = createAction(
  AuthActionTypes.LOGIN_SUCCESS,
  props<{ user: User }>()
)

export const loginFailure = createAction(
  AuthActionTypes.LOGIN_FAILURE,
  props<{ error: string }>()
)

export const logout = createAction(
  AuthActionTypes.LOGOUT
)
