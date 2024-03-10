const bh_truncated_description = document.querySelector('#bh-truncated-description');
const bh_full_description = document.querySelector('#bh-full-description');
const bh_view_more = document.querySelector('#bh-view-more');
const bh_view_less = document.querySelector('#bh-view-less');

bh_view_more.addEventListener('click', onClickViewMoreLess);
bh_view_less.addEventListener('click', onClickViewMoreLess);

function onClickViewMoreLess() {
  const nodeId = this.id;

  if (nodeId === 'bh-view-more') {
    bh_truncated_description.style.display = 'none';
    bh_full_description.style.display = 'block';
  } else {
    bh_truncated_description.style.display = 'block';
    bh_full_description.style.display = 'none';
  }
}

