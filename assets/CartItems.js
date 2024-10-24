import BhaSelectors from "./Selectors.js";
import { PUB_SUB_EVENTS } from './Constants.js';
import { subscribe } from "./Pubsub.js";

export class CartItems extends HTMLElement {
  cartSelectors;
  elements = {
    cartStatus: document.getElementById('shopping-cart-line-item-status'),
    lineItemStatusElement: document.getElementById('shopping-cart-line-item-status'),
    mainCartFooter: document.getElementById('main-cart-footer'),
    mainCartItems: document.getElementById('main-cart-items'),
  };

  constructor() {
    super();

    if (BhaUtils) {
      this.cartSelectors = BhaSelectors.selectors.cart;
    }
    
    this.lineItemStatusElement = this.elements.lineItemStatusElement;
      
    const debouncedOnChange = debounce((event) => {
      this.onChange(event);
    }, ON_CHANGE_DEBOUNCE_TIMER);

    this.addEventListener('change', debouncedOnChange.bind(this));
  }

  cartUpdateUnsubscriber = undefined;

  connectedCallback() {
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

  getCartItemElement() {
    return document.getElementById(`CartItem-${line}`);
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

  onChange(event) {
    const line = event.target.dataset.index;
    const quantity = event.target.value;
    const name = document.activeElement.getAttribute('name'); 
    const variantId = event.target.dataset.quantityVariantId;

    this.updateQuantity(line, quantity, name, variantId);
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
        id: 'bh-cart__cart-live-region-text',
        section: 'cart-live-region-text',
        selector: '.shopify-section',
      }
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

    fetch(`${routes.cart_change_url}`, { ...fetchConfig(), ...{ body } })
      .then((response) => {
        const responseText = response.text();

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

        publish(PUB_SUB_EVENTS.cartUpdate, { source: 'cart-items', cartData: parsedState, variantId: variantId });
      })
      .catch(() => {
        this.querySelectorAll('.loading__spinner').forEach((overlay) => overlay.classList.add('hidden'));
        const alertCartErrors = document.getElementById('cart-errors');
        // Remove the 'hidden' class
        alertCartErrors.classList.remove('hidden');
        // Select error text
        const cartErrors = alertCartErrors.querySelector('.cart-errors__text');
        // Set error text
        cartErrors.textContent = window.cartStrings.error;
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
  
    setTimeout(() => {
      cartStatus.setAttribute('aria-hidden', true);
    }, 1000);
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
  }

  enableLoading(line) {
    const mainCartItems = this.elements.mainCartItems;
    mainCartItems.classList.add('cart__items--disabled');

    const cartItemElements = this.querySelectorAll(`#CartItem-${line} .loading__spinner`);
    [...cartItemElements].forEach((overlay) => overlay.classList.remove('hidden'));

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

customElements.define('bha-cart-items', CartItems);