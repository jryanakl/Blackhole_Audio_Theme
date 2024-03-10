const colors = {
  darkgreen: 'color: darkgreen',
  lightgreen: 'color: lightgreen',
  green: 'color: green;',
};

const sizes = {
  sm: 'font-size: 12px;',
  md: 'font-size: 14px;',
  lg: 'font-size: 16px;'
};

export const routes = {
  cart_add_url: '/cart/add',
  cart_change_url: '/cart/change',
  cart_clear_url: '/cart/clear',
  cart_update_url: '/cart/update',
  cart_url: '/cart',
};

export const product = {
  name: '',
  product: {},
  variants: {},
  getProduct() {
    return this.product;
  },
  getVariants() {
    return this.variants;
  },
  setProduct(product) {
    this.product = product;
  },
  setVariants(variants) {
    this.variants = variants;
  },
};

export const utils =  {
  logClass: (className) => {
    console.log(`%c${className}`, `${sizes.md} ${colors.green}`);
  },
  logJsPage: (fileName) => {
    console.log(`%c--${fileName}JS--`, `${sizes.lg} ${colors.darkgreen}`)
  },
  logLiquidPage: (fileName) => {
    console.log(`%c${fileName}Liquid`, `${sizes.lg} ${colors.darkgreen}`)
  },
  logMethod: (methodName, data) => {
    console.log(`%c${methodName}`, `${sizes.lg} ${colors.lightgreen}`);

    if (data) {
      console.log(data);
    }
  }
};
