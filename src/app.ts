import { Aurelia } from 'aurelia-framework';
import { Router, RouterConfiguration } from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Currency Converter App';
    config.map([{
      route: ['', 'form'],
      name: 'form',
      moduleId: './form',
      nav: true,
      title: 'Converter'
    }]);

    this.router = router;
  }
}
