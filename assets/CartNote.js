import {ON_CHANGE_DEBOUNCE_TIMER} from './Constants.js';
import {debounce, fetchConfig} from './Utils.js';

export class CartNote extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('input', debounce((event) => {
        const body = JSON.stringify({ note: event.target.value });
        fetch(`${routes.cart_update_url}`, { ...fetchConfig(), ...{ body } });
      }, ON_CHANGE_DEBOUNCE_TIMER)
    );
  }
}