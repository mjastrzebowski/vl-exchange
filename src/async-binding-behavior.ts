// Source: https://bl.ocks.org/charlespockert/452851c45144668d37df556f5df9c04a

import { bindingMode } from 'aurelia-binding';

function waitForPromise(newValue) {
  // check if thenable
  if ('then' in newValue) {
    newValue.then((result) => {
      this.promisedMethod(result);
    });
  }
  else this.promisedMethod(newValue);
}

export class AsyncBindingBehavior {
  bind(binding, source) {
    let methodToPromise = 'updateTarget';  // one-way bindings or interpolation bindings
    if (binding.callSource) {
      methodToPromise = 'callSource';  // listener and call bindings
    } else if (binding.updateSource && binding.mode === bindingMode.twoWay) {
      methodToPromise = 'updateSource';  // two-way bindings
    }

    binding.promisedMethod = binding[methodToPromise];
    binding.promisedMethod.originalName = methodToPromise;

    // Wait for the promise to resolve
    binding[methodToPromise] = waitForPromise;
  }

  unbind(binding, source) {
    // restore the state of the binding.
    let methodToRestore = binding.promisedMethod.originalName;
    binding[methodToRestore] = binding.promisedMethod;
    binding.promisedMethod = null;
  }
}
