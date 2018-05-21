import {browser, element, by, By, $, $$, ExpectedConditions} from 'aurelia-protractor-plugin/protractor';

export class PageObject_Form {
  getHeader() {
    return element(by.tagName('h2')).getText();
  }

  setCurrencyFrom(value) {
    let currencyFrom = element(by.valueBind('currencyFrom'));
    return currencyFrom.sendKeys(value);
  }

  setAmountFrom(value) {
    let amountFrom = element(by.valueBind('amountFrom'));
    return amountFrom.clear().then(() => amountFrom.sendKeys(value));
  }

  getRate() {
    return element(by.css('.rate-value')).getText();
  }

  pressSwapButton() {
    return element(by.css('.btn-swap')).click();
  }
}
