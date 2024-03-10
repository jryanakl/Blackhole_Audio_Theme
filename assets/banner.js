// GSAP
const naviationElements = {
  headerBox: document.getElementById('bh-header__box'),
  mainBox: document.getElementById('bh-main__box'),
  footerBox: document.getElementById('bh-footer__box'),
};

const bannerElements = {
  box: document.getElementById('banner__box'),
  content: document.getElementById('banner__content'),
  button: document.getElementById('banner__content--button'),
  header: document.getElementById('banner__content--header'),
  media: document.getElementById('banner__media'),
  mediaImage: document.getElementById('banner__media--img'),
  subHeader: document.getElementById('banner__content--sub-header'),
};

const fromRightFlyIn = {
  x: 500,
  ease: 'power4.inOut',
};

// gsap.from(naviationElements.headerBox, {
//   duration: 1,
//   opacity: 0,
//   y: -50,
//   ease: "power2.out"
// });

// gsap.fromTo(bannerElements.media, {
//   opacity: 0
// }, {
//   opacity: 1,
//   duration: 2
// });

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
