'use strict';

window.map = (function () {
  var renderCards = function (offers) {
    var fragment = document.createDocumentFragment();

    offers.forEach(function (offer) {
      if (offer.hasOwnProperty('offer')) {
        fragment.appendChild(window.card.renderCard(offer));
      }
    });

    return fragment;
  };

  return {
    renderCards: renderCards
  };
})();
