import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { CryptoEffects } from './core/state/crypto.effects';
import { provideHttpClient } from '@angular/common/http';
import { cryptoReducer } from './core/state/crypto.reducers';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideStore({ crypto: cryptoReducer }),
    provideEffects(CryptoEffects),
    // provideStoreDevtools({
    //   maxAge: 25,
    //   connectInZone: true
    // }),
    provideHttpClient(),
    importProvidersFrom(MatSnackBarModule)
  ],
};