import { HttpClient } from 'aurelia-fetch-client';
import { computedFrom } from 'aurelia-framework';
import { Currency, CurrencyValueConverter } from './converter';

export class Converter {
  heading: string = 'Welcome to the Currency Converter';
  currencies: string[] = Object.keys(Currency).filter(key => !!Currency[key] || !isNaN(Number(Currency[key])));

  amountFrom: number = 1;
  currencyFrom: Currency = Currency.PLN;
  currencyTo: Currency = Currency.RON;

  // another possible way to provide the conversion:
  //
  // @computedFrom('amountFrom', 'currencyFrom', 'currencyTo')
  // get amountTo(): Promise<number> {
  //   const converter = new CurrencyValueConverter(() => new HttpClient);
  //   return converter.toView(this.amountFrom, this.currencyFrom, this.currencyTo);
  // }
}
