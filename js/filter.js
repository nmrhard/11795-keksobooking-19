'use strict';

window.filter = (function () {
  var filterOffers = [];

  var onHouseTypeChange = function (evt) {
    window.filter.filterOffers = window.start.offers.filter(function (item) {
      return evt.target.value === 'any' ? true : evt.target.value === item.offer.type;
    });
    updatePins(window.filter.filterOffers);
  };

  var updatePins = function (offers) {
    window.map.closeCard();
    window.pin.removePins();
    var pins = window.pin.renderPins(offers);
    window.Node.MAP_PINS_ELEMENT.appendChild(pins);
  };

  var getOfferByIndex = function (index) {
    return window.filter.filterOffers[index];
  };

  window.Node.HOUSE_TYPE_FILTER.addEventListener('change', onHouseTypeChange);

  return {
    getOfferByIndex: getOfferByIndex,
    filterOffers: filterOffers
  };
})();
