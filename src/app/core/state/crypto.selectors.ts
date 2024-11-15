import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CryptoState } from './crypto.state';

export const selectCryptoState = createFeatureSelector<CryptoState>('crypto');

export const selectAllCryptos = createSelector(
  selectCryptoState,
  (state) => state.cryptos
);

export const selectLoading = createSelector(
  selectCryptoState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectCryptoState,
  (state) => state.error
);