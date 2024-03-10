import { utils } from './utils.js';
utils.logJsPage('Cart');

const getElement = {
  cartItemLine: (line) => {
    return document.getElementById(`CartItem-${line}`);
  },
};

const elements = {
  cartStatus: document.getElementById('cart-live-region-text'),
  lineItemStatusElement: document.getElementById('shopping-cart-line-item-status'),
  mainCartFooter: document.getElementById('main-cart-footer'),
  mainCartItems: document.getElementById('main-cart-items'),
};

class CartItems extends HTMLElement {
  constructor() {
    super();

    this.lineItemStatusElement = elements.lineItemStatusElement;
      
    const debouncedOnChange = debounce((event) => {
      this.onChange(event);
    }, ON_CHANGE_DEBOUNCE_TIMER);

    this.addEventListener('change', debouncedOnChange.bind(this));

    // @test
    utils.logClass('CartItems');
    utils.logMethod('constructor', {
      $ctrl: this,
    });
  }

  cartUpdateUnsubscriber = undefined;

  connectedCallback() {
    // @test
    utils.logMethod('connectedCallback');

    this.cartUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.cartUpdate, (event) => {
      if (event.source === 'cart-items') {
        return;
      }
      this.onCartUpdate();
    });
  }

  disconnectedCallback() {
    if (this.cartUpdateUnsubscriber) {
      this.cartUpdateUnsubscriber();
    }
  }

  onChange(event) {
    const line = event.target.dataset.index;
    const quantity = event.target.value;
    const name = document.activeElement.getAttribute('name'); 
    const variantId = event.target.dataset.quantityVariantId;

    this.updateQuantity(line, quantity, name, variantId);
  }

  onCartUpdate() {
    const isMainCartItems = this.tagName === 'MAIN-CART-ITEMS';

    if (isMainCartItems) {
      fetch(`${routes.cart_url}?section_id=main-cart-items`)
        .then((response) => response.text())
        .then((responseText) => {
          const html = new DOMParser().parseFromString(responseText, 'text/html');
          const sourceQty = html.querySelector('cart-items');
          this.innerHTML = sourceQty.innerHTML;
        })
        .catch((e) => {
          console.error(`Error: fetch()`, e);
        });
    } {
      console.error(`Error: tagName is NOT 'MAIN-CART-ITEMS'`);
    }
  }

  getSectionsToRender() {
    return [
      {
        id: 'main-cart-items',
        section: document.getElementById('main-cart-items').dataset.id,
        selector: '.js-contents',
      },
      {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '.shopify-section',
      },
      {
        id: 'cart-live-region-text',
        section: 'cart-live-region-text',
        selector: '.shopify-section',
      },
      {
        id: 'main-cart-footer',
        section: document.getElementById('main-cart-footer').dataset.id,
        selector: '.js-contents',
      },
    ];
  }

  updateQuantity(line, quantity, name, variantId) {
    this.enableLoading(line);

    const body = JSON.stringify({
      line,
      quantity,
      sections: this.getSectionsToRender().map((section) => section.section),
      sections_url: window.location.pathname,
    });

    // @test
    utils.logMethod('updateQuantity', {
      body: body,
      line: line,
      name: name,
      quantity: quantity,
      variantId: variantId,
    });

    fetch(`${routes.cart_change_url}`, { ...fetchConfig(), ...{ body } })
      .then((response) => {
        const responseText = response.text();

        // @test
        utils.logMethod('updateQuantity.then()', {
          response: response,
          responseText: responseText
        });

        return responseText;
      })
      .then((state) => {
        const parsedState = JSON.parse(state);
        const quantityElement = document.getElementById(`Quantity-${line}`);
        const items = document.querySelectorAll('.cart-item');
        let message = '';

        if (parsedState.errors) {
          quantityElement.value = quantityElement.getAttribute('value');
          this.updateLiveRegions(line, parsedState.errors);
          return;
        }

        this.classList.toggle('is-empty', parsedState.item_count === 0);

        const cartFooter = elements.mainCartFooter;

        if (cartFooter) cartFooter.classList.toggle('is-empty', parsedState.item_count === 0);

        this.getSectionsToRender().forEach((section) => {
          const elementToReplace = document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);
          elementToReplace.innerHTML = this.getSectionInnerHTML(
            parsedState.sections[section.section],
            section.selector
          );
        });

        const updatedValue = parsedState.items[line - 1] ? parsedState.items[line - 1].quantity : undefined;
        
  
        if (items.length === parsedState.items.length && updatedValue !== parseInt(quantityElement.value)) {
          if (typeof updatedValue === 'undefined') {
            message = window.cartStrings.error;
          } else {
            message = window.cartStrings.quantityError.replace('[quantity]', updatedValue);
          }
        }

        this.updateLiveRegions(line, message);

        const lineItem = document.getElementById(`CartItem-${line}`);

        if (lineItem && lineItem.querySelector(`[name="${name}"]`)) {
          lineItem.querySelector(`[name="${name}"]`).focus();
        } else {
          console.error('if (lineItem)');
        }

        // @test
        utils.logMethod('updateQuantity.then().then()', {
          lineItem: lineItem,
        });

        publish(PUB_SUB_EVENTS.cartUpdate, { source: 'cart-items', cartData: parsedState, variantId: variantId });
      })
      .catch(() => {
        this.querySelectorAll('.loading__spinner').forEach((overlay) => overlay.classList.add('hidden'));
        const errors = document.getElementById('cart-errors');
        errors.textContent = window.cartStrings.error;
      })
      .finally(() => {
        this.disableLoading(line);
      });
  }

  updateLiveRegions(line, message) {
    const lineItemError =document.getElementById(`Line-item-error-${line}`);

    if (lineItemError) {
      lineItemError.querySelector('.cart-item__error-text').innerHTML = message;
    }

    this.lineItemStatusElement.setAttribute('aria-hidden', true);

    const cartStatus = document.getElementById('cart-live-region-text');
    cartStatus.setAttribute('aria-hidden', false);

    // @test
    utils.logMethod('updateLiveRegions', {
      args: {
        line: line,
        message: message,
      },
      cartStatus: cartStatus,
      lineItemError: lineItemError,
    });
  
    setTimeout(() => {
      cartStatus.setAttribute('aria-hidden', true);
    }, 1000);
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
  }

  enableLoading(line) {
    const mainCartItems = elements.mainCartItems;
    mainCartItems.classList.add('cart__items--disabled');

    const cartItemElements = this.querySelectorAll(`#CartItem-${line} .loading__spinner`);
    [...cartItemElements].forEach((overlay) => overlay.classList.remove('hidden'));

    // @test
    utils.logMethod('enableLoading', {
      cartItemElements: cartItemElements
    });

    document.activeElement.blur();
    this.lineItemStatusElement.setAttribute('aria-hidden', false);
  }

  disableLoading(line) {
    const mainCartItems = document.getElementById('main-cart-items');
    mainCartItems.classList.remove('cart__items--disabled');

    const cartItemElements = this.querySelectorAll(`#CartItem-${line} .loading__spinner`);

    cartItemElements.forEach((overlay) => overlay.classList.add('hidden'));
  }
}

class CartNote extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('input', debounce((event) => {
        const body = JSON.stringify({ note: event.target.value });
        fetch(`${routes.cart_update_url}`, { ...fetchConfig(), ...{ body } });
      }, ON_CHANGE_DEBOUNCE_TIMER)
    );

    // @test
    utils.logClass('CartNote');
    utils.logMethod('constructor', {
      $ctrl: this,
    });
  }
}

class CartRemoveButton extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('click', (event) => {
      event.preventDefault();

      const cartItems = this.closest('cart-items');
      cartItems.updateQuantity(this.dataset.index, 0);
    });

    // @test
    utils.logClass('CartRemoveButton');
    utils.logMethod('constructor', {
      $ctrl: this,
    });
  }
}

/** 
 * Custom Cart Elements 
 * 
 * @description: 
 * -Define custom elements with specific behaviors
 * -Component-based: By extending HTML elements, you create component-based architectures
 * -Encapsulation: Each component encapsulates its own behavior and presentation logic
 * -Framework integration: Many JavaScript frameworks and libraries support custom elements
*/
customElements.define('cart-items', CartItems);
customElements.define('cart-remove-button', CartRemoveButton);

if (!customElements.get('cart-note')) {
  customElements.define('cart-note', CartNote);
}
