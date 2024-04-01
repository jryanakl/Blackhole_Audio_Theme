/**
 * BhaLightbox
 * 
 * Since using ESM specification, not a bundler like webpack, so import like this:
 * import "../node_modules/glightbox/index";
 * 
 * @link: https://github.com/biati-digital/glightbox
 */

export class BhaLightbox {
  $lighboxInstance;
  gLightboxElements = [];
  images;
  media;
  variants;
  zoomIconElement;

  constructor(productData, zoomIconElement) {
    if (productData.images) {
      this.images = productData.images;
    }
  
    if (productData.media) {
      this.media = productData.media;
    }

    if (productData.variants) {
      this.variants = productData.variants;
    }

    if (zoomIconElement) {
      this.zoomIconElement = zoomIconElement;
    }

    if (productData && GLightbox) {
      this.gLightboxElements = this.createGLightboxElements(this.variants);
 
      this.$lighboxInstance = GLightbox({
        elements: this.gLightboxElements,
        autoplayVideos: true,
      });

      if (this.zoomIconElement) {
        this.zoomIconElement.addEventListener('click', () => {
          if (this.$lighboxInstance && typeof this.$lighboxInstance.open === 'function') {
            if (this.variants && this.variants.length > 1) {
              const productFormElement = document.querySelector('form[data-product-form]');
              const variantInputElement = productFormElement.querySelector('input[name="id"]');
              const currentVariantId = variantInputElement.value;
              const $variantsCopy = [...this.variants];
              const filteredVariants = $variantsCopy.filter(element => {
                return element.id == currentVariantId;
              });
              const newLightboxElements = this.createGLightboxElements(filteredVariants);
            
              this.$lighboxInstance.setElements(newLightboxElements);
              this.$lighboxInstance.open();
            } else {
              this.$lighboxInstance.open();
            }
          } else {
            console.error('$lightboxInstance is not properly initialized or does not have an open method.');
          }
        });
      } else {
        console.error('ZoomIconElement not found.');
      }
      
      if (this.$lighboxInstance) {
        return this.$lighboxInstance;
      }
    } else {
      console.error(`
        ERROR! BhaLightbox: one of the following isn't defined -
        -productData: ${productData}
        -gLightboxElements: ${this.gLightboxElements}
        -GLightbox: ${GLightbox}
      `);
    }
  }

  getItemsFromVariants(variants) {
    const lightboxElements = [];

    for (let i = 0; i < variants.length; i++) {
      const {
        featured_image,
        public_title,
        title
      } = variants[i];

      const vImage = {
        alt: featured_image.alt,
        href: featured_image.src,
        // title: public_title || title, // descriptions causing bug with getAttribute
        type: 'image'
      };

      lightboxElements.push(vImage);
    }

    return lightboxElements;
  }

  getItemsFromMedia(media) {
    const lightboxElements = [];

    for (let i = 0; i < media.length; i++) {
      let lightboxElement = {
        alt: media[i].alt,
        href: media[i].src,
        type: media[i].media_type
      };

      lightboxElements.push(lightboxElement);
    }

    return lightboxElements;
  }
  
  createGLightboxElements(variants) {
    let items;

    if (this.variants && this.variants.length > 1) {
      items = this.getItemsFromVariants(variants);
    } else {
      items = this.getItemsFromMedia(this.media);
    }
    
    return items;
  }
}
