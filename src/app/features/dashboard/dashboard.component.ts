import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { loadCryptos } from '../../core/state/crypto.actions';
import { Observable } from 'rxjs';
import { selectAllCryptos, selectError, selectLoading } from '../../core/state/crypto.selectors';
import { Cryptocurrency } from '../../models/cryptocurrency.interface';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatProgressSpinnerModule, MatPaginatorModule, MatSortModule, MatFormFieldModule,
        MatInputModule
    ],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    @ViewChild(MatSort) sort!: MatSort;
    dataSource = new MatTableDataSource<Cryptocurrency>();

    cryptos$: Observable<Cryptocurrency[]>;
    loading$: Observable<boolean>;
    error$: Observable<string | null>;

    displayedColumns = [
        'id',
        'name',
        'symbol',
        'current_price',
        'market_cap',
        'total_volume',
        'high_24h',
        'low_24h',
        'price_change_percentage_24h',
        'circulating_supply'
    ];

    pageSize = 10;
    pageSizeOptions = [5, 10, 25, 100];

    constructor(private store: Store) {
        this.cryptos$ = this.store.select(selectAllCryptos);
        this.loading$ = this.store.select(selectLoading);
        this.error$ = this.store.select(selectError);

        this.cryptos$.subscribe(data => {
            this.dataSource.data = data;
        });
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

    ngAfterViewInit() {
        this.dataSource.sort = this.sort;
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

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
      }
}