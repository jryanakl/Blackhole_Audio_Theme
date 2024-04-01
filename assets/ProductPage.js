import { BhaCarousel } from './Carousel.js';
import { PUB_SUB_EVENTS } from './Constants.js';
import { BhaLightbox } from './Lightbox.js';
import BhaSelectors from './Selectors.js';
import { BhaTabs } from "./Tabs.js";
import { BhaVariants } from './Variants.js';
import { SHOP_URL } from './Constants.js';
import { publish } from './Pubsub.js';
import { formatAsCurrency, getPageDataById } from './Utils.js';

export class ProductPage {
  carouselContainerElement;
  data = {};
  imageElement;
  priceElement;
  priceElements;
  productElement;
  variants;
  variantSelected;

  constructor() {
    this.priceElement = document.getElementById(BhaSelectors.price.$container);
    this.productElement = document.getElementById(BhaSelectors.product.$container);

    if (!this.productElement && !this.priceElement) return;

    this.data = getPageDataById('product');
    
    if (BhaSelectors?.product) {
      this.carouselContainerElement = this.productElement.querySelector(BhaSelectors.product.carousel);
    }

    if (this.carouselContainerElement) {
      this.imageElement = this.carouselContainerElement.querySelector(BhaSelectors.product.mediaImg);
    } else {
      this.imageElement = this.productElement.querySelector(BhaSelectors.variants.img);
    }

    this.priceElements = {
      badges: {
        onSale: this.priceElement.querySelector(BhaSelectors.price.badges.onSale),
        soldOut: this.priceElement.querySelector(BhaSelectors.price.badges.soldOut),
      },
      container: this.priceElement,
      data: null,
      regular: {
        price: this.priceElement.querySelector(BhaSelectors.price.elements.regular.price),
      },
      sale: {
        compareAt: this.priceElement.querySelector(BhaSelectors.price.elements.sale.compareAt),
        price: this.priceElement.querySelector(BhaSelectors.price.elements.sale.price)
      },
    };

    this.variants = new BhaVariants(this.data.variants);

    if (this.variants.hasVariants && this.variants.selectElement) {
      this.variants.selectElement.addEventListener('change', this.onSelectChange.bind(this));
    }
  }

  onSelectChange(event) {
    if (this.data?.product) {
      this.dataset = this.productElement.dataset;
    } else {
      console.error(`onSelectChange: Element with ID "bh-json__product-" not found.`);
    }

    this.updateOptions();

    if (this.variants.hasVariants) {
      this.variants.updateMasterId();
      this.variantSelected = this.variants?.current;
    }
    
    if (!this.variants.current) {
      //@todo
    } else {
      this.renderProductInfo();
      this.updateImage();
      this.updatePrice();
      this.updateURL();

      //variants
      this.variants.updateInput();
    }
  }

  updateImage() {    
    const variantImgUrl = this.variants.getVariantImgUrl();
    this.imageElement.src = this.variants.hasVariants ? `${SHOP_URL}${variantImgUrl}` : SHOP_URL;
  }

  updateOptions() {
    this.options = Array.from(document.querySelectorAll('select, fieldset'), (element) => {
      if (element.tagName === 'SELECT') {
        return element.value;
      }
      if (element.tagName === 'FIELDSET') {
        return Array.from(element.querySelectorAll('input')).find((radio) => radio.checked)?.value;
      }
    });
  }

  updateURL() {
    if (!this.variants?.current || this.dataset.updateUrl === 'false') return;
    window.history.replaceState({}, '', `${this.dataset.url}?variant=${this.variants?.selectElement?.value}`);
  }

  updatePrice(evt) {
    const sectionId = this.dataset.section;
    const html = ''; //@todo what is this?
    const variantCurrent = this?.variantSelected;
    const isProductPrice = {
      onSale: variantCurrent?.compare_at_price > variantCurrent?.price,
      soldOut: !variantCurrent?.available,
      unavailable: !variantCurrent,
      unitPrice: variantCurrent?.unit_price
    };
    const priceValues = {
      price: variantCurrent?.price,
      variant: {
        salePrice: variantCurrent?.price,
        compareAt: variantCurrent?.compare_at_price,
        unitPrice: variantCurrent?.unit_price
      },
    };

    if (BhaSelectors?.price?.badges) {
      // Reset first by removing classes
      this.priceElements.container.classList.remove(BhaSelectors.price.badges.soldOut);
      this.priceElements.container.classList.remove(BhaSelectors.price.badges.onSale);
      this.priceElements.container.classList.remove(BhaSelectors.price.badges.unavailable);

      if (isProductPrice.unavailable) {
        this.priceElements.container.classList.add(BhaSelectors.price.badges.unavailable);
        this.priceElements.container.setAttribute('aria-hidden', 'true');
      }
  
      if (isProductPrice.soldOut) {
        this.priceElements.container.classList.add(BhaSelectors.price.badges.soldOut);
      }
  
      if (isProductPrice.onSale) {
        this.priceElements.sale.compareAt.innerHTML = formatAsCurrency(priceValues.variant.compareAt);
        this.priceElements.sale.price.innerHTML = formatAsCurrency(priceValues.variant.salePrice);
        
        // Add priceOnSale class
        this.priceElements.container.classList.add(BhaSelectors.price.badges.onSale);
      } else {
        // Regular
        this.priceElements.regular.price.innerHTML = priceValues.price;
      }
    }
  
    publish(PUB_SUB_EVENTS.variantChange, {
      data: {
        sectionId,
        html,
        variant: variantCurrent,
      },
    });
  }

  renderProductInfo() {
    const requestedVariantId = this?.variantSelected?.id;
    const sectionId = this?.dataset?.section;
    const url = `${this.dataset.url}?variant=${requestedVariantId}&section_id=${sectionId}`;

    fetch(url)
      .then((response) => response.text())
      .then((responseText) => {
        const html = new DOMParser().parseFromString(responseText, 'text/html');

        publish(PUB_SUB_EVENTS.variantChange, {
          data: {
            sectionId,
            html,
            variant: this?.variants?.current,
          },
        });
      
      })
      .catch((error) => console.error('error', error))
  }
}

document.addEventListener('DOMContentLoaded', function () {
  let bhCarousel;
  let bhLightbox;
  let bhTabs;
  let productPage = new ProductPage();

  // Carousel
  if (productPage?.data?.ui?.is_product_carousel) {
    if (productPage?.data?.variants?.length > 1) {
      // Filter out the non-selected variant's media
      const currentVariant = productPage.variants.getVariantCurrent(productPage.data.variants);
      const currentVariantMediaId = currentVariant.featured_media.id;

      const allVariantMediaIds = productPage.data.variants.map(variant => {
        const {featured_media} = variant;
        return featured_media.id;
      });
      const noShowVariants = productPage.data.variants.filter(variantItem => {
        const {featured_media} = variantItem;
        return featured_media.id !== currentVariantMediaId;
      });
      const noShowVarintMediaIds = noShowVariants.map(variant => {
        const {featured_media} = variant;
        return featured_media.id;
      });

      // Filter out media items with variant_ids in noShowVariantIds array
      const filteredMedia = productPage.data.product.media.filter((mediaItem) => {
        return !noShowVarintMediaIds.includes(mediaItem.id);
      });

      const variantFirstFilteredMedia = filteredMedia.reverse();

      bhCarousel = new BhaCarousel('product', variantFirstFilteredMedia);
    } else {
      bhCarousel = new BhaCarousel('product', productPage.data.product.media);
    }

    const prevElement = document.getElementById('data-carousel-prev');
    const nextElement = document.getElementById('data-carousel-next');

    prevElement.addEventListener('click', () => {
      bhCarousel.prev();
    });

    nextElement.addEventListener('click', () => {
      bhCarousel.next();
    });
  }

  // Lightbox
  if (productPage?.data?.ui?.is_product_lightbox) {
    const zoomButtonIconElement = document.getElementById('bh-button-zoom__button');
    bhLightbox = new BhaLightbox(productPage.data, zoomButtonIconElement);
  }

  // Tabs
  if (productPage?.data?.ui?.is_product_tabs) {
    bhTabs = new BhaTabs('product');
  }
});
