const Store = {
  cart: null,
  product: null,
  variants: null,
};

const proxyStore = new Proxy(Store, {
  set(target, property, value) {
    target[property] = value;

    switch (property) {
      case "product":
        window.dispatchEvent(new Event("appproductchange"));
        break;
      case "variant":
        window.dispatchEvent(new Event("appvariantchange"));
        break;
      case "cart":
        window.dispatchEvent(new Event("appcartchange"));
        break;
    }

    return true;
  }
});

export default proxyStore;
