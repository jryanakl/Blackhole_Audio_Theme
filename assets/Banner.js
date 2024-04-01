const bannerElements = {
  box: getElementById('bh-banner__box'),
  button: getElementById('bh-banner__content--button'),
  content: getElementById('bh-banner__content'),
  header: getElementById('bh-banner__content--header'),
  media: getElementById('bh-banner__media'),
  mediaImage: getElementById('bh-banner__media--img'),
  subHeader: getElementById('bh-banner__content--sub-header'),
};

const naviationElements = {
  headerBox: getElementById('bh-header'),
};

const fromRightFlyIn = {
  x: 500,
  ease: 'power4.inOut',
};

gsap.from(bannerElements.content, {
  opacity: 0,
  duration: 2
});

gsap.from(bannerElements.header, {
  ...fromRightFlyIn,
  duration: 0.5
});

gsap.from(bannerElements.subHeader, {
  ...fromRightFlyIn,
  duration: 1
});

gsap.from(bannerElements.button, {
  ...fromRightFlyIn,
  duration: 1.5
});

function getElementById(elementId) {
  return document.getElementById(elementId);
}