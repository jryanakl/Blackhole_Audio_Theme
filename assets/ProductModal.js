import { BhaModal, BhaModalConfig } from "./Modal.js";

export default class ProductModal extends BhaModal {
  modal;
  modalConfig;

  constructor() {
    const modalInstance = new BhaModalConfig('product');
    super(modalInstance.modalConfig);
    
    this.modal = modalInstance.createModal();
    this.modalConfig = modalInstance.modalConfig;
  }
}

customElements.define('bh-product-modal', ProductModal);