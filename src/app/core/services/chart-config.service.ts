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
                },
                labels: {
                    formatter: function () {
                        const value = this.value as number;
                        if (value >= 1e9) {
                            return (value / 1e9) + 'B';
                        }
                        return (value / 1e6) + 'M';
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{point.key}</b><br/>',
                pointFormat: `
                  Market Cap: ${'{point.y:,.0f}'} USD<br/>
                  Price: ${'{point.price:,.2f}'} USD<br/>
                  24h Change: <span style="color: {point.changeColor}">{point.priceChange}%</span><br/>
                  Volume: ${'{point.volume:,.0f}'} USD
                `
            },
            series: [{
                name: 'Market Cap',
                type: 'bar',
                data: []
            }]
        };
    }
}