import {computedFrom, lazy} from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';

// polyfill fetch client conditionally
const fetch = !self.fetch ? System.import('isomorphic-fetch') : Promise.resolve(self.fetch);

enum Currency { PLN, USD, GBP, EUR }

interface Map<T> {
  [key: string]: T;
}

interface Exchange {
  base: string;
  date: string;
  rates: Map<number>;
}

export class Converter {
  api: string = 'https://exchangeratesapi.io/api/';
  heading: string = 'Welcome to the Currency Converter';
  http: HttpClient;
  value: number = 1;
  exchange: Exchange;
  currencies: string[] = Object.keys(Currency).filter(key => !isNaN(Number(Currency[key])));
  // previousValue: string = this.fullName;

  constructor(@lazy(HttpClient) private getHttpClient: () => HttpClient) {
    console.log(this.currencies);
  }

  @computedFrom('firstName', 'lastName')
  get fullName(): string {
    return `${this.value} ${this.exchange.rates['PLN']}`;
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
