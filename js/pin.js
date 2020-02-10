'use strict';

window.pin = (function () {
  var Pin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var renderPin = function (offer) {
    var pinElement = window.nodes.PIN_TEMPLATE.cloneNode(true);
    var pinX = offer.location.x - Pin.WIDTH / 2;
    var pinY = offer.location.y - Pin.HEIGHT;

    pinElement.setAttribute('style', 'left: ' + pinX + 'px; ' + 'top: ' + pinY + 'px;');

    pinElement.querySelector('img').src = offer.author.avatar;
    pinElement.querySelector('img').alt = offer.offer.title;

    return pinElement;
  };

  return {
    renderPin: renderPin
  };
})();
