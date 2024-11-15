import { createReducer, on } from '@ngrx/store';
import * as CryptoActions from './crypto.actions';
import { initialState } from './crypto.state';

export const cryptoReducer = createReducer(
  initialState,
  on(CryptoActions.loadCryptos, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(CryptoActions.loadCryptosSuccess, (state, { data }) => ({
    ...state,
    cryptos: data,
    loading: false
  })),
  on(CryptoActions.loadCryptosFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);