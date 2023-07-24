export interface AccountState {
  loading: boolean;
  success: boolean;
  fail: boolean;
  userName: string;
}
export interface IUserState {
  login: AccountState;
}
