import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, switchMap, tap } from 'rxjs/operators';
import { CryptoService } from '../../core/services/crypto.service';
import * as CryptoActions from './crypto.actions';


@Injectable()
export class CryptoEffects {
  constructor(
    private actions$: Actions,
    private cryptoService: CryptoService
  ) {
  }


  loadCryptos$ = createEffect(() => {
    return of(null).pipe(
      switchMap(() => this.actions$),
      ofType(CryptoActions.loadCryptos),
      switchMap(action => {
        return this.cryptoService.getCryptocurrencies(action.params).pipe(
          map(data => CryptoActions.loadCryptosSuccess({ data })),
          catchError(error => of(CryptoActions.loadCryptosFailure({ error })))
        )
      })
    );
  });
}