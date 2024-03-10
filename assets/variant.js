import { utils, product } from './utils.js';
utils.logJsPage('Variant');

class VariantImageUpdater {
  constructor(selector) {
    this.container = document.getElementById(selector);
    if (!this.container) return;

    this.variantSelect = this.container.querySelector('.bh-product__variant select');
    this.productImage = this.container.querySelector('.bh-product__img img');
    this.productPrice = this.container.querySelector('.bh-product__price-value');
    
    if (this.variantSelect && this.productImage) {
      this.variantSelect.addEventListener('change', this.updateProductImage.bind(this));
    }

    // @test
    utils.logClass('VariantImageUpdater');
    utils.logMethod('constructor', {
      $ctrl: this,
    });
  }

  formatAsCurrency(amount) {
    // Convert amount to a number if it's not already
    amount = Number(amount) / 100;

    // Check if the amount is a valid number
    if (isNaN(amount)) {
      console.error('Invalid amount:', amount);
      return 'Invalid amount';
    }

    // Use toLocaleString() to format the number as currency
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }
  
  updateProductImage() {
    var selectedOption = this.variantSelect.value;

    // @test
    var variantElement = this.variantSelect;
    var variants = product.getVariants();

    // @test
    utils.logMethod('updateProductImage', {
      variantElement: variantElement,
      variants: variants
    });
    
    variants.forEach(variant => {
      const variantId = `${variant?.id}`;
      const variantImageSrc = variant?.featured_image?.src;
      const variantPrice = this.formatAsCurrency(variant?.price);
      // const variantPrice = this.variantSelect?.querySelector('[selected]')?.dataset?.price;

      if (variantId && variantImageSrc && (selectedOption === variantId)) {
        // const productPrice = this.container.querySelector('.bh-product__price-value');
        this.productImage.src = variantImageSrc;
        this.productPrice.textContent = variantPrice;

        // @test
        utils.logMethod('variants.forEach', {
          variant: variant
        });
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const selector = 'bh-product';
  new VariantImageUpdater(selector);
});