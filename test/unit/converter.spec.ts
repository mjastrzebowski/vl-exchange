import './setup';
import { HttpClient } from 'aurelia-fetch-client';

import { Currency } from '../../src/converter';
import { ConverterForm } from '../../src/form';

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

xdescribe('Converter module', () => {
  it('amountTo is computed correctly', (done) => {
    var itemStubs = [1];
    var itemFake = [2];

    var getHttp = () => {
      var http = new HttpStub();
      http.itemStub = itemStubs;
      return http;
    };

  //   var sut = new Form();

  //   // sut.activate().then(() => {
  //   //   expect(sut.users).toBe(itemStubs);
  //   //   expect(sut.users).not.toBe(itemFake);
  //   //   done();
  //   // });
  // });
});
