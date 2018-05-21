import { browser } from 'aurelia-protractor-plugin/protractor';

export class PageObject_Skeleton {
  constructor() {}

  getCurrentPageTitle() {
    return browser.getTitle();
  }
}
