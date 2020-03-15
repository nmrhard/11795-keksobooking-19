'use strict';

(function () {
  window.Node = {
    MAP: document.querySelector('.map'),
    PIN_MAIN: document.querySelector('.map__pin--main'),
    MAP_PINS_ELEMENT: document.querySelector('.map__pins'),
    CARD_TEMPLATE: document.querySelector('#card').content.querySelector('.map__card'),
    OFFER_FORM: document.querySelector('.ad-form'),
    MAP_FORM: document.querySelector('.map__filters'),
    ADDRESS_INPUT: document.querySelector('#address'),
    MAIN: document.body.querySelector('main')
  };
})();
