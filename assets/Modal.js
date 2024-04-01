export class BhaModalConfig {
  defaultModalOptions = {
    placement: 'bottom-right',
    backdrop: 'dynamic',
    backdropClasses: 'bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40',
    closable: true
  };
  modalElement;
  modalInstanceOptions;
  modalOptions = {
    announcement: this.defaultModalOptions,
    password: this.defaultModalOptions,
    product: this.defaultModalOptions,
  };

  constructor(modalKey) {
    this.modalElement = {
      announcement: document.querySelector(`bha-${modalKey}-modal`),
      password: document.querySelector(`bha-${modalKey}-modal`),
      product: document.querySelector(`bha-${modalKey}-modal`)
    };

    this.modalInstanceOptions = {
      id: `bh-modal__${modalKey}`,
      override: true
    };

    this.modalConfig = {
      modalElement: this.modalElement[modalKey],
      modalOptions: this.modalOptions[modalKey],
      modalInstanceOptions: this.modalInstanceOptions
    };
  }

  createModal() {
    if (Modal) {
      return new Modal(this.modalConfig.modalElement, this.modalConfig.modalOptions, this.modalInstanceOptions);
    } else {
      console.error(`Modal is undefined`);
    }
  }
}

export class BhaModal extends HTMLElement {
  logger;
  modal;
  modalConfig;
  
  constructor(modalConfig) {
    super();
    this.modalConifg = modalConfig
  }

  show() {
    this.modal.show();
  }

  hide() {
    this.modal.hide();
  }

  isHidden() {
    return this.modal.isHidden();
  }

  isVisible() {
    return this.modal.isVisible();
  }
}

customElements.define('bha-modal', BhaModal);