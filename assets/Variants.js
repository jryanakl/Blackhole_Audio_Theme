import BhaSelectors from './Selectors.js';

export class BhaVariants {
  current;
  data;
  hasVariants = false;
  imgUrl;
  inputElement;
  productFormElement;
  selectElement;
  variantsArray;

  constructor(variantsArray) {
    this.variantsArray = variantsArray;
    this.productFormElement = document.querySelector(BhaSelectors.product.form);
    
    if (this.productFormElement) {
      this.inputElement = this.productFormElement.querySelector(BhaSelectors.variants.input);
      this.selectElement = this.productFormElement.querySelector(BhaSelectors.variants.select);

      if (this.selectElement) {
        this.data = this.getVariantData();
        this.hasVariants = true;
      }
    } else {
      console.error('no productFormElement found!');
    }

    if (this.hasVariants) {
      this.imgUrl = this.getVariantImgUrl();
    }
  }

  getVariantCurrent(variantsArray)  {
    const variantSelectElement = document.querySelector(BhaSelectors.variants.select);
    const selectedVariantValue = variantSelectElement.value;
  
    const found = variantsArray.find(variant => {
      const varintIdNumber = parseInt(selectedVariantValue);
      return variant.id === varintIdNumber;
    });

    this.current = found;
    this.imgUrl = this.getVariantImgUrl();
  
    return found;
  }
  
  getVariantData() {
    const variantData = this.data || JSON.parse(document.querySelector('[type="application/json"]').textContent);

    return variantData;
  }

  getVariantImgUrl() {
    const selectedVariantValue = this.selectElement.options[this.selectElement.selectedIndex];
    const imgUrl = selectedVariantValue.getAttribute('data-image');
  
    return imgUrl;
  }

  updateInput() {
    this.inputElement.value = this.current.id;
    this.inputElement.dispatchEvent(new Event('change', {bubbles: true}));
  }

  updateMasterId() {
    if (this.hasVariants) {
      this.current = this.getVariantCurrent(this.variantsArray);
    }
  }
}
