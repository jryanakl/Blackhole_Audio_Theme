/**
 * BhaCarousel
 * 
 * import { Carousel } from 'flowbite';
 * @link: https://flowbite.com/docs/components/carousel/
 */
export class BhaCarousel {
  carouselElements = {
    banner: {
      item: 'bh-carousel__banner__item-',
      indicator: 'bh-carousel__banner__indicator-',
    },
    product: {
      item: 'bh-carousel__product__item-',
      indicator: 'bh-carousel__product__indicator-'
    }
  };

  // default carousel options
  defaultCarouselOptions = {
    defaultPosition: 0,
    interval: 3000,
    indicators: {
      activeClasses: 'bg-white dark:bg-gray-800',
      inactiveClasses: 'bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800',
      items: null,
    },
  }

  constructor(carouselKey, carouselMediaItems) {
    const carouselElement = document.getElementById(`bh-carousel__${carouselKey}`);
    const instanceOptions = {
      id: `bh-${carouselKey}-carousel`,
      override: true,
    };
    const options = {
      ...this.defaultCarouselOptions,
      indicators: {
        items: null
      },
    };
  
    let items = null;
    
    if (carouselKey && carouselMediaItems && carouselMediaItems.length) {
      
      // hasVariants
      if (this.productVariants && this.productVariants.length > 1) {
        const mediaItemsAndCurrentVariant = this.getVariantCurrentAndMediaItems(carouselMediaItems);
        items = this.getItems(carouselKey, carouselMediaItems);
        options.indicators.items = this.getIndicators(carouselKey, mediaItemsAndCurrentVariant);
        this.productData.media = carouselMediaItems;
      } else {
        items = this.getItems(carouselKey, carouselMediaItems);
        options.indicators.items = this.getIndicators(carouselKey, carouselMediaItems);
      }
      
    } else {
      console.error(
        `No carousel items or indicators exist for 
        carouselKey: ${carouselKey} or carouselMediaItems: ${carouselMediaItems}`);
    }
  
    if (Carousel) {
      return new Carousel(carouselElement, items, options, instanceOptions);
    } else {
      console.error(`Carousel is undefined`);
    }
  };

  getVariantCurrentAndMediaItems(items) {
    const variantCurrent = this._utils.getVariantCurrent();
    const variantCurrentId = variantCurrent.id;
    const variantCurrentMediaId = variantCurrent.featured_media.id;
    let mediaItems = [];
    
    // Array of IDs to include
    const idsToInclude = this._utils.pageData.variants.map((obj) => {
      return obj.featured_media.id;
    });

    // Filter out the object that does not have any of the specified IDs
    const nonVariantMediaItems = items.filter((obj) => {
      const included = idsToInclude.includes(obj.id);
      return included === false;
    });

    if (nonVariantMediaItems) {
      mediaItems = [
        variantCurrent,
        ...nonVariantMediaItems
      ];
    }

    return mediaItems;
  }
  
  getItems(carouselKey, items) {
    const carouselItemId = `bh-carousel__${carouselKey}__item-`;
    const carouselItems = [];
    
    for (let i = 0; i < items.length; i++) {
      const elementId = `${carouselItemId}${i + 1}`
      const carouselItem = {
        position: i,
        el: document.getElementById(`${elementId}`)
      };
      carouselItems.push(carouselItem);
    }

    return carouselItems;
  }
  
  getIndicators(carouselKey, items) {
    const carouselIndicatorId = `bh-carousel__${carouselKey}__indicator-`;
    const carouselIndicators = [];
  
    for (let i = 0; i < items.length; i++) {
      const elementId = `${carouselIndicatorId}${i + 1}`
      const carouselIndicator = {
        position: i,
        el: document.getElementById(`${elementId}`),
      };
      carouselIndicators.push(carouselIndicator);
    }
  
    return carouselIndicators;
  }
}
