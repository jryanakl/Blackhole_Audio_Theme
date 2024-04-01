export class QuantityFieldset extends HTMLElement {
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
  }

  decrement() {
    const currentValue = parseInt(this.formElements.quantityInput.value);
  
    if (currentValue > 1) {
      this.formElements.quantityInput.value = currentValue - 1;
    }
  }

  increment() {
    const currentValue = parseInt(this.formElements.quantityInput.value);
    this.formElements.quantityInput.value = currentValue + 1;
  }
}

customElements.define('bh-quantity-input-fieldset', QuantityFieldset);
