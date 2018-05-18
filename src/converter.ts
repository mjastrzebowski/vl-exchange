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
  heading: string = 'Welcome to the Currency Converter';
  http: HttpClient;
  exchange: Exchange;

  constructor(@lazy(HttpClient) private getHttpClient: () => HttpClient) {}

  async getRates(currency: Currency): Promise<void> {
    // ensure fetch is polyfilled before we create the http client
    await fetch;
    const http = this.http = this.getHttpClient();

    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(this.api);
    });

    const response = await http.fetch(`latest?base=${currency}`);
    this.exchange = await response.json();
    console.log(this.exchange);
  }

  toView(value: number, conversion: number): number {
    console.log('toview');
    this.getRates(Currency.PLN);
    return value * conversion;
  }
}
