import {PageObject_Form} from './form.po';
import {PageObject_Skeleton} from './skeleton.po';
import {browser, element, by, By, $, $$, ExpectedConditions} from 'aurelia-protractor-plugin/protractor';

describe('aurelia skeleton app', function() {
  let po_form: PageObject_Form;
  let po_skeleton: PageObject_Skeleton;

  beforeEach( () => {
    po_skeleton = new PageObject_Skeleton();
    po_form = new PageObject_Form();

    browser.loadAndWaitForAureliaPage(`http://localhost:19876`);
  });

  it('should load the page and display the initial page title', () => {
    browser.sleep(200);
    expect(po_skeleton.getCurrentPageTitle()).toBe('Converter | Currency Converter');
  });

  it('should automatically write down the rate', () => {
    // po_form.amountFrom('Rob');
    // po_form.setLastname('Eisenberg');
    expect(po_form.getRate()).toContain(' = ');
  });

  it('should automatically write down the rate when currencyFrom changed', () => {
    po_form.setCurrencyFrom('USD');
    expect(po_form.getRate()).toContain(' USD = ');
  });
});
