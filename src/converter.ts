import {computedFrom} from 'aurelia-framework';

export class Welcome {
  heading: string = 'Welcome to the Currency Converter';
  firstName: string = 'Michał';
  lastName: string = 'Jastrzębowski';
  previousValue: string = this.fullName;

  @computedFrom('firstName', 'lastName')
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  submit() {
    // this.previousValue = this.fullName;
    alert(`Welcome, ${this.fullName}!`);
  }

  canDeactivate(): boolean | undefined {
    if (this.fullName !== this.previousValue) {
      return confirm('Are you sure you want to leave?');
    }
  }
}

export class UpperValueConverter {
  toView(value: string): string {
    return value && value.toUpperCase();
  }
}
