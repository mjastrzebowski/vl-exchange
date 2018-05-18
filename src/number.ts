// we can use numeral for nice looking formats:
// import numeral from 'numeral';

export class NumberValueConverter {
  toView(value: string, digits: number) {
    return parseFloat(value).toFixed(digits);
  }
}
