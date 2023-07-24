import { createReducer, on } from "@ngrx/store";
import { AccountActions, AuthActionTypes, login } from "./account.action";
import { AccountState, IUserState } from "./account.model";

export const initialState = {
  login: { username: '', password: '' },
  register: {
    username: '',
    password: '',
    fullName: '',
    address: '',
    gender: '',
    age: 0,
    phoneNumber: '',
    imagePath: '',
    email: '',
  },
}
const initLoginState: AccountState = {
  loading: false,
  success: false,
  fail: false,
  userName: ''
};
const initUserState: IUserState = {
  login: initLoginState
}

export function AccountReducer(state = initUserState, action: AccountActions): IUserState {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        ...state,
        login: { ...initLoginState, loading: true }
      }
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        login: { ...state.login, loading: false, success: true, userName: action.payload }
      };
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        login: { ...state.login, loading: false, fail: true }
      };
    default:
      return state;
  }
}

// export const authUser = createReducer(
//   initialState,
//   // on(login, (state) => state.login.password == '')
// )
