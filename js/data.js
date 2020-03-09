'use strict';

window.data = (function () {
  var MAX_OFFERS = 5;
  var initialOffers;
  var offers;

  var onDataLoaded = function (dataOffers) {
    initialOffers = dataOffers.slice();
    offers = initialOffers.slice(0, MAX_OFFERS);
  };

  var filterData = function () {
    var filteredOffers = window.filter.setFilter(initialOffers);
    offers = filteredOffers.slice(0, MAX_OFFERS);
  };

  var getData = function () {
    return offers;
  };

  var getOfferByIndex = function (index) {
    return offers[index];
  };

  window.backend.load(onDataLoaded, window.util.onError);

  return {
    getData: getData,
    filterData: filterData,
    getOfferByIndex: getOfferByIndex
  };
})();
