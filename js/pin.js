'use strict';

window.pin = (function () {
  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var renderPin = function (offer, index) {
    var pinElement = window.Node.PIN_TEMPLATE.cloneNode(true);
    var pinX = offer.location.x - Pin.WIDTH / 2;
    var pinY = offer.location.y - Pin.HEIGHT;
    var pinImageElement = pinElement.querySelector('img');

    pinElement.setAttribute('style', 'left: ' + pinX + 'px; ' + 'top: ' + pinY + 'px;');

    pinImageElement.src = offer.author.avatar;
    pinImageElement.alt = offer.offer.title;
    pinElement.dataset.index = index;

    return pinElement;
  };

  var renderPins = function (offers) {
    var fragment = document.createDocumentFragment();

    offers.forEach(function (offer, i) {
      if (offer.hasOwnProperty('offer')) {
        fragment.appendChild(window.pin.renderPin(offer, i));
      }
    });

    return fragment;
  };

  var removePins = function () {
    var pins = window.Node.MAP.querySelectorAll('.map__pin');
    pins.forEach(function (pin) {
      if (!pin.classList.contains('map__pin--main')) {
        pin.remove();
      }
    });
  };

  var updatePins = function () {
    window.map.closeCard();
    removePins();
    var offers = window.data.getData();
    var pins = renderPins(offers);
    window.Node.MAP_PINS_ELEMENT.appendChild(pins);
  };

  var onPinEnterKeyDown = function (evt) {
    if (evt.key === window.util.Key.ENTER) {
      window.map.showCard(evt.target, window.start.offers);
    }
  };

  var onPinClick = function (evt) {
    if (evt.button === window.util.MOUSE_LEFT_BUTTON) {
      window.map.showCard(evt.target, window.start.offers);
    }
  };

  window.Node.MAP_PINS_ELEMENT.addEventListener('click', onPinClick);
  window.Node.MAP_PINS_ELEMENT.addEventListener('keydown', onPinEnterKeyDown);

  return {
    renderPin: renderPin,
    renderPins: renderPins,
    removePins: removePins,
    updatePins: updatePins
  };
})();
