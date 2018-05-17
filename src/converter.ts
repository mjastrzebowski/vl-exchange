import {computedFrom, lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

// polyfill fetch client conditionally
const fetch = !self.fetch ? System.import('isomorphic-fetch') : Promise.resolve(self.fetch);

enum Currency {
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

export class CurrencyFormatValueConverter {
  toView(value, conversion) {
    return value * conversion;
  }
}

export class Converter {
  api: string = 'https://exchangeratesapi.io/api/';
  heading: string = 'Welcome to the Currency Converter';
  http: HttpClient;
  exchange: Exchange;
  currencies: string[] = Object.keys(Currency).filter(key => !!Currency[key] || !isNaN(Number(Currency[key])));

  amountFrom: number = 1;
  currencyFrom: Currency = Currency.PLN;

  constructor(@lazy(HttpClient) private getHttpClient: () => HttpClient) {
    console.log(this.currencies);
  }

  @computedFrom('amountFrom', 'currencyFrom')
  get amountTo(): number {
    return this.amountFrom * this.exchange.rates[this.currencyFrom];
    // return `${this.amountFrom} ${this.exchange.rates['PLN']} ${this.currencyFrom}`;
  }

  async activate(): Promise<void> {
    // ensure fetch is polyfilled before we create the http client
    await fetch;
    const http = this.http = this.getHttpClient();

    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl(this.api);
    });

    const response = await http.fetch('latest');
    this.exchange = await response.json();
  }

  // submit() {
  //   alert(`Welcome, ${this.fullName}!`);
  // }
}

export class UpperValueConverter {
  toView(value: string): string {
    return value && value.toUpperCase();
  }
}