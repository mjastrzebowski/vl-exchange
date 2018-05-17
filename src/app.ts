import {Aurelia} from 'aurelia-framework';
import {Router, RouterConfiguration} from 'aurelia-router';

export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Currency Converter App';
    config.map([{
      route: ['', 'converter'],
      name: 'converter',
      moduleId: './converter',
      nav: true,
      title: 'Converter'
    }]);

    this.router = router;
  }
}
