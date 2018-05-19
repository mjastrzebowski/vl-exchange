import { computedFrom, lazy } from 'aurelia-framework';
import { HttpClient } from 'aurelia-fetch-client';
import { activationStrategy } from 'aurelia-router';
import { SSL_OP_COOKIE_EXCHANGE } from 'constants';

// polyfill fetch client conditionally
const fetch = !self.fetch ? System.import('isomorphic-fetch') : Promise.resolve(self.fetch);

interface Map<T> {
  [key: string]: T;
}

interface Exchange {
  base: string;
  date: string;
  rates: Map<number>;
}

export enum Currency {
  PLN = 'PLN',
  USD = 'USD',
  GBP = 'GBP',
  EUR = 'EUR',
  RON = 'RON'
}

export class CurrencyValueConverter {
  api: string = 'https://exchangeratesapi.io/api/';
  http: HttpClient;
  exchange: Exchange;
  lastBase: Currency;

  constructor(@lazy(HttpClient) private getHttpClient: () => HttpClient) {}

  async getRates(currencyFrom: Currency, currencyTo: Currency): Promise<number> {
    if (this.lastBase !== currencyFrom) {
      this.lastBase = currencyFrom;
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
    }
    return this.exchange ? this.exchange.rates[currencyTo] : 1;
  }

  // Uncomment below function to use in template this way:
  // ${value | currency: currencyFrom : currencyTo & async }
  //
  // toView(value: number, currencyFrom: Currency, currencyTo: Currency): Promise<number | null> {
  //   return this.getRates(currencyFrom, currencyTo)
  //     .then((rate: number) => value * rate || null);
  // }
}
