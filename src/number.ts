export class NumberValueConverter {
  toView(value: string, digits: number): string {
    return parseFloat(value).toFixed(digits);
  }
}

// export const formatNumber = (value: number | string, digits: number): number => {
//   return numeral(value).format('($0,0.00)')
// }
