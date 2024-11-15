import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { CryptoService } from '../../core/services/crypto.service';
import * as CryptoActions from './crypto.actions';

@Injectable()
export class CryptoEffects {
  loadCryptos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CryptoActions.loadCryptos),
      mergeMap(({ params }) =>
        this.cryptoService.getCryptocurrencies(params).pipe(
          map(data => CryptoActions.loadCryptosSuccess({ data })),
          catchError(error => of(CryptoActions.loadCryptosFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private cryptoService: CryptoService
  ) {}
}