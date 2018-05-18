import { Currency } from './converter';

export class Converter {
  heading: string = 'Welcome to the Currency Converter';
  currencies: string[] = Object.keys(Currency).filter(key => !!Currency[key] || !isNaN(Number(Currency[key])));

  amountFrom: number = 1;
  currencyFrom: Currency = Currency.PLN;
  currencyTo: Currency = Currency.RON;
}
