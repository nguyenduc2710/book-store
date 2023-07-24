import { IUserState } from './account.model';

import { ActionReducerMap } from '@ngrx/store';
import { AccountReducer } from './account.reducer';

export interface IAppState {
    user: IUserState;
}
// export const appReducer: ActionReducerMap<IAppState> = {
//     // user: AccountReducer
// };
