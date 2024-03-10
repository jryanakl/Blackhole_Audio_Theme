const carouselElement = document.getElementById('bh-product-carousel');

const items = [
  {
      position: 0,
      el: document.getElementById('bh-carousel-item-1'),
  },
  {
      position: 1,
      el: document.getElementById('bh-carousel-item-2'),
  },
  {
      position: 2,
      el: document.getElementById('bh-carousel-item-3'),
  },
  {
      position: 3,
      el: document.getElementById('bh-carousel-item-4'),
  },
];

// options with default values
const options = {
  defaultPosition: 1,
  interval: 3000,

  indicators: {
      activeClasses: 'bg-red-500',
      inactiveClasses:'bg-red/50 hover:bg-white',
      items: [
          {
              position: 0,
              el: document.getElementById('carousel-indicator-1'),
          },
          {
              position: 1,
              el: document.getElementById('carousel-indicator-2'),
          },
          {
              position: 2,
              el: document.getElementById('carousel-indicator-3'),
          },
          {
              position: 3,
              el: document.getElementById('carousel-indicator-4'),
          },
      ],
  },

  // callback functions
  onNext: () => {
      console.log('next slider item is shown');
  },
  onPrev: () => {
      console.log('previous slider item is shown');
  },
  onChange: () => {
      console.log('new slider item has been shown');
  },
};

// instance options object
const instanceOptions = {
  id: 'bh-product-carousel',
  override: true
};

import { Carousel } from 'flowbite';

const carousel = new Carousel(carouselElement, items, options, instanceOptions);