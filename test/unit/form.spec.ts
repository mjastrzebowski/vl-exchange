import './setup';
import { HttpClient } from 'aurelia-fetch-client';
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

describe('the Form module', () => {
  it('amountTo is computed correctly', () => {
    var amountFrom = 2;
    var rateNumber = 3;
    var result = 6;

    var form = new Form();
    form.amountFrom = amountFrom;
    form.rateNumber = rateNumber;
    
    expect(form.amountTo).toBe(result);
  });

  it('amountTo cannot be set manually', () => {
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
