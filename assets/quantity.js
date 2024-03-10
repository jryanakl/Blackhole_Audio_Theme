import { utils } from './utils.js';
utils.logJsPage('Quantity');

class BhQuantityFieldset extends HTMLElement {
  constructor() {
    super();

    this.bhQuantityElement = document.querySelector('bh-quantity-input-fieldset');
    
    if (!this.bhQuantityElement) return;

    this.formElements = {
      minusButton: this.bhQuantityElement.querySelector('.bh-quantity-input-fieldset__minus-button'),
      quantityInput: this.bhQuantityElement.querySelector('.bh-quantity-input-fieldset__quantity-input'),
      plusButton: this.bhQuantityElement.querySelector('.bh-quantity-input-fieldset__plus-button'),
    };

    if (this.formElements.minusButton && this.formElements.quantityInput && this.formElements.plusButton) {
      this.formElements.minusButton.addEventListener('click', this.decrement.bind(this));
      this.formElements.plusButton.addEventListener('click', this.increment.bind(this));
    }

    // @test
    utils.logClass('BhQuantityFieldset');
    utils.logMethod('constructor', {
      $ctrl: this,
    });
  }

  decrement() {
    const currentValue = parseInt(this.formElements.quantityInput.value);
  
    if (currentValue > 1) {
      this.formElements.quantityInput.value = currentValue - 1;
    }

    // @test
    utils.logMethod('increment', {
      $ctrl: this,
      currentValue: currentValue,
    });
  }

  increment() {
    const currentValue = parseInt(this.formElements.quantityInput.value);

    this.formElements.quantityInput.value = currentValue + 1;

    // @test
    utils.logMethod('increment', {
      $ctrl: this,
      currentValue: currentValue
    });
  }
}

/** 
 * Custom BhQuantityFieldset Element
 * 
 * @description: 
 * -Define custom elements with specific behaviors
 * -Component-based: By extending HTML elements, you create component-based architectures
 * -Encapsulation: Each component encapsulates its own behavior and presentation logic
 * -Framework integration: Many JavaScript frameworks and libraries support custom elements
*/
customElements.define('bh-quantity-input-fieldset', BhQuantityFieldset);
