'use strict';

(function () {

  var succesHandler = function (offers) {
    var fragment = document.createDocumentFragment();

    offers.forEach (function (offer) {
      if (offer.hasOwnProperty('offer')) {
        fragment.appendChild(window.pin.renderPin(offer));
      }
    });

    window.Nodes.MAP_PINS_ELEMENT.appendChild(fragment);
  };

  window.map = {
    succesHandler: succesHandler
  }
})();
