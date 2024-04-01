import { BhaModal, BhaModalConfig } from "./Modal.js";

export class PasswordModal extends BhaModal {
  modal;
  modalConfig;
  
  constructor() {
    const modalConfig = new BhaModalConfig('password').modalConfig;
    super(modalConfig);
    this.modalConfig = modalConfig;
  }
}
customElements.define('bha-password-modal', PasswordModal);