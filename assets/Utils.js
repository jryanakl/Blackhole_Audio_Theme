import BhaSelectors from './Selectors.js';

export function debounce(fn, wait) {
  let t;

  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

export function fetchConfig(type = 'json') {
  return {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: `application/${type}` },
  };
}

export function formatAsCurrency(amount) {
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

export function getPageDataById(pageId) {
  if (app.store[pageId] === null) {
    app.store[pageId] = loadPageData(pageId);

    return app.store[pageId];
  }

  return null;
}

function getPageJsonData(pageId, jsonId) {
  const pageElement = BhaSelectors.getPageElement(pageId);
  const pageSectionId = BhaSelectors.getPageSectionId(pageElement);
  let pageJsonElement = null;
  let parsedData;

  if (pageElement && pageSectionId) {
    const selector = `${jsonId}${pageSectionId}`;
    pageJsonElement = document.getElementById(`${selector}`);
  } else {
    const errMsg = `
      getPageJsonData(): bhPageElement with pageId: ${pageId} and jsonId: ${jsonId} is not found.
    `;
    console.error(errMsg , {
      pageElement: pageElement,
      pageSectionId: pageSectionId
    });
  }

  if (pageJsonElement && pageJsonElement.innerHTML) {
    let jsonData = pageJsonElement.innerHTML;

    try {
      parsedData = JSON.parse(jsonData);
      return parsedData;
    } catch (e) {
      console.error("Error parsing JSON!", e);
      return null;
    }
  }
}

function loadPageData(pageId) {
  let pageData;

  if (pageId === 'product') {
    const product = getPageJsonData(BhaSelectors.product.$container, BhaSelectors.product.$json.product);
    const media = getPageJsonData(BhaSelectors.product.$container, BhaSelectors.product.$json.media);
    const ui = getPageJsonData(BhaSelectors.product.$container, BhaSelectors.product.$json.ui);
    const variants = product.variants;
 
    pageData = {
      product: product,
      media: media,
      ui: ui,
      variants: variants
    };
  } else if (pageId === 'cart') {
    pageData = {
      cart: getPageJsonData(BhaSelectors.cart.$container, BhaSelectors.cart.$json.cart)
    };
  }

  return pageData;
}
