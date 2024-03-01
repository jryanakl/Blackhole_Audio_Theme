class QuantitySelector {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.minusButton = this.container.querySelector('.bh-minus-button');
    this.quantityInput = this.container.querySelector('.bh-quantity-input');
    this.plusButton = this.container.querySelector('.bh-plus-button');

    if (this.quantityInput && this.plusButton && this.minusButton) {
      this.plusButton.addEventListener('click', this.increment.bind(this));
      this.minusButton.addEventListener('click', this.decrement.bind(this));
    }
  }

  increment() {
    console.log(`increment`);
    this.quantityInput.value = parseInt(this.quantityInput.value) + 1;
  }

  decrement() {
    console.log(`decrement`);
    const currentValue = parseInt(this.quantityInput.value);
  
    if (currentValue > 1) {
      this.quantityInput.value = currentValue - 1;
    }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  new QuantitySelector('bh-quantity-selector');
});
