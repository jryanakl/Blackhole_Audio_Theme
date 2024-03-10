const bh_questions_card = document.querySelector('#bh-product-details__question-card');
const bh_questions_link = document.querySelector('#bh-product-details__questions-link');

bh_questions_link.addEventListener('click', onClickShowDetailsCard);

function onClickShowDetailsCard() {
  const nodeId = this.id;

  if (nodeId === 'bh-product-details__questions-link') {
    bh_questions_card.style.display = 'block';
  }
}

