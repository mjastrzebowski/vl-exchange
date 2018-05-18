import { computedFrom, lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';

// polyfill fetch client conditionally
const fetch = !self.fetch ? System.import('isomorphic-fetch') : Promise.resolve(self.fetch);

export enum Currency {
  PLN = 'PLN',
  USD = 'USD',
  GBP = 'GBP',
  EUR = 'EUR',
  RON = 'RON'
}

interface Map<T> {
  [key: string]: T;
}

interface Exchange {
  base: string;
  date: string;
  rates: Map<number>;
}

export class CurrencyValueConverter {
  api: string = 'https://exchangeratesapi.io/api/';
  http: HttpClient;
  exchange: Exchange;

  constructor(@lazy(HttpClient) private getHttpClient: () => HttpClient) {}

  async getRates(currencyFrom: Currency, currencyTo: Currency): Promise<number> {
    // ensure fetch is polyfilled before we create the http client
    await fetch;
    const http = this.http = this.getHttpClient();

    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(this.api);
    });

    const response = await http.fetch(`latest?base=${currencyFrom}`);
    this.exchange = await response.json();
    return this.exchange.rates[currencyTo];
  }

  toView(value: number, currencyFrom: Currency, currencyTo: Currency): Promise<number> {
    console.log('toview', currencyFrom, currencyTo);
    return this.getRates(currencyFrom, currencyTo)
      .then((rate: number) => value * rate);
  }
}
