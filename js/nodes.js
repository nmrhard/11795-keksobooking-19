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
    GUESTS_COUNT: document.querySelector('#capacity'),
    errorHandler: function (errorMessage) {
      document.body.style = 'position: relative';
      var node = document.createElement('div');
      var spanElement = document.createElement('span');
      node.style = 'z-index: 100; display: flex; padding-top: 280px; color: #ffffff; background-color: rgba(0,0,0,0.5);';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.top = 0;
      node.style.width = '100%';
      node.style.height = '100%';
      node.style.fontSize = '50px';

      spanElement.style = 'margin: 0 auto; color: #00000';
      spanElement.textContent = errorMessage;
      node.appendChild(spanElement);
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
