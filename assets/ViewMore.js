function onClickViewMoreLess() {
  const nodeId = this.id;
  const fullDescElement = document.querySelector('#bh-full-description');
  const truncatedDescElement = document.querySelector('#bh-truncated-description');

  if (nodeId === 'bh-view-more') {
    truncatedDescElement.style.display = 'none';
    fullDescElement.style.display = 'block';
  } else {
    truncatedDescElement.style.display = 'block';
    fullDescElement.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const viewMoreElement = document.querySelector('#bh-view-more');
  const viewLessElement = document.querySelector('#bh-view-less');

  viewMoreElement.addEventListener('click', onClickViewMoreLess);
  viewLessElement.addEventListener('click', onClickViewMoreLess);
});
