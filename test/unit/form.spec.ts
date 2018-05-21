import './setup';
import { HttpClient } from 'aurelia-fetch-client';

import { Currency } from '../../src/converter';
import { Form } from '../../src/form';

class HttpStub extends HttpClient {
  url;
  itemStub;
  
  fetch(url): any {
    var response = this.itemStub;
    this.url = url;
    return new Promise((resolve) => {
      resolve({ json: () => response });
    });
  }

  configure(config) {
    return this;
  }
}

describe('Form module', () => {
  describe('amountTo property', () => {
    it('is computed correctly', () => {
      var amountFrom = 2;
      var rateNumber = 3;
      var result = 6;

      var form = new Form();
      form.amountFrom = amountFrom;
      form.rateNumber = rateNumber;
      
      expect(form.amountTo).toBe(result);
    });

    it('cannot be set manually', () => {
      var amountTo = 2;

      var form = new Form();
      try {
        form.amountTo = amountTo;
      } catch (e) {
        expect(e).not.toBeNull();
      }
      expect(form.amountTo).not.toBe(amountTo);
    });
  });

  describe('swap() function', () => {
    it('currency is swaped', () => {
      var currencyFrom = Currency.PLN;
      var currencyTo = Currency.EUR;

      var form = new Form();
      form.currencyFrom = currencyFrom;
      form.currencyTo = currencyTo;
      form.swap();

      expect(form.currencyFrom).toBe(currencyTo);
      expect(form.currencyTo).toBe(currencyFrom);
    });

    it('amount is swaped', () => {
      var amountFrom = 2;
      var rateNumber = 3;
      var amountTo = 6;
      var expected = amountTo * rateNumber;

      var form = new Form();
      form.amountFrom = amountFrom;
      form.rateNumber = rateNumber;

      form.swap();

      expect(form.amountTo).toBe(expected);
    });
  });
});
