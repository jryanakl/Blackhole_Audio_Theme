import { BhaModal, BhaModalConfig } from "./Modal.js";

export class AnnouncementModal extends BhaModal {
  modal;
  modalConfig;
  
  constructor() {
    const modalConfig = new BhaModalConfig('announcement').modalConfig;
    super(modalConfig);
    this.modalConfig = modalConfig;
  }
}

customElements.define('bh-announcement-modal', AnnouncementModal);