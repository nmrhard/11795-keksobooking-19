'use strict';

(function () {
  window.Node = {
    MAP: document.querySelector('.map'),
    PIN_MAIN: document.querySelector('.map__pin--main'),
    MAP_PINS_ELEMENT: document.querySelector('.map__pins'),
    PIN_TEMPLATE: document.querySelector('#pin').content.querySelector('.map__pin'),
    CARD_TEMPLATE: document.querySelector('#card').content.querySelector('.map__card'),
    OFFER_FORM: document.querySelector('.ad-form'),
    MAP_FORM: document.querySelector('.map__filters'),
    ADDRESS_INPUT: document.querySelector('#address'),
    ROOMS_COUNT: document.querySelector('#room_number'),
    GUESTS_COUNT: document.querySelector('#capacity'),
    ROOM_TYPE: document.querySelector('#type'),
    ROOM_PRICE: document.querySelector('#price'),
    TIME_IN: document.querySelector('#timein'),
    TIME_OUT: document.querySelector('#timeout'),
    FILTER_CONTAINER: document.querySelector('.map__filters-container'),
    SUCCESS_TEMPLATE: document.querySelector('#success'),
    ERROR_TEMPLATE: document.querySelector('#error'),
    RESET_FORM: document.querySelector('.ad-form__reset'),
    HOUSE_TYPE_FILTER: document.querySelector('#housing-type'),
    SUCCESS_MODAL: document.querySelector('#success').content.querySelector('.success'),
    ERROR_MODAL: document.querySelector('#error').content.querySelector('.error'),
    MAIN: document.body.querySelector('main')
  };
})();
