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

    pinElement.setAttribute('style', 'left: ' + pinX + 'px; ' + 'top: ' + pinY + 'px;');

    pinElement.querySelector('img').src = offer.author.avatar;
    pinElement.querySelector('img').alt = offer.offer.title;
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

  return {
    renderPin: renderPin,
    renderPins: renderPins
  };
})();
