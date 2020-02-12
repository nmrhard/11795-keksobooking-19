'use strict';

(function () {
  window.Nodes = {
    MAP: document.querySelector('.map'),
    PIN_MAIN: document.querySelector('.map__pin--main'),
    MAP_PINS_ELEMENT: document.querySelector('.map__pins'),
    PIN_TEMPLATE: document.querySelector('#pin').content.querySelector('.map__pin'),
    CARD_TEMPLATE: document.querySelector('#card').content.querySelector('map__card'),
    OFFER_FORM: document.querySelector('.ad-form'),
    MAP_FORM: document.querySelector('.map__filters'),
    ADDRESS_INPUT: document.querySelector('#address'),
    ROOMS_COUNT: document.querySelector('#room_number'),
    GUESTS_COUNT: document.querySelector('#capacity')
  };
})();
