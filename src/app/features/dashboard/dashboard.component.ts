import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { loadCryptos } from '../../core/state/crypto.actions';
import { Observable } from 'rxjs';
import { selectAllCryptos, selectError, selectLoading } from '../../core/state/crypto.selectors';
import { Cryptocurrency } from '../../models/cryptocurrency.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  cryptos$: Observable<Cryptocurrency[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  
  displayedColumns = ['name', 'symbol', 'current_price'];

  constructor(private store: Store) {
    this.cryptos$ = this.store.select(selectAllCryptos);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    debugger;
    this.store.dispatch(loadCryptos({ 
      params: { 
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 250,
        page: 1,
        sparkline: false
      } 
    }));
  }
}