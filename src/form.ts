import { HttpClient } from 'aurelia-fetch-client';
import { computedFrom } from 'aurelia-framework';
import { asyncBindable } from 'aurelia-async-bindable-bluebird';
import { Currency, CurrencyValueConverter } from './converter';

export class Converter {
  heading: string = 'Currency Converter';
  currencies: string[] = Object.keys(Currency).filter(key => !!Currency[key] || !isNaN(Number(Currency[key])));

  amountFrom: number;
  currencyFrom: Currency = Currency.PLN;
  currencyTo: Currency = Currency.EUR;

  @asyncBindable()
  @computedFrom('amountFrom', 'currencyFrom', 'currencyTo')
  get amountTo(): Promise<number | null> {
    const converter = new CurrencyValueConverter(() => new HttpClient);
    return converter.toView(this.amountFrom, this.currencyFrom, this.currencyTo);
  }
}
