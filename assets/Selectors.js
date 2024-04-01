const cart = {
  $container: 'bh-cart',
  $json: {
    cart: 'bh-json__cart__'
  },
  bha_cart_items: {
    $container: 'bh-cart__items'
  },
};

const price = {
  $container: 'bh-price',
  $test:'.bh-price-test',
  badges: {
    onSale: '.bh-price--on-sale',
    soldOut: '.bh-price--sold-out',
    unavailable: 'bh-price--unavailable'
  },
  data: {
    $container: '[data-price]',
    available: '[data-price-available]',
    compareAt: '[data-price-compare-at]',
    regular: '[data-price-regular]',
    sale: '[data-price-sale]',
    test: '[data-price-test]',
    unit: '[data-price-unit]'
  },
  elements: {
    regular: {
      $container: '.bh-price__regular',
      price: '.bh-price__regular__price'
    },
    sale: {
      $container: '.bh-price__sale',
      price: '.bh-price__sale__price',
      compareAt: '.bh-price__sale__price--compare-at',
    },
    unit: {
      $container: '.bh-price__unit',
      price: '.bh-price__unit__price'
    },
  }
};

const product = {
  $container: 'bh-product',
  $json: {
    product: 'bh-json__product__',
    media: 'bh-json__product-media__',
    ui: 'bh-json__product-ui__'
  },
  carousel: '#bh-carousel__product',
  form: 'form[data-product-form]',
  mediaImg: '.bh-main-product-media img',
  soldOut: 'bh-product__sold-out',
};

const quantity = {
  input: '.bh-quantity-input-fieldset__quantity-input'
};

const variants = {
  input: 'input[name="id"]',
  img: '.bh-product__variant__img',
  select: '.bh-product__variant__select',
  soldOut: '.bh-product__variant__sold-out'
};

const BhaSelectors = {
  cart: cart,
  price: price,
  product: product,
  quantity: quantity,
  variants: variants,
  getPageElement: getPageElement,
  getPageSectionId: getPageSectionId,
}

export default BhaSelectors;

function getPageElement(pageId) {
  const pageElement = document.getElementById(pageId);
  return pageElement;
}

function getPageSectionId(pageElement) {
  let pageSectionId;

  if (pageElement && pageElement.dataset) {
    pageSectionId = pageElement.dataset.section;
    return pageSectionId;
  } else {
    pageSectionId = null;
    console.error(`getPageSectionId(): dataset.section does not exist for pageElement: ${pageElement}`);
  }

  return pageSectionId;
}