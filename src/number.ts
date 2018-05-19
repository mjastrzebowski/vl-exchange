export class NumberValueConverter {
  toView(value: string, digits: number): string {
    return parseFloat(value).toFixed(digits);
  }
}
