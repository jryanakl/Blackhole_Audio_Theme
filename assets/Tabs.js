/**
 * BhaTabs
 * 
 * import { Tabs } from 'flowbite';
 * @link: https://flowbite.com/docs/components/tabs/
 */

export class BhaTabs {
  tabsElements = {
    faq: [
      {
        id: "bh-faq-orders",
        triggerEl: document.querySelector("#bh-tab-faq-orders"),
        targetEl: document.querySelector("#bh-content-faq-orders")
      },
      {
        id: "bh-faq-policies",
        triggerEl: document.querySelector("#bh-tab-faq-policies"),
        targetEl: document.querySelector("#bh-content-faq-policies")
      },
    ],
    product: [
      {
        id: "bh-product-features",
        triggerEl: document.querySelector("#bh-tab-product-features"),
        targetEl: document.querySelector("#bh-content-product-features"),
      },
      {
        id: "bh-product-overview",
        triggerEl: document.querySelector("#bh-tab-product-overview"),
        targetEl: document.querySelector("#bh-content-product-overview"),
      },
      {
        id: "bh-product-specifications",
        triggerEl: document.querySelector("#bh-tab-product-specifications"),
        targetEl: document.querySelector("#bh-content-product-specifications"),
      },
      {
        id: "bh-product-design",
        triggerEl: document.querySelector("#bh-tab-product-design"),
        targetEl: document.querySelector("#bh-content-product-design"),
      },
      {
        id: "bh-product-performance",
        triggerEl: document.querySelector("#bh-tab-product-performance"),
        targetEl: document.querySelector("#bh-content-product-performance"),
      },
    ]
  };

  tabsDefaultOptions = {
    activeClasses: "text-bold text-gray-900 hover:text-gray-900 bg-gray-100 border-gray-900",
    inactiveClasses: "text-gray-500 hover:text-gray-600 border-gray-100 hover:border-gray-300",
  };
  
  tabsOptions = {
    faq: {
      defaultTabId: "bh-faq-orders",
      ...this.tabsDefaultOptions,
    },
    product: {
      defaultTabId: "bh-product-design",
      ...this.tabsDefaultOptions,
    }
  };

  tabsInstanceOptions = {
    faq: {
      id: "bh-faq-tabs",
      override: true
    },
    product: {
      id: "bh-product-tabs",
      override: true
    }
  };

  constructor(key) {
    if (Tabs) {
      return new Tabs(this.tabsElements[key], this.tabsElements[key], this.tabsOptions[key], this.tabsInstanceOptions[key]);
    } else {
      console.error(`Tabs is undefined`);
    }
  }
}
