'use strict';

(function () {
  var addPinToMap = function (offers) {
    var fragment = document.createDocumentFragment();

    offers.forEach(function (offer) {
      fragment.appendChild(window.pin.renderPin(offer));
    });

    return fragment;
  };

  window.map = {
    addPinToMap: addPinToMap
  };
})();
