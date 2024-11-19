import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ChartConfigService {
    getBaseConfig(): Highcharts.Options {
        return {
            chart: { type: 'bar' },
            title: { text: 'Top Cryptocurrencies by Market Cap' },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: 'Market Cap (USD)'
                }
            },
            tooltip: {
                pointFormat: '{point.y:,.0f} USD'
            },
            series: [{
                name: 'Market Cap',
                type: 'bar',
                data: []
            }]
        };
    }
}