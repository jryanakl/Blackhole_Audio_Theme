import BhaSelectors from './Selectors.js';

async function loadData() {
  const pageId = 'cart';
  app.store.cart = await BhaSelectors.getPageJsonData(pageId);
}

async function initalizePageData() {
  if (app.store.cart == null) {
    await loadData();
  }
  return null;
}

export class CartPage {
  constructor() {
    initalizePageData();
  }
};
