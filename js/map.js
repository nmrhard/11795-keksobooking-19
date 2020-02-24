'use strict';

window.map = (function () {
  var MAP_PIN_CLASS = 'map__pin';

  var onCardCloseClick = function () {
    closeCard();
  };

  var onEnterKeyDown = function (evt) {
    if (evt.key === window.util.Key.ENTER) {
      showCard(evt.target);
    }
  };

  var onCardEscapeKeyDown = function (evt) {
    window.util.isEscEvent(evt, closeCard);
  };

  var onPinClick = function (evt) {
    showCard(evt.target);
  };

  var closeCard = function () {
    var card = document.querySelector('.map__card');
    if (card !== null) {
      card.remove();
      document.removeEventListener('keydown', onCardEscapeKeyDown);
    }
  };

  var showCard = function (element) {
    closeCard();

    var pin = element.dataset.index ? element : element.parentElement;
    var isPin = pin.className === MAP_PIN_CLASS ? true : false;
    if (isPin) {
      var offer = window.start.offers[pin.dataset.index];
      window.Node.FILTER_CONTAINER.before(window.card.renderCard(offer));
      document.querySelector('.popup__close').addEventListener('click', onCardCloseClick);
      document.addEventListener('keydown', onCardEscapeKeyDown);
    }
  };

  window.Node.MAP_PINS_ELEMENT.addEventListener('click', onPinClick);
  window.Node.MAP_PINS_ELEMENT.addEventListener('keydown', onEnterKeyDown);
})();
