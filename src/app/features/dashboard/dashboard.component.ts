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
import { MatIconModule } from '@angular/material/icon';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, MatTableModule, MatProgressSpinnerModule, MatPaginatorModule, MatSortModule, MatFormFieldModule,
        MatInputModule, MatIconModule, HighchartsChartModule
    ],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
    @ViewChild(MatSort) sort!: MatSort;
    dataSource = new MatTableDataSource<Cryptocurrency>();

    activeFilters = {
        general: '',
        name: '',
        symbol: '',
        marketCap: 0,
        volume: 0
    };

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

    Highcharts: typeof Highcharts = Highcharts;
    chartOptions: Highcharts.Options = {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Top Cryptocurrencies by Market Cap'
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'Market Cap (USD)'
        }
      },
      series: [{
        name: 'Market Cap',
        type: 'bar',
        data: []
      }]
    };

    constructor(private store: Store) {
        this.cryptos$ = this.store.select(selectAllCryptos);
        this.loading$ = this.store.select(selectLoading);
        this.error$ = this.store.select(selectError);

        this.cryptos$.subscribe(data => {
            this.dataSource.data = data;
        });

        this.dataSource.filterPredicate = (data: Cryptocurrency, _: string) => {
            const matchesGeneral = !this.activeFilters.general ||
                Object.values(data).some(value =>
                    value?.toString().toLowerCase().includes(this.activeFilters.general)
                );

            return matchesGeneral &&
                (!this.activeFilters.name || data.name.toLowerCase().includes(this.activeFilters.name.toLowerCase())) &&
                (!this.activeFilters.symbol || data.symbol.toLowerCase().includes(this.activeFilters.symbol.toLowerCase())) &&
                (!this.activeFilters.marketCap || data.market_cap >= this.activeFilters.marketCap) &&
                (!this.activeFilters.volume || data.total_volume >= this.activeFilters.volume);
        };
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
        this.activeFilters.general = (event.target as HTMLInputElement).value.trim().toLowerCase();
        this.dataSource.filter = 'trigger';
    }

    filterByName(event: Event) {
        this.activeFilters.name = (event.target as HTMLInputElement).value;
        this.dataSource.filter = 'trigger';
    }

    filterBySymbol(event: Event) {
        this.activeFilters.symbol = (event.target as HTMLInputElement).value;
        this.dataSource.filter = 'trigger';
    }

    filterByMarketCap(event: Event) {
        this.activeFilters.marketCap = parseFloat((event.target as HTMLInputElement).value) || 0;
        this.dataSource.filter = 'trigger';
    }

    filterByVolume(event: Event) {
        this.activeFilters.volume = parseFloat((event.target as HTMLInputElement).value) || 0;
        this.dataSource.filter = 'trigger';
    }

    clearSearch(input: HTMLInputElement) {
        input.value = '';
        this.activeFilters.general = '';
        this.dataSource.filter = 'trigger';
    }

    clearNameFilter(input: HTMLInputElement) {
        input.value = '';
        this.activeFilters.name = '';
        this.dataSource.filter = 'trigger';
    }

    clearSymbolFilter(input: HTMLInputElement) {
        input.value = '';
        this.activeFilters.symbol = '';
        this.dataSource.filter = 'trigger';
    }

    clearMarketCapFilter(input: HTMLInputElement) {
        input.value = '';
        this.activeFilters.marketCap = 0;
        this.dataSource.filter = 'trigger';
    }

    clearVolumeFilter(input: HTMLInputElement) {
        input.value = '';
        this.activeFilters.volume = 0;
        this.dataSource.filter = 'trigger';
    }
}