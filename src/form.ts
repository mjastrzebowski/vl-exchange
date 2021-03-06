import { HttpClient } from 'aurelia-fetch-client';
import { computedFrom } from 'aurelia-framework';
import { asyncBindable } from 'aurelia-async-bindable-bluebird';
import { Currency, CurrencyValueConverter } from './converter';

interface Rate {
  currency: Currency;
  amount: number;
}

export class ConverterForm {
  digits: number = 4;
  heading: string = 'Currency Converter';
  currencies: string[] = Object.keys(Currency).filter(key => !!Currency[key] || !isNaN(Number(Currency[key])));
  // currencies: string[] = Object.keys(Currency).filter(key => isNaN(Number(key)));

  rateNumber: number = 1;
  amountFrom: number = 1;
  currencyFrom: Currency = Currency.PLN;
  currencyTo: Currency = Currency.EUR;

  converter = new CurrencyValueConverter(() => new HttpClient);

  @asyncBindable()
  @computedFrom('currencyFrom', 'currencyTo')
  get rate(): Promise<number | null> {
    return this.converter
      .getRates(this.currencyFrom, this.currencyTo)
      .then((rate: number) => {
        this.rateNumber = rate;
        return rate;
      });
  }

  @computedFrom('amountFrom', 'rateNumber')
  get amountTo(): number {
    return this.amountFrom * this.rateNumber;
  }

  swap() {
    const currencyTmp = this.currencyFrom;
    this.currencyFrom = this.currencyTo;
    this.currencyTo = currencyTmp;

    this.amountFrom = parseFloat(this.amountTo.toFixed(this.digits));
  }
}
