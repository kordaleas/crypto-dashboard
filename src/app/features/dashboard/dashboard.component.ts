import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { loadCryptos } from '../../core/state/crypto.actions';
import { Observable } from 'rxjs';
import { selectAllCryptos, selectError, selectLoading } from '../../core/state/crypto.selectors';
import { Cryptocurrency } from '../../models/cryptocurrency.interface';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule, MatPaginatorModule
  ],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  cryptos$: Observable<Cryptocurrency[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  
  displayedColumns = ['name', 'symbol', 'current_price'];

  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  constructor(private store: Store) {
    this.cryptos$ = this.store.select(selectAllCryptos);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    this.store.dispatch(loadCryptos({ 
      params: { 
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: this.pageSize,
        page: 1,
        sparkline: false
      } 
    }));
  }

  onPageChange(event: PageEvent) {
    this.store.dispatch(loadCryptos({ 
      params: { 
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: event.pageSize,
        page: event.pageIndex + 1,
        sparkline: false
      } 
    }));
  }
}