class ProductInfoDetails {
  cardElement;
  linkElement;

  constructor(selector) {
    this.cardElement = document.querySelector(`#bh-info-details__card__${selector}`);
    this.linkElement = document.querySelector(`#bh-info-details__link__${selector}`);
    
    if (this.linkElement && this.cardElement) {
      this.linkElement.addEventListener('click', this.onClickToggleDisplay.bind(this));
    } else {
      console.error(`Error: not finding cardElement: ${this.cardElement} or ${this.linkElement} by selector: ${selector}`);
    }
  }

  isElementHidden(element) {
    return element.classList.contains('hidden');
  }

  onClickToggleDisplay(event) {
    const eventTargetId = event.target.id

    if (eventTargetId === this.linkElement.id) {
      this.cardElement.classList.toggle('hidden');
    }
  }
}

document.addEventListener('DOMContentLoaded', function () {
  new ProductInfoDetails('have-questions');
});
