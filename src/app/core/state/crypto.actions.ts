import { createAction, props } from '@ngrx/store';
import { CryptoQueryParams } from '../../models/crypto-params.model';
import { Cryptocurrency } from '../../models/cryptocurrency.interface';

export const loadCryptos = createAction(
  '[Crypto] Load Cryptocurrencies',
  props<{ params: CryptoQueryParams }>()
);

export const loadCryptosSuccess = createAction(
  '[Crypto] Load Cryptocurrencies Success',
  props<{ data: Cryptocurrency[] }>()
);

export const loadCryptosFailure = createAction(
  '[Crypto] Load Cryptocurrencies Failure',
  props<{ error: any }>()
);